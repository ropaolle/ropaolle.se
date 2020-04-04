const { validateToken } = require('../../lib/token');

module.exports = {
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
};
