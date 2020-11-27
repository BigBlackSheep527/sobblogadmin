export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'sobblognuxt',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/icons/iconfont.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src:'@/plugins/element-ui',
      ssr:true
    },
    {
      src:'@/plugins/word-cloud',
      ssr:false
    },{
      src:'@/plugins/avatar',
      ssr:false
    },

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/user/': {
        target:'http://47.103.216.205:2020'
      },
    '/portal': {
      target:'http://47.103.216.205:2020'
    },
    '/shop': {
      target:'https://api.sunofbeach.net'
    },
    '/admin': {
      target:'http://47.103.216.205:2020'
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  }
}
