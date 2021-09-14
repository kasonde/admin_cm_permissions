"use strict";

/**
 * `is-content-type-created` policy.
 */

module.exports = async (ctx, next) => {
  // constructing config store key
  const configStore = strapi.store({
    environment: null,
    type: "core",
    name: "ct-created",
  });
  // store both in the config store
  await configStore.set({
    key: "ct-created",
    value: ctx.request.body,
  });

  await next();
};
