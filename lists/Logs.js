const { Text, Select } = require('@keystonejs/fields');
const { createdAt } = require('@keystonejs/list-plugins');
const { isAuthenticated } = require('../lib/auth');

const levels = [
  { value: 'error', label: 'Error' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'debug', label: 'Debug' },
];

module.exports = {
  fields: {
    message: { type: Text, isRequiered: true },
    level: { type: Select, options: levels, defaultValue: 'info' },
    jsonData: { type: Text },
  },
  plugins: [createdAt({ format: 'YYYY-MM-DD HH:mm:ss' })],
  access: {
    read: isAuthenticated,
  },
};
