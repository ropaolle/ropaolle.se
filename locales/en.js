module.exports = {
  footer:
    'Copyright &copy; {{year}}, <a href="https://www.ropaolle.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">RopaOlle.se</a>.',
  signedBy: 'RopaOlle.se',
  confirmEmail: {
    subject: 'Welcome - Email verification ✔',
    title: 'Verify your email',
    bodyText: 'This is an automatically generated email from RopaOlle.se.',
    message: `Hi {{email}},`,
    confirmLink: `Verify your email with this link: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.`,
    expired: 'This link will only be valid for 30 minutes.',
  },
  resetPassword: {
    subject: 'Password recovery ✔',
    title: 'Recover your password',
    bodyText: 'This is an automatically generated email from RopaOlle.se.',
    message: 'Hi {{email}},',
    confirmLink:
      'Password recovery started. Use this link to recovery your password: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.',
    expired: 'This link will only be valid for 30 minutes.',
  },
};
