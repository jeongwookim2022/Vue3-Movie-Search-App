import axios from 'axios';
import _uniqBy from 'lodash/uniqBy';


const _defaultMessage = 'Search for the movie titles!'
export default {
  // 1. namespaced: It indicates that this fie(movie.js)
  // can be moduled in A Store.
  namespaced: true,

  // 2. Data. Just a differnce of Name.
  state: function () {
    return {
      movies: [],
      message: _defaultMessage,
      loading: false,
      theMovie: {}
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
    // Initialize the states for situations(EX.Back to Main page after seeing details).
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
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
      // if (state.loading)
      // - For the first activation of 'searchMovies', loading is false.
      //   And searchMovies is being activated until finished.
      //   But, if users activates searchMovies By Clicking or Enter,
      //   Searchmovies will be activated again. But this time it will be caught
      //   in 'if state' and finisehd By return.
      if (state.loading) {
        return 
      }

      commit('updateState', {
        message: '',
        loading: true
      })

      try {
        const res = await _fetchMovie({ ...payload, page:1})
        const{ Search, totalResults } = res.data
        // (3) Activate 'updateState()' and Use 'Search' as a param.
        //  - Can write commit(~~) if modify serachMovies({commit}, ~)
        // context.commit('updateState', payload={
        commit('updateState', {
          movies: _uniqBy(Search, "imdbID")
        })

        const total = parseInt(totalResults, 10) // Decimal
        const pageLength = Math.ceil(total / 10)
      
        // Additional Request for the rest of movies left.
        if (pageLength > 1) {
          for (let page = 2; page<=pageLength; page += 1) {
            if (page > (payload.number / 10)) {
              break
          }
          const res = await _fetchMovie({ ...payload, page })
          const { Search } = res.data
          commit('updateState', {
            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
          })
          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },

    async searchMovieWithId(context, payload) {
      if (context.state.loading) {
        return
      }
      context.commit('updateState', {
        theMovie: {},
        loading: true
      })

      const { id } = payload
      try{
        const res = await _fetchMovie({
          id: id
        })
        context.commit('updateState', {
          theMovie: res.data
        })
      } catch(error) {
        context.commit('updateState', {
          theMovie: {}
        })
      } finally {
        context.commit('updateState', {
          loading: false
        })
      }
    }
  }
}

//
function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = "7035c60c"
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  // To make _fetchMovie() work as asyn.
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then((res) => {
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch((err) => {
        reject(err.message)
      })
  })
}