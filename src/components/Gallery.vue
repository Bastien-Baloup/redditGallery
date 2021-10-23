<template>
  <div class="gallery-header">
    <h2>r/{{ subreddit }} Gallery</h2>
    <div class="sorting">
      <a href="/">new</a>
      <a href="/">hot</a>
      <a href="/">best</a>
      <a href="/">top</a>
      <a href="/">random</a>
    </div>
  </div>

  <!-- gallery container, only appears after the listing get filled -->
  <div v-if="listing.length > 0" class="gallery-container">
    <GalleryContent
      v-for="post in listing"
      :key="post.data.name"
      :url="post.data.url"
      :name="post.data.title"
    />
  </div>
  <!-- loader, only appears when loading a batch of post from reddit -->
  <div v-if="loading" class="loader">
    <div class="spinner" />
    <div class="text">Loading posts from r/{{ subreddit }}</div>
  </div>
</template>

<script setup>
//imports
import { ref, defineProps } from "vue";
import { getPostList } from "../services/ApiServices";
import GalleryContent from "./GalleryContent.vue";

//props
const props = defineProps({
  subreddit: { type: String, default: "" },
  sort: { type: String, default: "hot" },
});

//reactive state
const listing = ref([]);
const after = ref("");
const loading = ref(true);

//methods

/**
 * use ApiServices to fetch at least the desired amount of image posts from reddit listed after the one passed in option
 * @async
 * @param {string} after post id after which we will get our listing
 * @param {number} count how many image post do we want at least
 * @return {Array.<Object>} arrays of image posts formated the same ways reddit send them.
 */
const getData = async (after, count) => {
  var data = await getPostList(props.subreddit, props.sort, 1099, after);
  var listing = data.data.data.children.filter(
    (post) => post.data.post_hint == "image"
  );
  after = data.data.data.after;

  while (listing.length < count) {
    data = await getPostList(props.subreddit, props.sort, 1099, after);
    listing.push(
      ...data.data.data.children.filter(
        (post) => post.data.post_hint == "image"
      )
    );
    after = data.data.data.after;
  }

  return [listing, after];
};

/**
 * use the getData function to fetch the next 100+ images post and the id of the next post from reddit and update the component state with init
 */
const next = () => {
  console.log("loading");
  return getData(after.value, 100).then(([_listing, _after]) => {
    listing.value.push(..._listing);
    after.value = _after;
    loading.value = false;
  });
};

//setup
next().then(() => {
  //initialize the infinite scroll after the first load
  window.onscroll = () => {
    const isNearEnd =
      window.scrollY > document.body.offsetHeight - 3 * window.innerHeight; // isNearEnd is true when we're 2 * innerHeight above the end of the page
    if (isNearEnd && !loading.value) {
      //we fetching the next batch of images if we're near the end of the page and not already fetching it
      loading.value = true;
      next();
    }
  };
});
</script>

<style lang="scss" scoped>
.gallery-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10vh;
  margin: auto;
  h2 {
    margin: auto 0 0.5vh 0;
  }
  .sorting {
    margin-bottom: auto;
    a {
      margin-inline: 0.5rem;
    }
  }
}
.gallery-container {
  display: flex;
  flex-wrap: wrap;
  height: max-content;
  width: 98vw;
  margin: auto;
}
.loader {
  display: flex;
  width: 100%;
  height: 10vh;
  align-items: center;
  .spinner {
    // Spinner size and color
    width: 1.5rem;
    height: 1.5rem;
    border-top-color: #ccc;
    border-left-color: #ccc;

    // Additional spinner styles
    animation: spinner 1s linear infinite;
    border-bottom-color: transparent;
    border-right-color: transparent;
    border-style: solid;
    border-width: 2px;
    border-radius: 50%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    margin-left: auto;
    margin-right: 10px;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(220deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .text {
    margin-right: auto;
  }
}
</style>
