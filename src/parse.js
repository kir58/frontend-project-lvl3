const makePost = (element) => {
  const post = {
    title: element.querySelector('title').textContent,
    link: element.querySelector('link').textContent,
    description: element.querySelector('description').textContent,
  };
  return post;
};

export default (data) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/xml');

  const elements = doc.querySelectorAll('item');
  const parsedElements = [...elements].map(makePost);

  const feed = {
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
    elements: parsedElements,
  };

  return feed;
};
