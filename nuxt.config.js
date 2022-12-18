// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/tailwind.css'],
  build: {
    templates: [
      {
        src: 'templates/app.html',
      }
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  image: {
    domains: [
      'res.cloudinary.com'
    ]
  },
  modules: ['@nuxt/image-edge', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'nuxt-purgecss'],
})
