<template>
<!-- RouterLink plays a role as <a></a> tag. -->
<RouterLink
  to="/"
  class="logo">
  <span>OMDbAPI</span>.COM
</RouterLink>
</template>


<style lang="scss" scoped>
// @import "~/scss/main.scss"; // -> Replaced

.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  text-decoration: none;
  &:hover {
    color: $black;
  }
  span{
    color: $primary;
  }
}
</style>