import {createStore} from 'vuex'


import movie from './movie.js'
import about from './about.js'


export default createStore({
  modules: {
    movie, // "movie: moive" if the attr name and data name are same.
    about
  }
})