const {config} = require('dotenv');
config()

module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    },
    token: {
        secretKey: process.env.JWT_SECRET_KEY,
        refreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        encryptKey: process.env.ENCRYPT_KEY,
        encriptIV: process.env.ENCRYPT_IV
    },
    mailer: {
        host: process.env.MAILER_HOST,
        service: process.env.MAILER_SERVICE,
        mail_port: process.env.MAILER_EMAIL_PORT,
        secure: process.env.MAILER_SECURE,
        email: process.env.MAILER_EMAIL,
        password: process.env.MAILER_PASSWORD
    }
}