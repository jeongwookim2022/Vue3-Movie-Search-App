<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      type="text"
      placeholder="Search for Movies, Series & more!"
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        :key="filter.name"
        v-model="$data[filter.name]"
        class="form-select">
        <option 
          v-if="filter.name === 'year'"
          value="">
          All Years
        </option>
        <option
          v-for="item in filter.items"
          :key="item"
          >
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-primary"
      @click="apply">
      Apply
    </button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // Data definition(title, type, number, year)
      // - Can remove value="" attr in <options> above and Assign values for each data below.
      title: '',
      type: 'movie',
      number: '10',
      year: '',

      filters: [ // With Using 'fitlers' here, vue-for will be used to control data.
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (function () {
            const years = []
            const thisYear = new Date().getFullYear() // 2023
            for (let i = thisYear; i>=1985; i-=1) { years.push(i) }
            return years
          })()
        }
      ]
    }
  },
  methods: {
    // 1) apply()
    // - Search Movies Using 'asnyc ~ await'
    // - Connecting a 'action' From movie.js to use it
    //   when apply() is activated By click event.
    async apply() {
      this.$store.dispatch('movie/searchMovies', { // 'movie' is a module name.
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>


<style lang="scss" scoped>
// @import "~/scss/main.scss" // -> Replaced;

.container {
  display: flex;
  > * {
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  .btn {
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
  @include media-breakpoint-down(lg) {
    // .container is display:flex and this @include paragraph
    // is in container. 
    // display: block; will lie Els vertically. 
    display: block;
    input {
      margin-right: 0;
      margin-bottom: 10px ;
    }
    .selects {
      margin-right: 0;
      margin-bottom: 10px;
      select {
        width: 100%;
      }
    }
    .btn {
      width: 100%;
    }
  }
}
</style>