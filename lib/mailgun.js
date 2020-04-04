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

module.exports.sendMail = async function ({
  subject,
  html,
  text,
  to,
  from = process.env.MAILGUN_FROM,
  template,
}) {
  if (!to) {
    return;
  }

  // Use template if it is specified
  let templateHtml;
  if (template && template.filename) {
    const html = require(`./email-templates/${template.filename}`);
    templateHtml = html(template);
  }

  return await mailgun.sendMail({ subject, html: templateHtml || html, text, to, from });
};
