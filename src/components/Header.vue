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
          href: '/movie'
        },
        {
          name: 'About',
          href: '/about'
        },
      ]
    }
  },
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