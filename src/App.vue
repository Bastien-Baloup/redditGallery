<template>
  <Header />
  <router-view :key="$route.fullPath" />
</template>

// TODO: add a footer

<script setup>
import Header from "./components/Header.vue"
</script>

<style lang="scss">
@import "scss-reset/_reset.scss";

html {
  background-color: #1a1a1b;
  color: #d7dadc;
}
</style>
