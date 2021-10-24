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
  width: 100%;
  background-color: #030303;
  outline: 1rem solid #030303;
}
img {
  height: 100%;
  width: 100%;
  object-fit: contain;
  vertical-align: bottom;
}
</style>
