<template>
  <div class="container">
    <template v-if="loading">
      <!-- After Sending requsts -->
      <!-- While waiting for Response --> 
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
    <Loader 
      v-bind:size="3"
      v-bind:z-index="9"
      v-bind:fixed="true" />
    </template>


    <!-- After getting Response -->
    <div 
      v-else
      class="movie-details">
      <div
        v-bind:style="{ backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster, 700)})` }"
        class="poster">
        <Loader
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Country }}</span>
        </div>
        <div class="plot">
          <span>{{ theMovie.Plot }}</span>
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <!-- Will use Source as name and Value as score. -->
            <div
              v-for="{ Source: name, Value: score } in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img 
                :src="`https://raw.githubusercontent.com/jeongwookim2022/src-vue-movie-app/main/${name}.png`"
                
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Director }}
        </div>
        <div>
          <h3>Production</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Loader from '~/components/Loader.vue'

export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },

  // As soon as component is created.
  created() {
    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === 'N/A') {
        this.imageLoading = false
        return ''
      }

      const src = url.replace("SX300", `SX${size}`)
      this.$loadImage(src)
        .then(() => {
          this.imageLoading = false
        })
      return src
    }
  }
}

</script>


<style lang="scss" scoped>
@import "~/scss/main.scss";

.container {
  padding-top: 40px;

}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * 3/2;
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex; // Let Chidren Els be horizontal each other.
  color: $gray-600;
  .poster {
    width: 500px;
    height: 500px *3/2;
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover; // Let Poster Img take all the space.
    background-position: center;
    flex-shrink: 0;
    position: relative;
  }
  .specs {
    flex-grow: 1;
    .title {
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display: flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px; // Let the rate of Img By giving height val.
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: 'Oswald', sans-serif;
      font-size: 20px;
    }
  }
}
</style>