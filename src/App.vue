<template>
  <Header />
  <router-view :key="$route.fullPath" />
  <!-- TODO: add a footer -->
</template>


<script setup>
import Header from "./components/Header.vue"
</script>

<style lang="scss">
@import "scss-reset/_reset.scss";

html {
  background-color: #1a1a1b;
  color: #d7dadc;
}

*:focus-visible {
  outline: dotted 1px #d7dadc !important;
}

@supports not (selector(a: focus-visible)) {
  *:focus {
    outline: dotted 1px #d7dadc !important;
  }
}
</style>
