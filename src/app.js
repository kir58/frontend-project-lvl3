import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import isUrl from 'validator/es/lib/isURL';
import { renderFeeds, renderPosts } from './render';
import { getFeed, updateFeeds } from './requests';
import { requestOptions, inputOptions } from './consts';

import { observerModal, observerInput, observerFeeds } from './observers';


const state = {
  request: requestOptions.waiting,
  currentUrl: inputOptions.empty,
  urls: [],
  posts: [],
  feeds: [],
  modalInfo: '',
};

const hanleChangeInput = ({ target: { value } }) => {
  state.request = requestOptions.waiting;
  if (value === '') {
    state.currentUrl = inputOptions.empty;
  } else if (state.urls.includes(value)) {
    state.currentUrl = inputOptions.hasUrl;
  } else if (isUrl(value)) {
    state.currentUrl = inputOptions.valid;
  } else {
    state.currentUrl = inputOptions.invalid;
  }
};

const handLeFormSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const url = formData.get('url');
  getFeed(state, url);
  state.request = requestOptions.requesting;
};

export default () => {
  watch(state, 'currentUrl', observerInput(state));
  watch(state, 'request', observerFeeds(state));
  watch(state, 'modalInfo', observerModal(state));
  watch(state, 'feeds', () => renderFeeds(state));
  watch(state, 'posts', () => renderPosts(state));

  updateFeeds(state);

  const input = document.getElementById('rss-input');
  input.addEventListener('input', hanleChangeInput);

  const form = document.getElementById('rss-form');
  form.addEventListener('submit', handLeFormSubmit);

  $('#info-modal').on('show.bs.modal', (e) => {
    const text = $(e.relatedTarget).data('whatever');
    state.modalInfo = text;
  });
};
