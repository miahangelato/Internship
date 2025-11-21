import i18next, { type i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import HttpBackend from "i18next-http-backend";

export const supportedLocales = ["en", "ja"] as const;
export type AppLocale = (typeof supportedLocales)[number];
export const defaultNS = "common";

let initPromise: Promise<i18n> | null = null;

export function initI18nClient(lng: AppLocale = "en"): Promise<i18n> {
  if (i18next.isInitialized) {
    if (i18next.language !== lng)
      return i18next.changeLanguage(lng).then(() => i18next);
    return Promise.resolve(i18next);
  }

  if (!initPromise) {
    initPromise = i18next
      .use(initReactI18next)
      .use(HttpBackend)
      .init({
        lng,
        fallbackLng: "en",
        supportedLngs: supportedLocales as unknown as string[],
        ns: [defaultNS],
        defaultNS,
        interpolation: { escapeValue: false },
        backend: {
          // served statically from /public/locales
          loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
      })
      .then(() => i18next);
  }

  return initPromise;
}

export { i18next as i18nInstance };
