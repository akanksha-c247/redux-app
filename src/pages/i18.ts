import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: './i18/{{lng}}/{{ns}}.json',
    },
    fallbackLng: 'en',
    debug: false,
    ns: ['common', 'home', 'profile'],
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18next;
