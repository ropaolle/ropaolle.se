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
  // queries: [
  //   {
  //     schema: 'notificationDestinations: Notifications',
  //     resolver: async (item, { name }, context, info, { query, access }) => {
  //       const result = { emails: [], sms: [] };

  //       // Get users and settings
  //       const {
  //         errors,
  //         data: { allUsers, allSettings },
  //       } = await query(
  //         `query {
  //             allUsers(first: 10) {
  //               email
  //               mobile
  //               smsNotifications
  //               emailNotifications
  //             }
  //             allSettings(where: { name: "settings" }) {
  //               value
  //             }
  //           }`
  //       );

  //       if (errors) {
  //         // TODO: Handel multiple errors
  //         throw errors[0];
  //       }

  //       const { testMode, testEmail, testSms } = allSettings[0].value;

  //       switch (testMode) {
  //         case 'test':
  //           result.emails = [testEmail];
  //           result.sms = [testSms];
  //           break;
  //         case 'normal':
  //           allUsers.forEach(({ email, mobile, smsNotifications, emailNotifications }) => {
  //             if (smsNotifications && mobile) {
  //               result.sms.push(mobile);
  //             }
  //             if (emailNotifications && email) {
  //               result.emails.push(email);
  //             }
  //           });
  //           break;
  //       }

  //       return result;
  //     },
  //   },
  // ],
  mutations: [
    require('./mutations/forgotPassword'),
    require('./mutations/resetPassword'),
    require('./mutations/signup'),
  ],
};
