const nodemailer = require('nodemailer');
const { mailer } = require('../config');

module.exports = async (email, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: mailer.host,
            service: mailer.service,
            port: mailer.mail_port,
            secure: mailer.secure,
            auth: {
                user: mailer.email,
                pass: mailer.password
            }
        });

        await transporter.sendMail({
            from: mailer.email,
            to: email,
            subject,
            text: message
        });
        console.log('Email sent');
    } catch (error) {
        console.log('email not sent');
        console.log(error);
        return error;
    }
}
