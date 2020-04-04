const { sendMail } = require('../../lib/mailgun');
const { createToken } = require('../../lib/token');
const t = require('../../lib/translation');

module.exports = {
  schema: 'signup(data: UserCreateInput!): Boolean',
  resolver: async (item, { data }, context, info, { query }) => {
    // Create user
    const {
      errors: createUserErrors,
      data: { createUser },
    } = await query(
      `mutation CreateUser($data: UserCreateInput!) {
            createUser(data: $data) {
              id
              email
              langCode
            }
          }
        `,
      {
        variables: { data },
        skipAccessControl: true,
      }
    );

    if (createUserErrors) {
      throw createUserErrors[0];
    }

    const { id, email, langCode } = createUser;

    const token = await createToken(query, id);

    await sendMail({
      subject: t(langCode, 'confirmEmail.subject'),
      to: email,
      template: {
        filename: 'confirm-email',
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
