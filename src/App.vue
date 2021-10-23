<template>
  <Header />
  <router-view></router-view>
</template>

// TODO: add a footer

<script setup>
import Header from "./components/Header.vue"
</script>

<style lang="scss">
@import "scss-reset/_reset.scss";

html {
  background-color: #111;
  color: #ccc;
}
</style>
