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

const pluginStore = async (key, type) => {
  const configStore = strapi.store({
    environment: null,
    type: "core",
    name: key,
  });

  if (type === "get") {
    return await configStore.get({
      key,
    });
  } else {
    return await configStore.set({
      key,
      value: null,
    });
  }
};

const setRolePermissions = async () => {};

module.exports = async () => {
  // get the stored data
  let storedData = await pluginStore("ct-created", "get");
  let uid;
  if (storedData && storedData.contentType.name) {
    uid = strapi.models[storedData.contentType.name].uid;
  }
  // console.log(await strapi.query("permission", "admin").find());
  // const role = await strapi.query("role", "admin").findOne({code: "strapi-author"});
  // await strapi.admin.services.role.assignPermissions(role.id, [{}])

  console.log(storedData);
  console.log(uid);
  await pluginStore("ct-created");
  // if (storedData) {
  //   // find the role you want to edit
  //   const roleCode = "strapi-editor"; // the role code is a combination of 'strapi' and the slug of the role name
  // }
};
