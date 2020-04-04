module.exports.extendGraphQLSchema = {
  // types: [
  //   {
  //     type: `type Notifications
  //       {
  //         emails: [String]
  //         sms: [String]
  //       }
  //     `,
  //   },
  // ],
  // queries: [],
  mutations: [
    require('./mutations/forgotPassword'),
    require('./mutations/resetPassword'),
    require('./mutations/signup'),
  ],
};
