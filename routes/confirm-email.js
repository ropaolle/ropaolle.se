const { validateToken } = require('../graphql/extendGraphQLSchema');

module.exports = async (req, res) => {
  const { keystone } = require('../index');

  if (!req.query || !req.query.token) {
    res.redirect(`${process.env.HOST}/error?message=missingToken`);
  }

  const { token } = req.query;
  const userId = token.substring(0, 24);

  const validation = await validateToken(keystone.executeQuery, token);

  if (validation !== 'valid') {
    res.redirect(`${process.env.HOST}/error?message=${validation}Token`);
  }

  const { error: updateUserError } = await keystone.executeQuery(
    `mutation UpdateUser($id: ID!, $data: UserUpdateInput!) {
        updateUser(id: $id, data: $data) {
          id
        }
      }`,
    { variables: { id: userId, data: { isEmailValidated: true } } }
  );

  if (updateUserError) {
    res.redirect(`${process.env.HOST}/error?message=databaseError`);
    throw updateUserError;
  }

  return res.redirect(`${process.env.HOST}/signin`);
};
