<template>
  <picture>
    <img :src="props.url" :alt="props.name" />
  </picture>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  url: { type: String, default: "" },
  name: { type: String, default: "" }
})
</script>

<style lang="scss" scoped>
picture {
  height: calc(15vw + 10vh);
  flex-grow: 1;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  outline: 0.2em solid #111;
}
</style>