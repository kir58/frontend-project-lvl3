import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import isUrl from 'validator/es/lib/isURL';

import localize from './loczalize';
import { renderFeeds, renderPosts } from './render';
import { addFeed, updateFeeds } from './requests';
import { requestOptions, inputOptions } from './consts';


import { observerModal, observerInput, observerFeeds } from './observers';


export default () => {
  const state = {
    requestStatus: requestOptions.waiting,
    urlStatus: inputOptions.empty,
    urls: [],
    posts: [],
    feeds: [],
    modalInfo: '',
  };

  localize();

  const hanleChangeInput = ({ target: { value } }) => {
    state.requestStatus = requestOptions.waiting;
    if (value === '') {
      state.urlStatus = inputOptions.empty;
    } else if (state.urls.includes(value)) {
      state.urlStatus = inputOptions.hasUrl;
    } else if (isUrl(value)) {
      state.urlStatus = inputOptions.valid;
    } else {
      state.urlStatus = inputOptions.invalid;
    }
  };

  const handLeFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    addFeed(state, url);
    state.requestStatus = requestOptions.requesting;
  };

  watch(state, 'urlStatus', observerInput(state));
  watch(state, 'requestStatus', observerFeeds(state));
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
