<template>
  <Header />
  <RouterView />
</template>


<script>
import Header from '~/components/Header.vue';
  
export default {
  components: {
    Header
  },
  data() {
    
  },
}
</script>

<style lang="scss">
  @import "~/scss/main.scss";


</style>