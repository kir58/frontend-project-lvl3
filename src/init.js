import '@babel/polyfill';
import feeds from './feeds';
import doValidate from './doValidate';


export default () => {
  doValidate();
  feeds();
};
