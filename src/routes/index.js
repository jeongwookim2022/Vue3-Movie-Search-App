import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import About from './About'
import Movie from './Movie'
import NotFound from './NotFound'



// export TO "main.js"
export default createRouter({
  // Modes: Hash, History
  // Hash mode.
  // - EX) https://google.com/#/search
  history: createWebHashHistory(),

  // Always Be on Top
  scrollBehavior() {
    return { top: 0 }
  },

  // Each pages
  routes: [
    {
      path: '/', // To main page
      component: Home // Which Component will be used for the Path above.
    },
    {
      path:'/about', // =
      component: About // =
    },
    {
      path:'/movie/:id', // =
      component: Movie // =
    },
    {
      path:'/:notFound(.*)', // =
      component: NotFound // =
    }
  ]
})