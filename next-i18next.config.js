/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'lv',
    locales: ['lv', 'en'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
