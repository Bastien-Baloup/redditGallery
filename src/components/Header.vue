<template>
  <div class="header">
    <div class="branding">
      <div class="logo"></div>
      <div class="title">Reddit Gallery</div>
    </div>
    <form class="search">
      <label for="subreddit">r/</label>
      <input id="subreddit" type="text" name="subreddit" placeholder="subreddit" />
      <input id="submit" type="submit" value="Go" />
    </form>
  </div>
</template>

// TODO: add subreddit suggestions using reddit search api (https://www.reddit.com/search.json?q=[put search query here]&type=sr&restrict_sr=false)

<style lang="scss" scoped>
.header {
  display: flex;
  height: 5vh;
  width: 100%;
  padding: 1vh;
  border-bottom: 1px solid #ccc;
  .branding {
    margin-right: auto;
    .title {
      line-height: 30px;
    }
  }

  .search {
    margin-left: auto;
    label {
      border-bottom: 2px solid #ccc;
      font-weight: bold;
    }
    #subreddit {
      min-width: 150px;
      width: 10vw;
      background-color: #111;
      color: #ccc;
      border: none;
      border-bottom: 2px solid #ccc;
      border-right: 2px solid #ccc;
    }
    #submit {
      margin-left: 0.3rem;
      color: #ccc;
      font-size: 1.25rem;
      line-height: 30px;
    }
  }
}
</style>