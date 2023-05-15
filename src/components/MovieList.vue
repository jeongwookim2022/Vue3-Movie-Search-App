<template>
  <div class="container">
    <div class="inner">
      <!-- For v-bind:movie="movie", object data 'movie' is sent
           to 'MovieItem' as data named 'movie' next to ':'-->
      <MovieItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie" /> 
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
    }
  }
}
</script>