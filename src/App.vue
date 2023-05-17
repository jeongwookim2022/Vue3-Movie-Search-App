<template>
  <Header />
  <RouterView />
  <Footer />
</template>


<script>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
  
export default {
  components: {
    Header,
    Footer
  },
  data() {
    
  },
}
</script>

<style lang="scss">
  // @import "~/scss/main.scss";
  // - Replaced by webpack.config.js -> module -> rules 
</style>