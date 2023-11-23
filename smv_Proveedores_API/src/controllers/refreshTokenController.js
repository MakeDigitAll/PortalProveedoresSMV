const jwt = require('jsonwebtoken');
const pool = require('../database');
const {token} = require('../config');

const refreshTokenController = async (req, res) => { 

  const { aT, rT } = req.body;

  if (!aT || !rT) return res.status(400).json({ error: 'No se proporcionaron los parametros correctos' });

  try {

    const decoded = jwt.decode(aT, token.secretKey);

    const user = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1 AND "isDeleted" = $2', [decoded.username, false]);

    if (user) {

      jwt.verify(rT, token.refreshTokenSecretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ rfc: user.rfc, socialReason: user.socialReason, username: user.user, roles: user.roles}, token.secretKey, { expiresIn: '1h' });
        res.status(200).json({ accessToken: accessToken});
      });

    } else { 
        
        res.status(400).json({ error: 'Credenciales inválidas' });
  
      }

  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

module.exports = refreshTokenController;
