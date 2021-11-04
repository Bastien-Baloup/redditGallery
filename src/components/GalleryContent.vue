<template>
  <div class="item">
    <a
      :href="'https://reddit.com' + permalink"
      target="_blanc"
      aria-label="post image linking to the reddit post"
    >
      <picture>
        <img :src="url" alt />
      </picture>
    </a>
    <div class="hover">
      <a
        :href="'https://reddit.com' + permalink"
        target="_blanc"
        class="title"
        aria-label="title linking to the reddit post"
        v-html="title"
      />
      <a
        :href="'https://reddit.com/u/' + author"
        target="_blanc"
        class="author"
        aria-label="reddit username of the posts author linking to it's reddit page"
      >u/{{ author }}</a>
    </div>
  </div>
</template>

<script setup>
//imports
import { defineProps } from "vue"
//props
defineProps({
  url: { type: String, default: "" },
  title: { type: String, default: "" },
  author: { type: String, default: "" },
  permalink: { type: String, default: "" }
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
    .title {
      display: block;
      color: #d7dadc;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    .author {
      display: block;
      margin-top: 0.5em;
      color: darken($color: #d7dadc, $amount: 20%);
      text-decoration: none;
      width: 100%;
      text-align: right;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &:hover .hover {
    visibility: visible;
    opacity: 1;
  }
}
</style>
