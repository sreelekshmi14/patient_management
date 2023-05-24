const { createTransport } = require('nodemailer');
const { mail } = require('../config');

let transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: mail.email,
    pass: mail.pass,
  },
});

module.exports = transporter;