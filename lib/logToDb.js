const logToDb = async (message, level = 'info', jsonData) => {
  const { keystone } = require('../index');
  /* const { data, errors } =  */ await keystone.executeQuery(
    `mutation CreateLogs($data: LogCreateInput!) {
        createLog(data: $data) {
          id
        }
      }`,
    {
      variables: {
        data: {
          message,
          level,
          jsonData: jsonData && JSON.stringify(jsonData),
        },
      },
    }
  );
};

module.exports = logToDb;
