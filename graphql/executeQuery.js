const executeQuery = async (graphQlQuery, variables) => {
  const { keystone } = require('../index');
  try {
    const { data, errors } = await keystone.executeQuery(graphQlQuery, variables);
    if (!errors) {
      return data;
    }
    console.error(errors);
  } catch (err) {
    console.error(err);
  }
};

module.exports = executeQuery;
