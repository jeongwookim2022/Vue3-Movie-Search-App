<template>
  <h1>Movie!</h1>
</template>


<script>
export default {
  // As soon as component is created.
  created() {
    console.log(this.$route)

    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
  }
}
</script>
