
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from '../locales/ru';
import en from '../locales/en';
import setLocalTextToPage from './setLocalTextToPage';

const resources = {
  'ru-RU': {
    translation: ru,
  },
  en: {
    translation: en,
  },
};

export default () => i18next
  .use(LanguageDetector)
  .init({
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV !== 'production',
    resources,
  })
  .then(setLocalTextToPage);
