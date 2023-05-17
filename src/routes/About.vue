<template>
  <div class="about">
    <div class="photo">
      <Lodader 
        v-if="imageLoading"
        absolute />
      <img 
        :src="image"
        :alt="name">
    </div>
    <div class="name">
      {{ name }}
    </div>
    <a
      :href="`${blog}`"
      class="blog">
      {{ blog }}</a>
    <div>{{ email }}</div>
    <div>{{ phone }}</div>
    <div>{{ address }}</div>
  </div>
</template>


<script>
import Loader from "~/components/Loader.vue"

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
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    },
    email() {
      return this.$store.state.about.email
    },
    blog() {
      return this.$store.state.about.blog
    },
    phone() {
      return this.$store.state.about.phone
    },
    address() {
      return this.$store.state.about.address
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>


<style lang="scss">
@import "~/scss/main.scss";

.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 310px;
    margin: 30px auto 15px;
    padding: 40px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
  .blog {
    margin-bottom: 7px;
  }
}
</style>