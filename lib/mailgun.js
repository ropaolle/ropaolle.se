const nodemailer = require('nodemailer');

const mailgun = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_SERVER,
  port: 465,
  secure: true, // use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = async function ({ subject, html, text, to, from = process.env.MAILGUN_FROM }) {
  if (!to) {
    return;
  }

  // from: `Teleoffice MVNO API ✔ <${process.env.SMTP_USER}>`,

  return await mailgun.sendMail({ subject, html, text, to, from });
  // return new Promise((resolve, reject) => {
  //   mailgun.messages().send(data, (error, body) => {
  //     if (error) {
  //       createLog(`Email - ${error.message} (status code: ${error.statusCode})`, 'error', data);
  //       resolve({ error });
  //     }
  //     createLog('Email notification sent', 'info', { subject, to, from });
  //     resolve({ body });
  //   });
  // });
};

// @bind({scope: BindingScope.TRANSIENT})
// export class MailService {
//   constructor(
//     @inject(TokenServiceBindings.TOKEN_SERVICE)
//     public jwtService: TokenService,
//   ) {}

//   async sendMail(mailOptions: SendMailOptions): Promise<void> {
//     return await transporterTeleoffice.sendMail(mailOptions);
//   }

//   async sendConfirmaEmailLink(confirmationOptions: ConfirmationOptions): Promise<void> {
//     const {id, email, url, login} = confirmationOptions;
//     const token = await this.jwtService.generateToken({id: String(id), email});
//     const link = `${url}/${token}`;

//     return await transporterTeleoffice.sendMail({
//       from: `Teleoffice MVNO API ✔ <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: 'Confirm email address',
//       text: confirmEmail.text(email, link, login),
//       html: confirmEmail.html(email, link, login),
//     });
//   }

//   async sendResetPasswordLink(confirmationOptions: ConfirmationOptions): Promise<void> {
//     const {id, email, url} = confirmationOptions;
//     const token = await this.jwtService.generateToken({id: String(id), email});
//     const link = `${url}/${token}`;

//     return await transporterTeleoffice.sendMail({
//       from: `Teleoffice MVNO API ✔ <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: 'Reset password link',
//       text: resetPassword.text(email, link),
//       html: resetPassword.html(email, link),
//     });
//   }
// }
