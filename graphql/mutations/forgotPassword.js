const { sendMail } = require('../../lib/mailgun');
const { createToken } = require('../../lib/token');
const t = require('../../lib/translation');

module.exports = {
  schema: 'forgotPassword(email: String!): Boolean',
  resolver: async (item, { email }, context, info, { query }) => {
    // Get user id
    const {
      errors,
      data: { allUsers },
    } = await query(
      `query AllUsers($email: String!) {
        allUsers(where: { email: $email }) {
          id
          langCode        
        }
      }`,
      {
        variables: { email },
        skipAccessControl: true,
      }
    );

    console.log('allUsers', allUsers);

    if (errors) {
      throw errors[0];
    }

    if (allUsers && !allUsers.length) {
      throw new Error('Email does not exist.');
    }

    const { id, langCode } = allUsers[0];

    const token = await createToken(query, id);

    await sendMail({
      subject: t(langCode, 'resetPassword.subject'),
      to: email,
      template: {
        filename: 'reset-password',
        email,
        token,
        langCode: langCode,
      },
    }).catch((err) => {
      throw new Error(`Could not send email, ${err.message}.`);
    });

    return true;
  },
};
