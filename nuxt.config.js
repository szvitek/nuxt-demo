import bodyParser from 'body-parser'

export default {
  mode: 'universal',

  /*
   ** Headers of the page
   ** added to all pages,
   ** can be overwritten in components in pages the folder
   */
  head: {
    title: 'WebDev BLOG',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'My Cool WebDev blog'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   ** if mode is spa: use loadingIndicator
   */
  loading: { color: '#f00', height: '4px', duratioin: 5000 },

  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.css'],

  /*
   ** Plugins to load before mounting the App
   ** Every time you need to use Vue.use(), you should create a file
   ** in plugins/ and add its path to plugins in nuxt.config.js.
   */
  plugins: ['~/plugins/core-components.js', '~/plugins/date-filter.js'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: process.env.BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    // baseUrl will b injected as an env variable
    // and can be acces as process.env.baseUrl or context.env.baseUrl
    baseUrl: process.env.BASE_URL,
    firebaseKey: process.env.FIREBASE_KEY
  },
  transition: {
    // animations that played on navigations
    name: 'fade',
    mode: 'out-in'
  },
  // global middleware
  // router: {
  //   middleware: 'log'
  // },
  serverMiddleware: [bodyParser.json(), '~/api']
}
