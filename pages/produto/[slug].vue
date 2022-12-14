<template>
  <div class="bg-white">
    <div class="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <li v-for="breadcrumb in product.breadcrumbs" :key="breadcrumb.id">
            <div class="flex items-center">
              <a :href="breadcrumb.href" class="mr-2 text-sm font-medium text-gray-900">{{ breadcrumb.name }}</a>
              <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-4 text-gray-300">
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          <li class="text-sm">
            <a :href="product.href" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{ product.name }}</a>
          </li>
        </ol>
      </nav>

      <!-- Image gallery -->
      <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div v-if="product.images[0]" class="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img :src="product.images[0].src" :alt="product.images[0].alt" class="h-full w-full object-cover object-center" />
        </div>
        <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div v-if="product.images[1]" class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img :src="product.images[1].src" :alt="product.images[1].alt" class="h-full w-full object-cover object-center" />
          </div>
          <div v-if="product.images[2]" class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img :src="product.images[2].src" :alt="product.images[2].alt" class="h-full w-full object-cover object-center" />
          </div>
        </div>
        <div v-if="product.images[3]" class="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img :src="product.images[3].src" :alt="product.images[3].alt" class="h-full w-full object-cover object-center" />
        </div>
      </div>

      <!-- Product info -->
      <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.name }}</h1>
        </div>

        <!-- Options -->
        <div class="mt-4 lg:row-span-3 lg:mt-0">
          <h2 class="sr-only">Product information</h2>
          <p class="text-3xl tracking-tight text-gray-900">{{ product.price?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }}</p>

          <form class="mt-10">
            <!-- Colors -->
            <div>
              <h3 class="text-sm font-medium text-gray-900">Cor</h3>
              <client-only>
                <RadioGroup v-model="selectedColor" class="mt-4">
                  <RadioGroupLabel class="sr-only"> Choose a color </RadioGroupLabel>
                  <div class="flex items-center space-x-3">
                    <RadioGroupOption as="template" v-for="color in product.colors" :key="color.name" :value="color" v-slot="{ active, checked }">
                      <div :class="[color.selectedClass, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none']">
                        <RadioGroupLabel as="span" class="sr-only"> {{ color.name }} </RadioGroupLabel>
                        <span aria-hidden="true" :class="[color.class, 'h-8 w-8 border border-black border-opacity-10 rounded-full']" />
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </client-only>
            </div>

            <!-- Sizes -->
            <div class="mt-10">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-900">Tamanho</h3>
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Guia de tamanhos</a>
              </div>
              <client-only placeholder="carregando...">
                <RadioGroup v-model="selectedSize" class="mt-4">
                  <RadioGroupLabel class="sr-only"> Choose a size </RadioGroupLabel>
                  <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    <RadioGroupOption as="template" v-for="size in product?.sizes" :key="size?.name" :value="size" :disabled="!size.inStock" v-slot="{ active, checked }">
                      <div :class="[size.inStock ? 'bg-white shadow-sm text-gray-900 cursor-pointer' : 'bg-gray-50 text-gray-200 cursor-not-allowed', active ? 'ring-2 ring-indigo-500' : '', 'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6']">
                        <RadioGroupLabel as="span">{{ size.name }}</RadioGroupLabel>
                        <span v-if="size.inStock" :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-md']" aria-hidden="true" />
                        <span v-else aria-hidden="true" class="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                          <svg class="absolute inset-0 h-full w-full stroke-2 text-gray-200" viewBox="0 0 100 100" preserveAspectRatio="none" stroke="currentColor">
                            <line x1="0" y1="100" x2="100" y2="0" vector-effect="non-scaling-stroke" />
                          </svg>
                        </span>
                      </div>
                    </RadioGroupOption>
                  </div>
                </RadioGroup>
              </client-only>
            </div>

            <button @click.prevent="cart.addToCart(productData()); cart.open()" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Adicionar ao carrinho</button>
          </form>
        </div>

        <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
          <!-- Description and details -->
          <div>
            <h3 class="sr-only">Description</h3>

            <div class="space-y-6">
              <p class="text-base text-gray-900">{{ product?.description }}</p>
            </div>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

            <div class="mt-4">
              <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
                <li v-for="highlight in product?.highlights" :key="highlight" class="text-gray-400">
                  <span class="text-gray-600">{{ highlight }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="mt-10">
            <h2 class="text-sm font-medium text-gray-900">Details</h2>

            <div class="mt-4 space-y-6">
              <p class="text-sm text-gray-600">{{ product.details }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { StarIcon } from '@heroicons/vue/20/solid/index.js'
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'

const route = useRoute();

const {data} = await useAsyncData('product', () => $fetch(`/api/product/?slug=${route.params.slug}`));
const product = data.value.product
const {name, description, price, _id, images } = product

const productData = () => (
{
  name,
  description,
  imageSrc: images[0].src,
  imageAlt: images[0].alt,
  price,
  _id,
  size: selectedSize,
  color: selectedColor
});

const breadcrumb = [{name: 'home', href: '/'}]

const selectedColor = ref(product.colors[0]);
const selectedSize = ref(product.sizes[2]);

const cart = useCart();
</script>