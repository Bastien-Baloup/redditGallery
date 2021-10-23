import { createRouter, createWebHistory } from "vue-router"

import Home from "../views/Home.vue"
import Gallery from "../views/Gallery.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/r/:subreddit/:sort",
    name: "Gallery",
    component: Gallery,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
