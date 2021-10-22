<template>
  <h1>r/{{ subreddit }} Gallery</h1>
  <div class="gallery-container">
    <GalleryContent
      v-for="post in listing"
      :key="post.data.name"
      :url="post.data.url"
      :name="post.data.title"
    />
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue"
import { getPostList } from "../services/ApiServices"
import GalleryContent from "./GalleryContent.vue"

const props = defineProps({
  subreddit: { type: String, default: '' },
  sort: { type: String, default: 'hot' },
})

const listing = ref([])
const getData = async () => {
  return await getPostList(props.subreddit, props.sort, 1099)
}

getData().then((res) => {
  listing.value = res.data.data.children.filter((post) => post.data.post_hint == 'image')
  console.log(listing.value)
})
// const after = data.value.data.data.after
// const before = data.value.data.data.before

console.log(listing.value)
</script>

<style lang="scss" scoped>
.gallery-container {
  display: flex;
  flex-wrap: wrap;
  height: max-content;
  width: 98vw;
  margin: auto;
}
</style>
