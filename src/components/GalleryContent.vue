<template>
  <picture>
    <img :src="props.url" alt />
  </picture>
</template>

<script setup>
//imports
import { defineProps } from "vue"
//props
const props = defineProps({
  url: { type: String, default: "" },
  name: { type: String, default: "" },
})
</script>

<style lang="scss" scoped>
picture {
  height: calc(15vw + 10vh);
  max-height: 396px;
  width: max-content;
  background-color: #444;
  outline: 3px solid #000;
}
img {
  height: 100%;
  width: auto;
  object-fit: fill;
  vertical-align: bottom;
}
</style>
