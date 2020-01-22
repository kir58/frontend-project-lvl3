import $ from 'jquery';
import i18next from 'i18next';

import { requestOptions, inputOptions } from './consts';

export const observerModal = (state) => () => {
  $('#info-modal').find('.modal-body').text(state.modalInfo);
};

export const observerInput = (state) => () => {
  const input = document.getElementById('rss-input');
  const button = document.getElementById('rss-button-add');
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
      message.textContent = i18next.t('message.waiting');
      message.classList.remove('text-danger');
      break;
    case inputOptions.invalid:
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
      button.setAttribute('disabled', true);
      message.textContent = i18next.t('message.waiting');
      message.classList.remove('text-danger');
      break;
    case inputOptions.hasUrl:
      input.classList.add('is-invalid');
      button.setAttribute('disabled', true);
      message.textContent = i18next.t('message.hasChannel');
      message.classList.add('text-danger');
      break;
    default:
      break;
  }
};

export const observerFeeds = (currentState) => () => {
  const state = currentState;
  const message = document.getElementById('rss-message');
  const button = document.getElementById('rss-button-add');
  switch (state.requestStatus) {
    case requestOptions.waiting:
      message.textContent = i18next.t('message.waiting');
      message.classList.remove('text-danger', 'text-success');
      break;
    case requestOptions.requesting:
      message.textContent = i18next.t('message.requesting');
      message.classList.add('text-warning');
      button.setAttribute('disabled', true);
      break;
    case requestOptions.finished:
      message.textContent = i18next.t('message.hasChannel');
      message.classList.remove('text-warning');
      message.classList.add('text-success');
      state.urlStatus = inputOptions.empty;
      break;
    case requestOptions.failed:
      message.textContent = i18next.t('message.failed');
      message.classList.remove('text-warning');
      message.classList.add('text-danger');
      state.urlStatus = inputOptions.empty;
      break;
    default:
      break;
  }
};
