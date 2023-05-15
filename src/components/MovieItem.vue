<template>
  <div>{{ movie.imdbID }}</div>
</template>

<script>
export default {
  // Getting data From A Parent component 'MovieList.vue'
  // 1) If type is Object or Array, defaut should be a Function
  // - when you want to leave it empty.
  props: {
    movie: {
      type: Object,
      default: function() { return {} }
    }
  }
}
</script>