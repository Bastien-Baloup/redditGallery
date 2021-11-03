<template>
  <div v-if="!error" class="gallery">
    <div class="gallery-header">
      <h2>r/{{ subreddit }} Gallery</h2>
      <div class="sorting">
        <router-link :to="{ name: 'Gallery', params: { subreddit: subreddit, sort: 'new' } }">new</router-link>
        <router-link :to="{ name: 'Gallery', params: { subreddit: subreddit, sort: 'hot' } }">hot</router-link>
        <router-link :to="{ name: 'Gallery', params: { subreddit: subreddit, sort: 'best' } }">best</router-link>
        <router-link :to="{ name: 'Gallery', params: { subreddit: subreddit, sort: 'top' } }">top</router-link>
      </div>
    </div>

    <!-- gallery container, only appears after the listing get filled -->
    <div v-if="listing.length > 0" class="gallery-container">
      <GalleryContent
        v-for="post in listing"
        :key="post.data.name"
        :url="post.data.url"
        :title="post.data.title"
        :author="post.data.author"
        :permalink="post.data.permalink"
      />
    </div>
    <div v-else-if="!loading" class="gallery-empty">
      <p>Sorry, no pictures have been found here.</p>
    </div>
    <!-- loader, only appears when loading a batch of post from reddit -->
    <div v-if="loading" class="loader">
      <div class="spinner" />
      <div class="text">Loading posts from r/{{ subreddit }}.</div>
    </div>
  </div>
  <div v-else class="gallery-error">
    <h2>Oops</h2>
    <p>It seems we can't find r/{{ subreddit }}</p>
    <p>Search something else ?</p>
    <SearchBar class="search" />
  </div>
</template>

<script setup>
//imports
import { ref } from "vue"
import { getPostList, doesSubredditExist } from "../services/ApiServices"
import GalleryContent from "../components/GalleryContent.vue"
import SearchBar from '../components/SearchBar.vue'

//props
/* global defineProps */
const props = defineProps({
  subreddit: { type: String, default: "" },
  sort: { type: String, default: "hot" },
})

//reactive state
const listing = ref([])
const after = ref("")
const loading = ref(true)
const error = ref(false)


//methods
/**
 * use ApiServices to fetch at least the desired amount of image posts from reddit listed after the one passed in option
 * @async
 * @param {string} after post id after which we will get our listing
 * @param {number} count how many image post do we want at least
 * @return {Array.<Object>} arrays of image posts formated the same ways reddit send them.
 */
const getData = async (after, count) => {
  var data = await getPostList(props.subreddit, props.sort, 1099, after)
  var listing = data.data.data.children.filter(
    (post) => post.data.post_hint == "image"
  )
  after = data.data.data.after

  while (listing.length < count) {
    // TODO: break if after is null
    if (after == null) {
      break
    }
    data = await getPostList(props.subreddit, props.sort, 1099, after)
    listing.push(
      ...data.data.data.children.filter(
        (post) => post.data.post_hint == "image"
      )
    )
    after = data.data.data.after
  }

  return [listing, after]
}

/**
 * use the getData function to fetch the next 100+ images post and the id of the next post from reddit and update the component state with init
 */
const next = async () => {
  console.log("loading")
  if (await doesSubredditExist(props.subreddit)) {
    return getData(after.value, 100).then(([_listing, _after]) => {
      listing.value.push(..._listing)
      after.value = _after
      loading.value = false
      console.log("loaded")
    })
  } else {
    console.log("error")
    error.value = true
  }

}

//setup
next().then(() => {
  //initialize the infinite scroll after the first load
  window.onscroll = () => {
    const isNearEnd =
      window.scrollY > document.body.offsetHeight - 3 * window.innerHeight // isNearEnd is true when we're 2 * innerHeight above the end of the page
    if (isNearEnd && !loading.value) {
      //we fetching the next batch of images if we're near the end of the page and not already fetching it
      loading.value = true
      next()
    }
  }
})
</script>

<style lang="scss" scoped>
.gallery {
  display: flex;
  flex-direction: column;
}
.gallery-header,
.gallery-empty,
.gallery-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: max-content;
  margin: auto;
  margin-bottom: 1rem;
  h2 {
    margin-top: 2vh;
    font-size: 2.5rem;
    text-align: center;
  }
  p {
    margin-top: 1vh;
    font-size: 1.5rem;
  }
  .sorting {
    margin-bottom: auto;
    a {
      margin-inline: 0.5rem;
      color: #d7dadc;
      a:link {
        color: #d7dadc;
      }
      &:visited {
        color: #d7dadc;
      }
      &:hover,
      &.router-link-active {
        font-weight: bold;
      }
    }
  }
}
.gallery-error h2 {
  margin-top: 15vh;
}
.gallery-container {
  height: max-content;
  width: 98vw;
  max-width: 1880px;
  margin: auto;
  margin-top: 1rem;

  display: grid;
  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, calc(15vw + 10vh));
  justify-content: space-evenly;
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
    border-top-color: #d7dadc;
    border-left-color: #d7dadc;

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

.search {
  font-size: 6rem;
}
</style>
