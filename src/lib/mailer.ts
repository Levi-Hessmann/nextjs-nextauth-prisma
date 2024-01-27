declare global {
  var mailer: any;
}

const mailerInstance = require("nodemailer");

const mailer =
  global.mailer ||
  mailerInstance.createTransport({
    port: 465,
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    secure: true,
  });

export default mailer;
