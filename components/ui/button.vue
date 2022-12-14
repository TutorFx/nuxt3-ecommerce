<template>
  <span
    v-if="!to"
    class="font-bold border rounded px-3 py-2 btn"
    v-bind:class="block ? 'block':'inline-block'" 
    ref="button"
  >
    <slot />
  </span>
  <nuxt-link 
    v-else 
    ref="button" 
    v-bind:class="block ? 'block':'inline-block'" 
    class="font-bold border rounded px-3 py-2 btn"
    :to="to">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  methods: {
    createRipple(event) {
      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.classList.add("ripple");

      const ripple = button.getElementsByClassName("ripple")[0];

      if (ripple) {
        ripple.remove();
      }

      button.appendChild(circle);
    },
  },
  props: {
    to: String,
    block: Boolean
  },
  async mounted(){
    this.to ? this.$refs.button.$el.addEventListener("click", this.createRipple) : this.$refs.button.addEventListener("click", this.createRipple);
  },
  async beforeUnmount(){
    this.to ? this.$refs.button.$el.removeEventListener("click", this.createRipple) : this.$refs.button.removeEventListener("click", this.createRipple);
  }
};
</script>

<style lang="scss">
  .btn {
    position: relative;
    overflow: hidden;
    transition: background 400ms;
    cursor: pointer;
    text-decoration: none;
  }
  span.ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.7);
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
</style>
