export default class Example {
  constructor(element) {
    this.element = element;
  }

  init() {
    this.element.textContent = '';
    console.log('ehu!');
  }
}
