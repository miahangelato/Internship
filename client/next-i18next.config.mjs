// next-i18next.config.mjs
export default {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ja"],
  },
  // Helpful in dev so changes to json reload without restart
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
