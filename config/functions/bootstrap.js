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
  // get the stored data from the core-store on content-type
  let storedData = await pluginStore("ct-created", "get");

  if (storedData) {
    // construct model UID on information from CTB
    let uid;
    if (storedData && storedData.contentType.name) {
      uid = strapi.models[storedData.contentType.name].uid;
    }

    // Fetch all non-super admin roles
    const roles = await strapi
      .query("role", "admin")
      .find({ code_ne: "strapi-super-admin" });

    // Array of all permission action keys
    const actionKeys = [
      "plugins::content-manager.explorer.create",
      "plugins::content-manager.explorer.read",
      "plugins::content-manager.explorer.update",
      "plugins::content-manager.explorer.delete",
      "plugins::content-manager.explorer.publish",
    ];

    if (storedData.contentType && roles && uid) {
      // Construct payload array to be looped through with promises
      let payloads = [];

      // Loop through all non-super admin role (Author, Editor, ect)
      roles.forEach((role) => {
        // Assign fields to properties (will grant role all permissions to all fields)
        let attributeKeys = Object.keys(storedData.contentType.attributes);
        let properties = { fields: attributeKeys };

        // Construct new payload to push into array
        let newPayload = {
          subject: uid,
          role: role.id,
          properties,
        };

        // Loop through action keys to create all permissions
        actionKeys.forEach((actionkey) => {
          newPayload.action = actionkey;
          payloads.push(newPayload);
        });
      });

      // if (payloads[0]) {
      //   console.log([...payloads]);
      // }

      // Process all payloads and update database
      payloads.forEach(async (payload) => {
        console.log("before", payload);
        let data = await strapi.query("permission", "admin").create(payload);
        console.log("after", data);
      });
      // Promise.all(
      //   payloads.map(
      //     async (payload) =>
      //       await strapi.query("permission", "admin").create(payload)
      //   )
      // );
    }
    // remove key from core-store
    await pluginStore("ct-created");
  }
};
