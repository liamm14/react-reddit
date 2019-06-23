import { Dispatch } from "redux";
import { PostsType } from "./Components/Posts";
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  REQUEST_POST,
  RECEIVE_POSTS
} from "./types";

export function selectSubreddit(subreddit: string) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit: string) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}

function requestPosts(subreddit: string) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function requestPost(subreddit: string) {
  return {
    type: REQUEST_POST,
    subreddit
  };
}

interface Child {
  data: PostsType;
}
interface PostsJson {
  data: {
    children: Child[];
  };
}

function receivePosts(subreddit: string, json: PostsJson) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchPosts(subreddit: string) {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)));
  };
}

export const fetchPost = (post: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestPost(post));
    return fetch(`https://www.reddit.com/r/${post}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(post, json)));
  };
};

function shouldFetchPosts(state: any, subreddit: string) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export const fetchPostsIfNeeded = (subreddit: string) => (
  dispatch: Dispatch<any>,
  getState: Function
) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit));
  }
};
