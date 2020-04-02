module.exports = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    serverUrl: process.env.HOST,
    websocketUrl: process.env.WS,
  },
};
