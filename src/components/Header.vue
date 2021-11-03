<template>
  <div class="header">
    <router-link :to="{ name: 'Home' }" class="branding">
      <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 7200 5800">
          <path
            d="m3680 1400-200 890c-330 20-630 120-860 270a400 400 0 10-470 650l-10 140c0 300 160 570 430 760 260 190 630 310 1020 310 400 0 770-120 1030-310s430-460 430-760l-10-140c340-210 190-750-220-750-100 0-180 40-250 100-230-150-530-250-860-270l170-730 500 110c20 160 150 280 310 280 180 0 320-150 320-320s-140-310-320-310c-110 0-200 50-260 140l-620-140c-60-20-120 30-130 80zm-670 2030a210 210 0 11 0-430c120 0 210 100 210 220s-90 210-210 210zm1130 380c-110 110-320 170-550 170s-440-60-550-170l-10-10 10-10h20c50 60 130 90 220 120a1160 1160 0 00 610 0c90-20 180-60 230-120h20l10 10-10 10zM6750 50H450A400 400 0 00 50 450v4900a400 400 0 00 400 400h6300a400 400 0 00 400-400V450a400 400 0 00-400-400zm-450 4900H900c-30 0-50-20-50-50V900c0-30 20-50 50-50h5400c30 0 50 20 50 50v4000c0 30-20 50-50 50zM4170 3430c-110 0-210-90-210-210a210 210 0 11 210 210"
            fill="#D7DADC"
            stroke="#1A1A1B"
            stroke-width="100"
          />
        </svg>
      </div>
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
    display: flex;
    height: 100%;
    margin-right: auto;
    color: #d7dadc;
    text-decoration: none;
    .logo {
      svg {
        width: 2rem;
        height: 100%;
      }
    }
    .title {
      margin-left: 0.65rem;
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