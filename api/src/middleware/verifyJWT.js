const jwt = require('jsonwebtoken');
const { token } = require('../config');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (req.path === '/login' || req.path === '/register' || req.path === '/refreshToken' || req.path === '/resendVerifyEmail') {
        return next();
      }
    if (req.path.startsWith('/users/')) {
        return next();
      }
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const tokken = authHeader.split(' ')[1];
    jwt.verify(
        tokken,
        token.secretKey,
        (err, decoded) => {
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.username;
            req.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT