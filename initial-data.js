const crypto = require('crypto');
const randomString = () => crypto.randomBytes(6).hexSlice();

module.exports = async keystone => {
  const {
    data: {
      _allUsersMeta: { count },
    },
  } = await keystone.executeQuery(
    `query {
      _allUsersMeta {
        count
      }
    }`
  );

  if (count === 0) {
    keystone.createItems({
      User: [
        {
          firstName: 'Olof',
          lastName: 'Sjögren',
          email: 'olof.sjogren@licencia.se',
          password: 'd0d022ce728f',
          mobile: '+46707165447',
          isAdmin: true,
          isBlocked: false,
          isEmailValidated: true,
          smsNotifications: false,
          emailNotifications: false,
          langCode: 'sv',
        },
        {
          firstName: 'Ropa',
          lastName: 'Olle',
          email: 'ropaolle@gmail.com',
          password: 'd0d022ce728f',
          mobile: '+4670123456',
          isAdmin: false,
          isBlocked: false,
          isEmailValidated: true,
          smsNotifications: false,
          emailNotifications: false,
          langCode: 'sv',
        },
      ],
    });
  }
};
