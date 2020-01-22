export default (t) => {
  const title = document.getElementById('rss-title');
  const description = document.getElementById('rss-description');
  const channels = document.getElementById('rss-channels-title');
  const posts = document.getElementById('rss-posts-title');
  const message = document.getElementById('rss-message');
  const buttonAdd = document.getElementById('rss-button-add');
  const buttonClose = document.getElementById('rss-button-close');

  title.textContent = t('mainInfo.title');
  description.textContent = t('mainInfo.description');
  channels.textContent = t('mainInfo.channels');
  posts.textContent = t('mainInfo.posts');
  message.textContent = t('message.waiting');
  buttonAdd.textContent = t('buttons.add');
  buttonClose.textContent = t('buttons.close');
};
