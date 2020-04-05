const { Text, Virtual, Checkbox, Password, Select, DateTime } = require('@keystonejs/fields');
// const { atTracking } = require('@keystonejs/list-plugins');
const access = require('../lib/auth');

const langCodes = [
  { value: 'sv', label: 'Svenska' },
  { value: 'en', label: 'Engelska' },
];

module.exports = {
  fields: {
    firstName: { type: Text },
    lastName: { type: Text },
    name: {
      type: Virtual,
      resolver: (item) => `${item.firstName} ${item.lastName}`,
    },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox, defaultValue: false },
    isBlocked: { type: Checkbox, defaultValue: true },
    isEmailValidated: { type: Checkbox, defaultValue: false },
    password: { type: Password },
    mobile: { type: Text },
    langCode: { type: Select, options: langCodes, defaultValue: 'sv' },
    lastAccess: { type: DateTime, format: 'YYYY-MM-DD HH:mm:ss' },
  },
  // plugins: [atTracking()],
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
  labelResolver: async (item, args, context, { schema }) => {
    return item.id;
  },
  /* hooks: {
    afterChange: async ({ updatedItem, originalInput, existingItem, context }) => {
      // NOTE: Confirm email if changed
    },
    resolveInput: ({ operation, existingItem, originalInput, resolvedData, context, actions }) => {
      // Input resolution logic
      // Object returned is used in place of resolvedData
      return resolvedData;
    },
  }, */
};
