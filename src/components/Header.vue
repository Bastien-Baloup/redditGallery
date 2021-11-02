<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }" class="branding">
      <div class="logo"></div>
      <div class="title">Reddit Gallery</div>
    </router-link>
    <form class="search" @submit.prevent="handleSubmit">
      <label for="subreddit">r/</label>
      <input
        id="subreddit"
        v-model="subreddit"
        type="text"
        name="subreddit"
        placeholder="subreddit"
      />
      <input id="submit" type="submit" value="Go" />
    </form>
  </div>
</template>

// TODO: add subreddit suggestions using reddit search api (https://www.reddit.com/search.json?q=[put search query here]&type=sr&restrict_sr=false)
<script setup>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'

let subreddit = ref("")
const router = useRouter()
const handleSubmit = () => {
  router.push({ name: 'Gallery', params: { subreddit: subreddit.value, sort: 'hot' } })
}
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  height: max-content;
  min-height: 3.5rem;
  width: 100%;
  padding: 0.65rem;
  border-bottom: 1px solid #d7dadc;
  .branding {
    margin-right: auto;
    color: #d7dadc;
    text-decoration: none;
    .title {
      line-height: 30px;
    }
  }

  .search {
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    transform: translateY(-20%);
    label {
      border-bottom: 2px solid #d7dadc;
      font-weight: bold;
      line-height: 1.4rem;
    }
    #subreddit {
      min-width: 150px;
      width: 10vw;
      background-color: #1a1a1b;
      color: #d7dadc;
      border: none;
      border-bottom: 2px solid #d7dadc;
      border-right: 2px solid #d7dadc;
      line-height: 1.4rem;
      &::placeholder {
        color: darken($color: #d7dadc, $amount: 20%);
        opacity: 1;
      }
    }
    #submit {
      margin-left: 8px;
      color: #d7dadc;
      border-bottom: 2px solid transparent;
      font-size: 1.25rem;
      line-height: 1.4rem;
    }
  }
}
</style>