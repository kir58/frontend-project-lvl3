import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import feeds from './feeds';
import doValidate from './doValidate';
import state from './state';

export default () => {
  doValidate();
  feeds();
  watch(state, 'modalInfo', () => $('#info-modal').find('.modal-body').text(state.modalInfo));

  $('#info-modal').on('show.bs.modal', (e) => {
    const text = $(e.relatedTarget).data('whatever');
    state.modalInfo = text;
  });
};
