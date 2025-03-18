const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9fdbfe30280626",
    pass: "0705066ac4c8bb"
  }
});

module.exports = transport;