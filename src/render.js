export const renderFeeds = ({ feeds }) => {
  const listContainer = document.getElementById('rss-feeds');
  const listHtml = feeds.map(({ title, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
      <h5>${title}</h5>
      <small>${description}</small>
    </li>`
  )).join('');

  listContainer.innerHTML = listHtml;
};

export const renderPosts = ({ posts }) => {
  const listContainer = document.getElementById('rss-posts');
  const listHtml = posts.map(({ title, link, description }) => (
    `<li class="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
      <a target="_blank" href=${link}>${title}</a>
      <button type="button" class="btn btn-info ml-4" data-toggle="modal" data-target="#info-modal" data-whatever='${description}'>
        Информация
      </button>
    </li>`
  )).join('');

  listContainer.innerHTML = listHtml;
};
