
import axios from 'axios';
import parse from './parse';
import { requestOptions } from './consts';

const proxy = 'https://cors-anywhere.herokuapp.com';

export const addFeed = (currentState, url) => {
  const state = currentState;
  axios.get(`${proxy}/${url}`)
    .then(({ data }) => {
      const feed = parse(data);
      state.feeds.push(feed);
      state.posts.unshift(...feed.elements);
      state.urls.push(url);
      state.requestStatus = requestOptions.finished;
    })
    .catch((e) => {
      state.requestStatus = requestOptions.failed;
      throw e;
    });
};

const getNewPosts = ({ data }, { posts }) => {
  const { elements } = parse(data);
  const newPosts = elements.filter((el) => {
    const hasPost = posts.some(({ title }) => title === el.title);
    return !hasPost;
  });

  return newPosts;
};

export const updateFeeds = (state) => {
  const promises = state.urls.map((url) => axios.get(`${proxy}/${url}`));
  const updateInterval = 5000;
  Promise.all(promises)
    .then((res) => {
      res.forEach((el) => {
        const newPosts = getNewPosts(el, state);
        state.posts.unshift(...newPosts);
      });
    })
    .catch((e) => {
      console.error('ошибка-', e.message);
    })
    .finally(() => setTimeout(() => updateFeeds(state), updateInterval));
};
