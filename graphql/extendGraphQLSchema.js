const crypto = require('crypto');
const differenceInMinutes = require('date-fns/differenceInMinutes');
const parseISO = require('date-fns/parseISO');
const mailgun = require('../lib/mailgun');
const t = require('../lib/translation');

// token = userId (24 bytes) + token (32 bytes)
async function createToken(query, userId) {
  const token = userId + crypto.randomBytes(32).toString('hex');

  const { errors: createResetPasswordErrors } = await query(
    `mutation CreateResetPasswords($data: ResetPasswordCreateInput!) {
            createResetPassword(data: $data) {
              id
            }
          }`,
    {
      variables: { data: { token } },
      skipAccessControl: true,
    }
  );

  if (createResetPasswordErrors) {
    throw createResetPasswordErrors[0];
  }

  return token;
}

async function validateToken(query, token) {
  if (!token) {
    return 'missing';
  }

  const {
    data: { allResetPasswords },
    error,
  } = await query(
    `query AllResetPasswords($token: String!) {
        allResetPasswords(where: { token: $token }) {
          id
          createdAt                  
        }
      }`,
    { variables: { token }, skipAccessControl: true }
  );

  if (error || allResetPasswords.length === 0) {
    return 'invalid';
  }

  // Token expire time is 30 minutes
  const createdAt = parseISO(allResetPasswords[0].createdAt);
  if (differenceInMinutes(createdAt, new Date()) < -30) {
    return 'expired';
  }

  return 'valid';
}

async function sendEmail({ template, subject, email, token, langCode }) {
  const html = require(`../lib/email-templates/${template}`);

  const { /* body,  */ error } = await mailgun({
    subject,
    html: html({ email, token, langCode }),
    to: email,
  });

  if (error) {
    throw error;
  }
}

module.exports.extendGraphQLSchema = {
  types: [
    { type: 'type Notifications { emails: [String], sms: [String] }' },
    {
      type:
        'type SettingJson { id: ID, mid: JSON, name: String, value: JSON, updatedAt: DateTime }',
    },
  ],
  queries: [
    {
      schema: 'notificationDestinations: Notifications',
      resolver: async (item, { name }, context, info, { query, access }) => {
        const result = { emails: [], sms: [] };

        // Get users and settings
        const {
          errors,
          data: { allUsers, allSettings },
        } = await query(
          `query {
              allUsers(first: 10) {
                email
                mobile
                smsNotifications
                emailNotifications
              }    
              allSettings(where: { name: "settings" }) {
                value
              }      
            }`
        );

        if (errors) {
          // TODO: Handel multiple errors
          throw errors[0];
        }

        const { testMode, testEmail, testSms } = allSettings[0].value;

        switch (testMode) {
          case 'test':
            result.emails = [testEmail];
            result.sms = [testSms];
            break;
          case 'normal':
            allUsers.forEach(({ email, mobile, smsNotifications, emailNotifications }) => {
              if (smsNotifications && mobile) {
                result.sms.push(mobile);
              }
              if (emailNotifications && email) {
                result.emails.push(email);
              }
            });
            break;
        }

        return result;
      },
    },
  ],
  mutations: [
    {
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

        await sendEmail({
          template: 'confirm-email',
          subject: t(langCode, 'confirmEmail.subject'),
          email,
          token,
          langCode: langCode,
        });

        return true;
      },
    },
    {
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

        if (errors) {
          throw errors[0];
        }

        if (allUsers && !allUsers.length) {
          throw new Error('Email does not exist.');
        }

        const { id, langCode } = allUsers[0];

        const token = await createToken(query, id);

        await sendEmail({
          template: 'reset-password',
          subject: t(langCode, 'resetPassword.subject'),
          email,
          token,
          langCode: langCode,
        });

        return true;
      },
    },
    {
      schema: 'resetPassword(password: String!, token: String!): String',
      resolver: async (item, { password, token }, context, info, { query }) => {
        const result = await validateToken(query, token);

        if (result !== 'valid') {
          throw new Error(result);
        }

        const id = token.substring(0, 24);

        // Update user
        const {
          errors,
          data: { updateUser },
        } = await query(
          `mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
                updateUser(id: $id, data: $data) {
                  email
                }
              }
            `,
          {
            variables: { id, data: { password } },
            skipAccessControl: true,
          }
        );

        if (errors) {
          throw errors[0];
        }

        return updateUser.email;
      },
    },
    {
      schema: 'updateSettingByName(name: String!, value: JSON): Boolean',
      resolver: async (item, { name, value }, context, info, { query }) => {
        const {
          // errors,
          data: { allSettings },
        } = await query(
          `query {
            allSettings(where: { name: "${name}"}) {
              id
            }
          }`
        );

        await query(
          `mutation UpdateSetting($id: ID!, $data: SettingUpdateInput!) {
            updateSetting(id: $id, data: $data) {
              id
            }
          }`,
          {
            variables: {
              id: allSettings[0].id,
              data: {
                json: JSON.stringify(value),
              },
            },
          }
        );

        return true;
      },
    },
  ],
};

module.exports.validateToken = validateToken;
