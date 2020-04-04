const crypto = require('crypto');
const differenceInMinutes = require('date-fns/differenceInMinutes');
const parseISO = require('date-fns/parseISO');

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

module.exports.createToken = createToken;
module.exports.validateToken = validateToken;
