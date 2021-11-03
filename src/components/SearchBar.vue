<template>
  <form class="search" @submit.prevent="handleSubmit">
    <label for="subreddit">r/</label>
    <input id="subreddit" v-model="subreddit" type="text" name="subreddit" placeholder="subreddit" />
    <input id="submit" type="submit" value="Go" />
  </form>
</template>

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
.search {
  display: flex;
  align-items: flex-end;
  margin: 1vh;
  font-size: 1.5em;
  label {
    border-bottom: 2px solid #d7dadc;
    font-weight: bold;
    line-height: 1.3em;
  }
  #subreddit {
    min-width: 6em;
    width: 8em;
    max-width: 60vw;
    background-color: #1a1a1b;
    color: #d7dadc;
    border: none;
    border-bottom: 2px solid #d7dadc;
    border-right: 2px solid #d7dadc;
    line-height: 1.4em;
    &::placeholder {
      color: darken($color: #d7dadc, $amount: 20%);
      opacity: 1;
    }
  }
  #submit {
    margin-left: 8px;
    color: #d7dadc;
    border-bottom: 2px solid transparent;
    font-size: 1.3em;
    line-height: 0.8em;
  }
}
</style>