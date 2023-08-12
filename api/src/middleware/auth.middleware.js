const jwt = require("jsonwebtoken");
const { token } = require("../config");

function authenticateToken(req, res, next) {
    const tokken = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!tokken) {
        return res.status(401).json({ message: "No se proporcionó un token" });
    }

    verify(tokken, token.secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;