<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <RouterLink
          v-bind:to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <!-- 1. -->
    <!-- <RouterLink 
      to="/about"
      class="user">
      <img
        v-bind:src="image"
        v-bind:alt="name" />
    </RouterLink> -->
    
    <!-- OR -->

    <!-- 2. -->
    <div
      class="user"
      @click="toAbout">
      <img
        v-bind:src="image"
        v-bind:alt="name" />
    </div>
  </header>
</template>


<script>
import Logo from "~/components/Logo.vue"

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movies',
          href: '/movie/tt4520988',
          path: /^\/movie/    // '/movie'
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    }
  },
  methods: {
    isMatch(path) {
      if (!path) {
        return false
      } else {
        return path.test(this.$route.fullPath)
      }
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/main.scss";

header {
  height: 70px;
  padding: 0 40px; // UP, Down X L, R OK
  display: flex;
  align-items: center;
  position: relative;
  .logo {
    margin-right: 40px;
  }
  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;       //
    bottom: 0;    //
    margin: auto; // --> Vertically center. 
    right: 40px;
    transition: 0.3s;
    &:hover {
      // background-color: darken($primary, 0);
      background-color: $primary;
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>