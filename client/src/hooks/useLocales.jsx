import { useTranslation } from "react-i18next";
// material
import { enUS, koKR } from "@mui/material/locale";

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: "Korean",
    value: "ko",
    systemValue: koKR,
    icon: `${import.meta.env.BASE_URL}/static/icons/korean-flag.svg`,
  },
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: `${import.meta.env.BASE_URL}/static/icons/usa-flag.svg`,
  },
];

export default function useLocales() {
  const { i18n, t } = useTranslation();
  const langStorage = localStorage.getItem("i18nextLng");
  const currentLang =
    LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLocale = (newLocale) => {
    i18n.changeLanguage(newLocale);
    localStorage.setItem("i18nextLng", newLocale);
  };

  return {
    handleChangeLocale,
    t,
    currentLang,
    allLang: LANGS,
  };
}
