export default {
  // 1. namespaced: It indicates that this fie(movie.js)
  // can be moduled in A Store.
  namespaced: true,
  // 2. Data. Just a differnce of Name.
  state: function () {
    return {
      movies: []
    }
  },
  // 3. Computed. =.
  getters: {
    movieIds(state) {
      return state.movies.map(movie => movie.imdbId)
    }
  },
  // 4. Methods. =.
  // 1) mutaions
  // - Can modify the data(state) by using mutations only.
  // - So, use it for modifying the data only.
  mutations: {
    resetMovies(state) {
      state.movies = []
    }
  },
  // 2) actions
  // - Use it like any kinds of methods except for modifying data. 
  // - Automatically "asnyc ~ await".
  // - If data(state) needed, use the term "context" as a pram.
  actions: {
    // serachMovies(context) {}
    // OR
    // serachMovies({state, getters, commit}) {}
    serachMovies(context) {

    }
  }
}