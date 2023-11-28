const jwt = require('jsonwebtoken');
const { token } = require('../config');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (req.path === '/login' || req.path === '/register' || req.path === '/refreshToken' || req.path === '/resendVerifyEmail' || req.path === '/logout') {
        return next();
      }
      if (req.path.startsWith('/pv')) {
        return next();
      }
    if (req.path.startsWith('/smv')) {
        return next();
      }
    if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ error: 'Token is invalid' });
    const tokken = authHeader.split(' ')[1];
    jwt.verify(
        tokken,
        token.secretKey,
        (err, decoded) => {
            if (err) return res.status(401).json({ error: 'Token is invalid' }); //invalid token
            req.user = decoded.username;
            req.roles = decoded.roles;
            next();
        }
    );
}

module.exports = verifyJWT