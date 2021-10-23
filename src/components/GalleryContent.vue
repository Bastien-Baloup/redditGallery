<template>
  <picture>
    <img :src="props.url" alt />
  </picture>
</template>

<script setup>
//imports
import { defineProps } from 'vue'
//props
const props = defineProps({
  url: { type: String, default: "" },
  name: { type: String, default: "" }
})
</script>

<style lang="scss" scoped>
picture {
  height: calc(15vw + 10vh);
  min-width: calc(10vw + 10vh);
  flex-grow: 1;
  background-color: #444;
}
img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  outline: 0.2em solid #111;
}
</style>