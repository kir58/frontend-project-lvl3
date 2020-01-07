import state from './state';

const makePost = (element) => {
  const post = {
    title: element.querySelector('title').textContent,
    link: element.querySelector('link').textContent,
  };
  state.posts.push(post);
};

const makeFeed = (data) => {
  const title = data.querySelector('title').textContent;
  const hasFeed = state.feeds.some((feed) => feed.title === title);
  if (hasFeed) {
    return;
  }

  const feed = {
    title,
    description: data.querySelector('description').textContent,
  };
  const elements = data.querySelectorAll('item');
  elements.forEach(makePost);
  state.feeds.push(feed);
};

export default (xmls) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmls.data, 'text/xml');
  makeFeed(doc);
};
