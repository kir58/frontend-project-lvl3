import { watch } from 'melanke-watchjs';
import isUrl from 'validator/es/lib/isURL';

import state from './state';


export default () => {
  const input = document.getElementById('rss-input');
  const button = document.getElementById('rss-button');

  watch(state, 'currentUrl', () => {
    switch (state.currentUrl) {
      case 'empty':
        input.classList.remove('is-invalid');
        button.setAttribute('disabled', true);
        break;
      case 'valid':
        input.classList.remove('is-invalid');
        button.removeAttribute('disabled');
        break;
      case 'invalid':
        input.classList.add('is-invalid');
        button.setAttribute('disabled', true);
        break;
      default:
        break;
    }
  });

  const hanleChangeInput = ({ target: { value } }) => {
    state.request = 'waiting';
    if (value === '') {
      state.currentUrl = 'empty';
    } else if (isUrl(value) && !state.urls.includes(value)) {
      state.currentUrl = 'valid';
    } else {
      state.currentUrl = 'invalid';
    }
  };

  input.addEventListener('input', hanleChangeInput);
};
