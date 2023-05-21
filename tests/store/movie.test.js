import movieStore from '~/store/movie.js'
import _cloneDeep from 'lodash/cloneDeep'
import axios from 'axios'

describe('store/movie.js', () => {
  let store
  beforeEach(()=> {
    store = _cloneDeep(movieStore)
    store.state = store.state() // 'state' is defined as a function.
    store.commit = (name, payload) => { // 'store' is just an object data defined in export default in store/movie.js
      store.mutations[name](store.state, payload)
    }
    store.dispatch = (name, payload) => {
      const context = {
        state: store.state,
        commit: store.commit,
        dispatch: store.dispatch
      }
      return store.actions[name](context, payload) // 'return': actions are async funcs. So, return the async result or make this current func async.
    }
  })


  test("Initialize Movie data.", ()=> {
    store.commit('updateState', {
      movies: [{imdbID: '1'}],
      message: 'Random',
      loading: true
    })
    store.commit('resetMovies')
    expect(store.state.movies).toEqual([])
    expect(store.state.message).toBe('Search for the movie titles!')
    expect(store.state.loading).toBe(false)
  })

  test("If movie list is brought well, check the data.",async ()=> {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res) // async
    await store.dispatch('searchMovies')
    expect(store.state.movies).toEqual(res.data.Search)
  })

  test("If failed to bring movie list, check the error msg.", async ()=> {
    const errorMsg = "Network Error"
    axios.post = jest.fn().mockRejectedValue(new Error(errorMsg))
    await store.dispatch('searchMovies')

    expect(store.state.message).toBe(errorMsg)
  })

  test("If movie ID is duplicated, make it unique.", async () => {
    const res = {
      data: {
        totalResults: '1',
        Search: [
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          },
          {
            imdbID: '1',
            Title: 'hello',
            Poster: 'hello.jpg',
            Year: '2021'
          }
        ]
      }
    }
    axios.post = jest.fn().mockResolvedValue(res)
    await store.dispatch('searchMovies')
    expect(store.state.movies.length).toBe(1)
  })

  test("If A movie's detail brought well, check the data.", async ()=> {
    const res = {
      data: {
        imdbID: '1',
        Title: 'Frozen',
        Poster: 'frozen.jpg',
        Year: '2021'
      }
    }
    axios.post = jest.fn().mockResolvedValue(res) // If you just need to return in asyn way.
    await store.dispatch('searchMovieWithId')
    expect(store.state.theMovie).toEqual(res.data)
  })
})