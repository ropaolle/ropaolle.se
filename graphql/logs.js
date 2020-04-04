const executeQuery = require('./executeQuery');

const createLog = async (message, level = 'info', jsonData) =>
  executeQuery(
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

module.exports = {
  createLog,
};
