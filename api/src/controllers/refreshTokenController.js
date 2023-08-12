const { token } = require('../config');
const jwt = require('jsonwebtoken');
const pool = require('../database');

const refreshTokenController = async (req, res) => {

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const RT = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

  try {
    const foundToken = await pool.query('SELECT * FROM "userAuth" WHERE "refreshToken" = $1', [RT]);

    if (!foundToken) {
      jwt.verify(RT, token.refreshTokenSecretKey, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        console.log('Attempted refresh token reuse')
        const hackedUser = await pool.query('SELECT * FROM "userAuth" WHERE "userName" = $1', [decoded.username]);
        hackedUser.rows[0].refreshToken = [];
        const result = await pool.query('UPDATE "userAuth" SET "refreshToken" = $1 WHERE "userName" = $2', [hackedUser.rows[0].refreshToken, decoded.username]);
        console.log(result);
      }
      )
      return res.sendStatus(403);
    }

    const newRefreshTokenArray = foundToken.rows[0].refreshToken.filter(rt => rt !== RT);

    jwt.verify(RT, token.refreshTokenSecretKey, async (err, decoded) => {


      if (err) {
        console.log('expired refresh token')
        foundToken.rows[0].refreshToken = newRefreshTokenArray;
        const result = await pool.query('UPDATE "userAuth" SET "refreshToken" = $1 WHERE "userName" = $2', [foundToken.rows[0].refreshToken, decoded.username]);
        console.log(result);
      }


      if (err || foundToken.rows[0].userName !== decoded.username || foundToken.rows[0].isDeleted == true) return res.sendStatus(403);

      const permission = await pool.query('SELECT "permission" FROM "Permissions" WHERE "userId" = $1', [foundToken.rows[0].id]);
      const accessToken = jwt.sign({ "UserInfo": { username: decoded.username, roles: permission } }, token.secretKey, { expiresIn: '1h' });

      const newRefreshToken = jwt.sign({ username: decoded.username }, token.refreshTokenSecretKey, { expiresIn: '1h' });

      foundToken.rows[0].refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await pool.query('UPDATE "userAuth" SET "refreshToken" = $1 WHERE "userName" = $2', [foundToken.rows[0].refreshToken, decoded.username]);

      res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'none', maxAge: 30 * 24 * 60 * 60 * 1000, secure: true });

      res.json({ accessToken, permission: permission.rows[0].permission });
    });


  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};

module.exports = refreshTokenController;
