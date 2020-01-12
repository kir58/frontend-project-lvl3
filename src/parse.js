const makePost = (element) => {
  const post = {
    title: element.querySelector('title').textContent,
    link: element.querySelector('link').textContent,
    description: element.querySelector('description').textContent,
  };
  return post;
};

const makeFeed = (data) => {
  const elements = data.querySelectorAll('item');
  const parsedElements = [...elements].map(makePost);
  const feed = {
    title: data.querySelector('title').textContent,
    description: data.querySelector('description').textContent,
    elements: parsedElements,
  };
  return feed;
};

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');
  return makeFeed(doc);
};
