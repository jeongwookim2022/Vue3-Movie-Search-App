import axios from 'axios';


export default {
  // 1. namespaced: It indicates that this fie(movie.js)
  // can be moduled in A Store.
  namespaced: true,

  // 2. Data. Just a differnce of Name.
  state: function () {
    return {
      movies: [],
      message: '',
      loading: false
    }
  },

  // 3. Computed. =.
  getters: {
    // EX)
    // movieIds(state) {
    //   return state.movies.map(movie => movie.imdbId)
    // }
  },

  // 4. Methods. =.
  // 1) mutaions
  // - Can modify the data(state) by using mutations only.
  // - So, use it for modifying the data only.
  mutations: {
    // (1) This way is too messy.
    // assignMovies(state, Search) {
    //   state.movies = Search
    // }, // -->

    // (2) To update date
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        // state.movies = payload.movies
        // state.message = payload.message
        // state.loading = payload.loading
        //              OR
        // state["movies"] = ["payload.movies"]
        // state["message"] = ["payload.message"]
        // state["loading"] = ["payload.loading"]
        //              OR
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  // 2) actions
  // - Use it like any kinds of methods except for modifying data. 
  // - Automatically "asnyc ~ await".
  // - If data(state) needed, use the term "context" as a pram.
  actions: {
    // (1) context
    // serachMovies(context) {}
    // OR
    // serachMovies({state, getters, commit}) {}
    // (2) payload
    // - When using a method, the method can get data via payload.
    async searchMovies({commit, state}, payload) {
      const { title, type, number, year } = payload
      const OMDB_API_KEY = "7035c60c"

      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`)
      const{ Search, totalResults } = res.data
      // (3) Activate 'assignMovies()' and Use 'Search' as a param.
      //  - Can write commit(~~) if modify serachMovies({commit}, ~)
      // context.commit('updateState', payload={
      commit('updateState', {
        movies: Search,
      })
      console.log(totalResults) // 346
      console.log(typeof totalResults)

      const total = parseInt(totalResults, 10) // Decimal
      const pageLength = Math.ceil(total / 10)
      
      // Additional Request for the rest of movies left.
      if (pageLength > 1) {
        for (let page = 2; page<=pageLength; page += 1) {
          if (page > (number / 10)) {
            break
          }
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ...Search]
          })
        }
      }
    }
  }
}