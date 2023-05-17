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
  methods: {
    isMatch(path) {
      if (!path) {
        return false
      } else {
        return path.test(this.$route.fullPath)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px; // UP, Down X L, R OK
  display: flex;
  align-items: center;
  .logo {
    margin-right: 40px;
  }
}
</style>