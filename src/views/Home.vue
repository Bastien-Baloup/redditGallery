<template>
  <div class="home">
    <div class="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 7200 5800"
        alt
        aria-label="brand icon"
      >
        <path
          d="m3680 1400-200 890c-330 20-630 120-860 270a400 400 0 10-470 650l-10 140c0 300 160 570 430 760 260 190 630 310 1020 310 400 0 770-120 1030-310s430-460 430-760l-10-140c340-210 190-750-220-750-100 0-180 40-250 100-230-150-530-250-860-270l170-730 500 110c20 160 150 280 310 280 180 0 320-150 320-320s-140-310-320-310c-110 0-200 50-260 140l-620-140c-60-20-120 30-130 80zm-670 2030a210 210 0 11 0-430c120 0 210 100 210 220s-90 210-210 210zm1130 380c-110 110-320 170-550 170s-440-60-550-170l-10-10 10-10h20c50 60 130 90 220 120a1160 1160 0 00 610 0c90-20 180-60 230-120h20l10 10-10 10zM6750 50H450A400 400 0 00 50 450v4900a400 400 0 00 400 400h6300a400 400 0 00 400-400V450a400 400 0 00-400-400zm-450 4900H900c-30 0-50-20-50-50V900c0-30 20-50 50-50h5400c30 0 50 20 50 50v4000c0 30-20 50-50 50zM4170 3430c-110 0-210-90-210-210a210 210 0 11 210 210"
          fill="#D7DADC"
          stroke="#1A1A1B"
          stroke-width="100"
        />
      </svg>
    </div>
    <h2>Reddit Gallery</h2>
    <p class="subtitle">Another way to browse Reddit</p>
    <SearchBar id="homeSearchbar" class="search" />
    <p
      class="disclaimer"
    >All content is taken from Reddit and therefore are property of Reddit or it's users.</p>
  </div>
</template>
<script setup>
import SearchBar from '../components/SearchBar.vue'
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  text-align: center;
  .logo {
    margin-top: 10vh;
    margin-bottom: 5vh;
    svg {
      height: 20vh;
    }
  }
  h2 {
    margin: 1vh;
    font-size: 3.5rem;
  }
  .subtitle {
    margin: 1vh;
    font-size: 2.5rem;
  }
  .disclaimer {
    position: fixed;
    bottom: 0;
    margin-top: auto;
    margin-bottom: 1rem;
    height: max-content;
  }
  .search {
    font-size: 2rem;
  }
}
</style>