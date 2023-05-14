import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import About from './About'



// export TO "main.js"
export default createRouter({
  // Modes: Hash, History
  // Hash mode.
  // - EX) https://google.com/#/search
  history: createWebHashHistory(),

  // Each pages
  routes: [
    {
      path: '/', // To main page
      component: Home // Which Component will be used for the Path above.
    },
    {
      path:'/about', // =
      component: About // =
    }
  ]
})