
import axios from 'axios';
import parse from './parse';
import { requestOptions } from './consts';

const proxy = 'https://cors-anywhere.herokuapp.com';

export const getFeed = (currentState, url) => {
  const state = currentState;
  axios.get(`${proxy}/${url}`)
    .then(({ data }) => {
      const feed = parse(data);
      state.feeds.push(feed);
      state.posts.unshift(...feed.elements);
      state.urls.push(url);
      state.request = requestOptions.finished;
    })
    .catch((e) => {
      state.request = requestOptions.failed;
      throw e;
    });
};

const updateFeed = ({ data }, state) => {
  const { elements } = parse(data);
  elements.forEach(((el) => {
    const hasPost = state.posts.some(({ title }) => title === el.title);
    if (!hasPost) {
      state.posts.unshift(el);
    }
  }));
};

export const updateFeeds = (state) => {
  const promises = state.urls.map((url) => axios.get(`${proxy}/${url}`));
  const updateInterval = 5000;
  Promise.all(promises)
    .then((res) => {
      res.forEach((el) => updateFeed(el, state));
    })
    .catch((e) => {
      throw e;
    })
    .finally(() => setTimeout(() => updateFeeds(state), updateInterval));
};
