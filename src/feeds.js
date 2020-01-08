import axios from 'axios';
import { watch } from 'melanke-watchjs';
import state from './state';
import parse from './parse';
import { renderFeeds, renderPosts } from './render';

const getFeeds = () => {
  const proxy = 'https://cors-anywhere.herokuapp.com';
  const promises = state.urls.map((url) => axios.get(`${proxy}/${url}`));
  Promise.all(promises)
    .then((res) => {
      res.forEach(parse);
      state.request = 'finished';
    })
    .catch((e) => {
      state.request = 'failed';
      throw e;
    });
};

export default () => {
  const form = document.getElementById('rss-form');
  const input = document.getElementById('rss-input');
  const message = document.getElementById('rss-message');

  watch(state, 'request', () => {
    switch (state.request) {
      case 'waiting':
        message.textContent = 'Введите Url';
        message.classList.remove('text-danger', 'text-success');
        break;
      case 'requesting':
        message.textContent = 'Загрузка...';
        message.classList.add('text-warning');
        getFeeds();
        break;
      case 'finished':
        message.textContent = 'Канал добавлен';
        message.classList.remove('text-warning');
        message.classList.add('text-success');
        input.value = '';
        renderFeeds(state);
        renderPosts(state);
        break;
      case 'failed':
        message.textContent = 'Произошла ошибка, возможно вы ввели неверный Url';
        message.classList.remove('text-warning');
        message.classList.add('text-danger');
        state.urls = state.urls.filter((el) => el !== input.value);
        input.value = '';
        break;
      default:
        break;
    }
  });

  const handLeFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    state.urls.push(url);
    state.request = 'requesting';
  };
  form.addEventListener('submit', handLeFormSubmit);
};
