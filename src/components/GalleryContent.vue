<template>
  <div class="item">
    <picture>
      <img :src="props.url" alt />
    </picture>
    <div class="hover">
      <div class="title" v-html="props.title" />
      <div class="author">u/{{ props.author }}</div>
    </div>
  </div>
</template>

<script setup>
//imports
import { defineProps } from "vue"
//props
const props = defineProps({
  url: { type: String, default: "" },
  title: { type: String, default: "" },
  author: { type: String, default: "" },
})
</script>

<style lang="scss" scoped>
.item {
  position: relative;

  picture {
    height: calc(15vw + 10vh);
    max-height: 396px;
    width: 100%;
    background-color: #030303;
    outline: 1rem solid #030303;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      vertical-align: bottom;
    }
  }
  .hover {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    height: max-content;
    width: 100%;
    background-color: #030303bb;
    padding-top: 1rem;
    transition: visibility 0.3s, opacity 0.3s ease-in;
    .author {
      margin-top: 0.5em;
      color: darken($color: #d7dadc, $amount: 20%);
      width: 100%;
      text-align: right;
    }
  }
  &:hover .hover {
    visibility: visible;
    opacity: 1;
  }
}
</style>
