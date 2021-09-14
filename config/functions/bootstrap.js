"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const getStoredData = async () => {
  const configStore = strapi.store({
    environment: strapi.config.environment,
    name: "ct-created",
  });

  return await configStore.get({
    key: "created-ct",
  });
};

const setRolePermissions = async () => {};

module.exports = async () => {
  // get the stored data
  console.log(await strapi.query("permission", "admin").find());
  // const role = await strapi.query("role", "admin").findOne({code: "strapi-author"});
  // await strapi.admin.services.role.assignPermissions(role.id, [{}])
  let storedData = await getStoredData();
  if (storedData) {
    // find the role you want to edit
    const roleCode = "strapi-editor"; // the role code is a combination of 'strapi' and the slug of the role name
  }
};
