module.exports = {
  footer:
    '3CX-testprobe for <a href="https://www.systembolaget.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">Systembolaget</a>, copyright &copy; {{year}}, <a href="https://www.ropaolle.se" style="color: #999999; font-size: 12px; text-align: center; text-decoration: underlined;">RopaOlle.se</a>.',
  confirmEmail: {
    subject: 'Welcome - Email verification',
    title: 'Verify your email',
    bodyText: 'This is an automatically generated email from 3CX-proben.',
    message: `Hi {{email}},`,
    confirmLink: `Verify your email with this link: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.`,
    expired: 'This link will only be valid for 30 minutes.',
  },
  resetPassword: {
    subject: 'Password recovery',
    title: 'Recover your password',
    bodyText: 'This is an automatically generated email from 3CX-proben.',
    message: 'Hi {{email}},',
    confirmLink:
      'Password recovery started. Use this link to recovery your password: <a href="{{link}}" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">{{link}}</a>.',
    expired: 'This link will only be valid for 30 minutes.',
  },
  notification: {
    bodyText: 'This is an automatically generated email from 3CX-proben.',
    time: 'Time: <strong>{{data}}</strong>',
    status: 'Status: <strong>{{data}}</strong>',
  },
};
