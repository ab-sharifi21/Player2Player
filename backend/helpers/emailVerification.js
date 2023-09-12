const nodemailer = require('nodemailer');
require('dotenv').config();
const generateError = require('../helpers/generateError');

const { SMTP_USER, SMTP_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
    host: 'api.brevo.com or smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD
    }
});

async function sendVerifyEmail (email, subject, html) {
    const emailOptions = {
        from: SMTP_USER,
        to: email,
        subject,
        html
    };

    try {
        await transport.sendMail(emailOptions);
    } catch (error) {
        throw generateError('Ha ocurrido un error', 500);
    }
};

module.exports = sendVerifyEmail;
