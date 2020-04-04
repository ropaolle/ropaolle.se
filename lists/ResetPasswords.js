const { Text } = require('@keystonejs/fields');
const { createdAt } = require('@keystonejs/list-plugins');
const { userIsAdmin } = require('../lib/auth');

module.exports = {
  fields: {
    token: { type: Text, isRequiered: true },
  },
  plugins: [createdAt()],
  access: {
    read: userIsAdmin,
    update: userIsAdmin,
    create: userIsAdmin,
    delete: userIsAdmin,
  },
};
