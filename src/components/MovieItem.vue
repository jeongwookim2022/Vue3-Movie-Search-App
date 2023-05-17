<template>
  <RouterLink 
    v-bind:to="`/movie/${movie.imdbID}`"
    v-bind:style="{ backgroundImage: `url(${movie.Poster})` }"
    class="movie">
    <Loader 
      v-if="imageLoading"
      :size="1.5"
      :absolute="true" />
    <div class="info">
      <div class="year">
        {{ movie.Year }}
      </div>
      <div class="title">
        {{ movie.Title }}
      </div>
    </div>
  </RouterLink>
</template>

<script>
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Loader
  },

  // "props"
  // Getting data From A Parent component 'MovieList.vue'
  // 1) If type is Object or Array, defaut should be a Function
  // - when you want to leave it empty.
  props: {
    movie: {
      type: Object,
      default: function() { return {} }
    }
  },
  data() {
    return {
      imageLoading: true
    }
  },
  // As soon as MovieItem component is connected to HTML.
  // init() method will be activated.
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const poster = this.movie.Poster

      if (!poster || poster === 'N/A') {
        this.imageLoading = false
      } else {
        await this.$loadImage(poster)
        this.imageLoading = false
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import "~/scss/main.scss";

.movie {
  $width: 168px;
  width: $width;
  height: $width *3/2;
  margin: 10px;
  border-radius: 4px;
  background-color: $gray-400;
  background-size: cover; // background-image covers the area of El with movie class.
  overflow: hidden;
  position: relative;
  &:hover::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 6px solid $primary;
  }
  .info {
    background-color: rgba($black, .3);
    width: 100%;
    padding: 14px;
    font-size: 14px;
    text-align: center;
    position: absolute;
    left: 0;
    bottom: 0;
    backdrop-filter: blur(10px);
    .year {
      color: $primary;
    }
    .title {
      color: $white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>