import axios from "axios"

const apiClient = axios.create({
  baseURL: "https://www.reddit.com/",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

// TODO: authentification to the reddit API using OAuth

/**
 * Return a listing of posts from a subreddit using the reddit api
 * @param {string} subreddit the choosen subreddit url
 * @param {string} sort criteria on which posts are sorted (top, best, hot, new, ...)
 * @param {number} limit how many posts to get in our listing
 * @param {?string} after post id after which we will get our listing cannot be set as the same time as before
 * @param {?string} before post id before which we will get our listing cannot be set as the same time as after
 * @returns {Object} listing of the selected posts
 */
export const getPostList = async (subreddit, sort, limit, after, before) => {
  return await apiClient
    .get(
      "/r/" +
      subreddit +
      "/" +
      sort +
      ".json" +
      "?limit=" +
      limit +
      (after ? "&after=" + after : "") +
      (before ? "&before=" + before : "")
    )
    .catch((e) => console.log(e))
}
