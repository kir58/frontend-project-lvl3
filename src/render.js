// https://ru.hexlet.io/blog.rss
export const renderFeeds = ({ feeds }) => {
  const listContainer = document.getElementById('rss-feeds');
  const listHtml = feeds.map(({ title, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
      <h5>${title}</h3>
      <small>${description}</small>
    </li>`
  )).join('');

  listContainer.innerHTML = listHtml;
};

export const renderPosts = ({ posts }) => {
  const listContainer = document.getElementById('rss-posts');
  const listHtml = posts.map(({ title, link }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
      <a target="_blank" href=${link}>${title}</a>
    </li>`
  )).join('');

  listContainer.innerHTML = listHtml;
};
