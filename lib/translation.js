const sv = require('../locales/sv');
const en = require('../locales/en');
const translate = { sv, en };

// Get nested from dot string, e.g. 'a.b.c.
const getNestedObject = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

// Replace params 'String {{param}}'.
const replaceParams = (val, params) => {
  if (val && params) {
    for (const key in params) {
      const element = params[key];
      if (key && element) {
        const regexp = new RegExp(`{{${key}}}`, 'g');
        val = val.replace(regexp, element);
      }
    }
  }

  return val;
};

const t = (langCode = 'sv', path, defaultValue, params) => {
  const val = path && getNestedObject(translate[langCode], path.split('.'));
  return replaceParams(val, params) || defaultValue || path;
};

module.exports = t;
