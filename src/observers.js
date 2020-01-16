import $ from 'jquery';
import { requestOptions, inputOptions } from './consts';

export const observerModal = (state) => () => {
  $('#info-modal').find('.modal-body').text(state.modalInfo);
};

export const observerInput = (state) => () => {
  const input = document.getElementById('rss-input');
  const button = document.getElementById('rss-button');
  const message = document.getElementById('rss-message');
  switch (state.urlStatus) {
    case inputOptions.empty:
      input.classList.remove('is-invalid');
      input.classList.remove('is-valid');
      button.setAttribute('disabled', true);
      input.value = '';
      break;
    case inputOptions.valid:
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
      button.removeAttribute('disabled');
      message.textContent = 'Введите Url';
      message.classList.remove('text-danger');
      break;
    case inputOptions.invalid:
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      button.setAttribute('disabled', true);
      message.textContent = 'Введите Url';
      message.classList.remove('text-danger');
      break;
    case inputOptions.hasUrl:
      input.classList.add('is-invalid');
      button.setAttribute('disabled', true);
      message.textContent = 'Данный канал уже добавлен';
      message.classList.add('text-danger');
      break;
    default:
      break;
  }
};

export const observerFeeds = (currentState) => () => {
  const state = currentState;
  const message = document.getElementById('rss-message');
  const button = document.getElementById('rss-button');
  switch (state.requestStatus) {
    case requestOptions.waiting:
      message.textContent = 'Введите Url';
      message.classList.remove('text-danger', 'text-success');
      break;
    case requestOptions.requesting:
      message.textContent = 'Загрузка...';
      message.classList.add('text-warning');
      button.setAttribute('disabled', true);
      break;
    case requestOptions.finished:
      message.textContent = 'Канал добавлен';
      message.classList.remove('text-warning');
      message.classList.add('text-success');
      state.urlStatus = inputOptions.empty;
      break;
    case requestOptions.failed:
      message.textContent = 'Произошла ошибка, возможно вы ввели неверный Url';
      message.classList.remove('text-warning');
      message.classList.add('text-danger');
      state.urlStatus = inputOptions.empty;
      break;
    default:
      break;
  }
};
