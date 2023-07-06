import axios from "axios";
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'my-project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/axios" },
    { src: "@/plugins/repositories" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  sitemap: {
    hostname: process.env.BASE_URL,
    routes: async () => {
      const apiUrl = process.env.VUE_APP_API_URL;
      const { data } = await axios.get(`${apiUrl}/livers`);
      return [
        {
          url: "/",
          priority: 1,
        },
        ...data.data.map((user) => ({
          url: `/livers/${user.id}`,
          lastmod: user.updated_at,
          changefreq: "daily",
        })),
      ];
    },
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
    },
    exclude: ["/login", "/sign-up", "/sign-up/**", "/user/forgot-password"],
  },

  env: {
    apiUrl: process.env.API_URL,
  },
}
