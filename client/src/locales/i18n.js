import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import XHR from "i18next-http-backend";

//
import en from "./en.json";

// ----------------------------------------------------------------------

const resources = {
  en: {
    translation: en,
  },
};

i18n
  .use(XHR)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: localStorage.getItem("i18nextLng") || "en",
    returnNull: false,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
