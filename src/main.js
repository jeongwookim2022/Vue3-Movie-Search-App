import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/index.js'

createApp(App)
  .use(router) // use(): to connect Plugins
  .mount('#app')