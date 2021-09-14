module.exports = {
  definition: ``,
  query: ``,
  type: {},
  resolver: {
    Query: {
      locales: {
        resolver: "plugins::i18n.locales.listLocales",
      },
    },
  },
};
