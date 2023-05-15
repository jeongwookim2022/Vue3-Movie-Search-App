<template>
  <div 
    v-bind:style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // "props"
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


<style lang="scss" scoped>
@import "~/scss/main.scss";

.movie {
  $width: 168px;
  width: $width;
  height: $width *(3/2);
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover; // background-image covers the area of El with movie class.
  overflow: hidden;
  position: relative;
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>