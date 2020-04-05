module.exports.extendGraphQLSchema = {
  // types: [
  //   {
  //     type: `type _ANotifications
  //       {
  //         emails: [String]
  //         sms: [String]
  //       }
  //     `,
  //   },
  //   { type: `directive @log(format: String) on FIELD_DEFINITION` },
  //   { type: `directive @formatDate(format: String = "d, MMM, yyyy") on FIELD_DEFINITION` },
  // ],
  // queries: [],
  mutations: [
    require('./mutations/forgotPassword'),
    require('./mutations/resetPassword'),
    require('./mutations/signup'),
  ],
};
