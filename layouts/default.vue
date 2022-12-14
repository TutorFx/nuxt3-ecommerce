<template>
  <ui-shopping-cart />
  <div id="layout">
    <menu-default /> <!-- tag: header -->
    <section>
      <slot />
    </section>
    <footer>
    </footer>
  </div>
</template>

<script>
import menuDefault from "@/components/nav/menu.vue"

export default {
  components: {
    menuDefault
  }
}
</script>

<style lang="scss">
.container{
  @apply mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8;
}
#layout{
  display: grid;
	grid-template-areas: 
    "header"
    "section"
    "footer";
  grid-template-rows: 4rem 1fr fit-content(7.5rem);
  min-height: 100vh;
    header {
      grid-area: header;
      @apply bg-black;
      div{
        @apply mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8;
      }
    }
    
    section {
      grid-area: section;    
    }
    
    footer {
      grid-area: footer;
    }
  
}
</style>