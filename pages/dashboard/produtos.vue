<script setup>
  const {data} = await useAsyncData("products", () => $fetch("/api/products"));
  const products = data.value
definePageMeta({
  middleware: ["admin"],
  layout: "dashboard"
})
</script>

<template>
<div class="sm:py-12 py-0">
  <div class="py-5 mb-4">
    <h3 class="text-lg font-medium leading-6 text-gray-900">Informações de Produtos</h3>
    <p class="mt-1 max-w-2xl text-sm text-gray-500">Bla bla bla bla bla.</p>
  </div>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Editar Produto</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in products" :key="product._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" :src="product?.images[0]?.src" alt="" />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap w-60">
                        {{ product.name }}
                      </div>
                      <div class="text-sm text-gray-500 text-ellipsis overflow-hidden whitespace-nowrap w-60">
                        {{ product.description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ product?.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</div>
                  <div class="text-sm text-gray-500">{{ product?.department }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Active </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <nuxt-link :to="`/dashboard/produto/${product.slug}`" class="text-indigo-600 hover:text-indigo-900">Editar Produto</nuxt-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
