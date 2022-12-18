<template>
  <header>
    <div class="h-16 py-2 flex gap-4 items-center justify-between">
      <nuxt-link to="/">
        <logo />
      </nuxt-link>


        <span @click="cart.open()" href="#" class="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span
            class="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-500"
            >{{cart.countCartItems}}</span
          >
          <span class="sr-only">ver itens no carrinho</span>
        </span>
      <nuxt-link to="/dashboard"> v-if="store.user.name">
        <span class="text-white">
          Seja bem-vindo, {{ store.user.name }}
        </span>
      </nuxt-link>
    </div>
  </header>
</template>

<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/outline/index.js'
const store = await useUserStore();
const cart = useCart()
</script>

<script>
export default {};
</script>
