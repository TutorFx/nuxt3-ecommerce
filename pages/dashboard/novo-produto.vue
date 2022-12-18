<template>
  <div class="min-h-full sm:grid block grid-cols-2 gap-4">
    <div class="py-12">
      <label class="block mb-4">
        <div class="mb-1">Nome</div>
        <input
          class="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          type="text"
          v-model="state.name"
          placeholder="Nome do produto"
        />
      </label>
      <label class="block mb-4">
        <div class="block mb-1 text-sm font-medium">Descrição</div>
        <textarea
          type="text"
          v-model="state.description"
          placeholder="no mínimo .... caracteres"
          class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </label>
      <div class="mt-1 mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700">Preço</label>
        <div class="relative mt-1 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <span class="text-gray-500 sm:text-sm">R$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            v-model="state.price"
            v-money="money"
            class="block w-full rounded-md border-gray-300 pl-8 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="0.00"
          />
        </div>
      </div>
      <div class="mb-4">
        <label for="price" class="block text-sm font-medium text-gray-700"
          >Link</label
        >
        <div class="relative mt-1 rounded-md shadow-sm">
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          >
            <span class="text-gray-500 sm:text-sm">/produto/</span>
          </div>
          <input
            type="text"
            name="slug"
            id="slug"
            v-model="state.slug"
            class="block w-full rounded-md border-gray-300 pl-20 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="link-do-produto"
          />
        </div>
      </div>
      <label class="block mb-4">
        <div class="mb-3">Imagens</div>
        <ui-dropzone-multiple v-model:dropzone-file="state.images" />
      </label>
      <label class="block mb-4">
        <div>cores</div>
        indisponivel
      </label>
      <label class="block mb-4">
        <div>tamanhos</div>
        indisponivel
      </label>
      <label class="block mb-4">
        <div>características</div>
        indisponivel
      </label>
      <label class="block mb-4">
        <div class="block mb-2 text-sm font-medium">Detalhes</div>
        <textarea
          type="text"
          placeholder="detalhes"
          v-model="state.details"
          class="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </label>
      <div>
        <ui-button
          @click="postProduct()"
          class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Postar produto</ui-button
        >
      </div>
    </div>
    <div>Exibição</div>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";
import { VMoney } from "v-money";
export default {
  setup() {
    definePageMeta({
      middleware: ["admin"],
      layout: "dashboard"
    })

    const state = reactive({
      name: "",
      description: "",
      price: "",
      slug: "",
      details: "",

      images: [],
/*       colors: [
        { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
        { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
        { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
      ], */
/*       sizes: [
        { name: "XXS", inStock: false },
        { name: "XS", inStock: true },
        { name: "S", inStock: true },
        { name: "M", inStock: true },
        { name: "L", inStock: true },
        { name: "XL", inStock: true },
        { name: "2XL", inStock: true },
        { name: "3XL", inStock: true },
      ], */
/*       highlights: [
        "Hand cut and sewn locally",
        "Dyed with our proprietary colors",
        "Pre-washed & pre-shrunk",
        "Ultra-soft 100% cotton",
      ], */
    });
    const rules = computed(() => {
      return {
        name: {
          required: helpers.withMessage(
            "Nome do produto é obrigatório.",
            required
          ),
        },
        description: {
          required: helpers.withMessage("Descrição é obrigatória.", required),
          minLength: helpers.withMessage(
            "A descrição está muito pequena.",
            minLength(20)
          ),
        },
        price: {
          required: helpers.withMessage(
            "O preço do produto é obrigatório.",
            required
          ),
        },
        slug: {
          required: helpers.withMessage(
            "O link do produto é obrigatório.",
            required
          ),
        },
      };
    });
    
    const money = {
      decimal: ",",
      thousands: ".",
      prefix: "",
      suffix: "",
      precision: 2,
      masked: false,
    };

    const v$ = useValidate(rules, state);

    const postProduct = async () => {
      state.price = parseFloat(state.price.replace(/\./g, '').replace(',', '.'))

      const body = new FormData()
      
      state.images.forEach((file, index) => 
        {
          body.append(`images-${index}`, file)
        }
      )
      
      body.append('dados',JSON.stringify(state));

      try {
        await $fetch("/api/admin/product/create", { method: "POST", body })
      } catch ( err ){}
    };
    return { state, v$, postProduct, money };
  },
  directives: { money: VMoney },
  watch: {
    "state.name": function (newval) {
      newval = newval.replace(/ /g, "-");
      newval = newval.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      this.state.slug = encodeURIComponent(newval);
    },
  },
};
</script>

<style lang="scss"></style>
