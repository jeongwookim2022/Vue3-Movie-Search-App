<template>
  <div class="container">
    <div class="inner">
      <div class="message">
        {{ message }}
      </div>
      <!-- For v-bind:movie="movie", object data 'movie' is sent
           to 'MovieItem' as data named 'movie' next to ':'-->
      <div class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" /> 
      </div>
    </div>
  </div>
</template>


<script>
import MovieItem from '~/components/MovieItem.vue';

export default {
  components: {
    MovieItem
  },
  computed: {
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    }
  }
}
</script>


<style lang="scss">
.container {
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>