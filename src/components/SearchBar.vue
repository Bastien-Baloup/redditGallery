<template>
  <form class="search" aria-label="subreddit searchbar" @submit.prevent="handleSubmit">
    <label :id="id + '-label'" :for="id + '-input'">r&sol;</label>

    <div
      :id="id + 'AutocompletedInput'"
      :ref="id + 'AutocompletedInput'"
      class="autocomplete"
      role="combobox"
      aria-label="subreddit searchbar with autocomplete"
      aria-haspopup="listbox"
      aria-owns="autocomplete-results"
      :aria-expanded="isOpen"
    >
      <input
        :id="id + '-input'"
        v-model="subreddit"
        type="text"
        name="subreddit"
        placeholder="subreddit"
        class="subreddit"
        role="searchbox"
        aria-multiline="false"
        aria-autocomplete="list"
        :aria-controls="id + '-autocomplete-results'"
        :aria-activedescendant="activedescendant"
        :aria-labelledby="id + '-label'"
        autocapitalize="off"
        autocomplete="off"
        autocorrect="off"
        spellcheck="false"
        @input="onInput"
        @focus="onFocus"
        @click="onFocus"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.prevent="onEnter"
      />
      <ul
        v-show="isOpen"
        :id="id + '-autocomplete-results'"
        class="autocomplete-results"
        role="listbox"
        aria-label="list of autocomplete results"
      >
        <li v-if="isLoading" class="loading">Loading results...</li>
        <li
          v-for="(result, i) in results"
          v-else
          :id="getId(i)"
          :key="i"
          class="autocomplete-result"
          :class="{ 'is-active': isSelected(i) }"
          role="option"
          @click="selectSubreddit(result.data.display_name)"
        >{{ result.kind === 't5' ? result.data.display_name : "No Results" }}</li>
      </ul>
    </div>

    <input type="submit" value="Go" class="submit" />
  </form>
</template>
// TODO: add subreddit suggestions using the searchSubreddit function
<script setup>
//imports
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
// eslint-disable-next-line no-unused-vars
import { useEventListener } from '@vueuse/core'
import { searchSubreddit } from '../services/ApiServices'

//props
const props = defineProps({
  id: { type: String, default: "" }
})

//reactive state
const isOpen = ref(false)
const results = ref([])
const subreddit = ref("")
const isLoading = ref(false)
const debounceTimeout = ref(null)
const arrowCounter = ref(0)
const activedescendant = ref("")
//hooks
const router = useRouter()

//methods

//remove the selection then,  when the user has stopped typing for 500ms, load the new suggestions
const onInput = () => {
  arrowCounter.value = -1
  if (subreddit.value.length > 0) {
    isLoading.value = true
    // use clearTimeout and setTimeout to update results when the user stop writing
    clearTimeout(debounceTimeout.value)
    debounceTimeout.value = setTimeout(() => LoadSuggestions(subreddit.value), 500)
  } else {
    clearTimeout(debounceTimeout.value)
    results.value = []
    isOpen.value = false
  }

}

//open the list
const onFocus = () => {
  isOpen.value = true
}

//change the selected suggestions for the one under in the list if there is one
const onArrowDown = () => {
  if (isOpen.value && arrowCounter.value < results.value.length) {
    arrowCounter.value = arrowCounter.value + 1
    setActiveDescendent()
  }
  isOpen.value = true
}

//change the selected suggestions for the one above in the list if there is one
const onArrowUp = () => {
  if (isOpen.value && arrowCounter.value > 0) {
    arrowCounter.value = arrowCounter.value - 1
    setActiveDescendent()
  }
  isOpen.value = true
}

//if the list is open, update the input content with the chosen suggestion if the use did choose one, else submit the form when the list is closed
const onEnter = (e) => {
  if (isOpen.value) {
    subreddit.value = arrowCounter.value >= 0 ? results.value[arrowCounter.value].data.display_name : subreddit.value
    isOpen.value = false
  } else {
    console.log(e.target.parentElement)
    e.target.parentElement.parentElement.requestSubmit()
  }
}
// update the input content with the chosen suggestion and close the list
const selectSubreddit = chosenSubreddit => {
  subreddit.value = chosenSubreddit
  isOpen.value = false
}

// close the list and reset the selected suggestion
const handleClickOutside = () => {
  isOpen.value = false
  arrowCounter.value = -1
  console.log("outside click")
}

// set the activedescendant aria atribute to the id of the active suggestion
const setActiveDescendent = () => {
  activedescendant.value = getId(arrowCounter.value)
}

// get the if attribute of the suggestion
const getId = index => {
  return props.id + `-result-item-${index}`
}

// check if the suggestion is the selected one
const isSelected = index => {
  return index === arrowCounter.value
}

// redirect to the chosen gallery when clicking on the go button
const handleSubmit = () => {
  router.push({ name: 'Gallery', params: { subreddit: subreddit.value, sort: 'hot' } })
}

// fetch and update the list of suggestions
const LoadSuggestions = async (query) => {
  const searchResult = await searchSubreddit(query)
  results.value = searchResult !== "{}" ? searchResult.data.children : [{ kind: "noneFound" }]
  isLoading.value = false
}

//close the suggestions list if we click outside of the autocomplete block
useEventListener(
  window,
  'click',
  (event) => {
    if (isOpen.value) {
      const autocomplete = document.getElementById(props.id + "AutocompletedInput")
      if (!event.composedPath().includes(autocomplete)) {
        handleClickOutside()
      }
    }
  },
  {
    passive: true
  }
)

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
  .subreddit {
    width: inherit;
    background-color: #1a1a1b;
    color: #d7dadc;
    border: none;
    padding-left: 0.2em;
    border-bottom: 2px solid #d7dadc;
    border-right: 2px solid #d7dadc;
    line-height: 1.4em;
    &::placeholder {
      color: darken($color: #d7dadc, $amount: 20%);
      opacity: 1;
    }
  }

  .autocomplete {
    position: relative;
    min-width: 6em;
    width: 8em;
    max-width: 60vw;
    .autocomplete-results {
      font-size: 0.75em;
      position: absolute;
      width: inherit;
      text-align: left;
      background-color: #030303;
      border-radius: 0 0 0.1em 0.1em;
      .autocomplete-result {
        padding-inline: 1em;
        &.is-active,
        &:hover {
          color: #030303;
          background-color: #d7dadc;
        }
      }
    }
  }

  .submit {
    margin-left: 8px;
    color: #d7dadc;
    border-bottom: 2px solid transparent;
    font-size: 1.3em;
    line-height: 0.8em;
  }
}
</style>