<template>
  <!-- Depending on the Value of datas in props, classes v-binded wil be added.  -->
  <div
    v-bind:style="{
      width: `${size}rem`,
      height: `${size}rem`,
      zIndex: zIndex
    }"
    v-bind:class="{absolute: absolute, fixed: fixed}" 
    class="spinner-border text-primary">
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    } 
  } 
}
</script>


<style lang="scss" scoped>
.spinner-border {
  // Center if position is fixed or absolute.
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // Standard: Parent Element
  &.absolute {
    position: absolute;
  }
  // Standard: view-port
  &.fixed {
    position: fixed;
  }
}
</style>