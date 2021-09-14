"use strict";

/**
 * `is-content-type-created` policy.
 */

module.exports = async (ctx, next) => {
  // get the contents of the request body and see what has been created
  // make sure that it exists, otherwise it's an error ❌
  if (ctx.request.body) {
    // get the object in the request body
    const contentTypeData = ctx.request.body;
    // store this data in the config store
    const configStore = strapi.store({
      environment: strapi.config.environment,
      name: "ct-created",
    });
    await configStore.set({
      key: "created-ct",
      value: contentTypeData,
    });
  }
  await next();
  // here you're going to fetch the
  console.log(ctx.response.body);
};
