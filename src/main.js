import { createApp } from 'vue'
import App from './App.vue'


import router from './routes/index.js' // Can skin '/index.js' part.
import store from './store/index.js'

createApp(App)
  .use(router) // use(): to connect Plugins
  .use(store)
  .mount('#app')