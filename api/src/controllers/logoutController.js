const pool = require('../database');

const { saveRefreshToken} = require('./authController');

const handleLogout =  async (req, res) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.jwt) return res.status(204).json({ error: 'No hay token de refresco' });
        const RT = cookies.jwt;

        const foundToken = await pool.query('SELECT * FROM "userAuth" WHERE "refreshToken" = $1', [RT]);

        if (!foundToken) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return res.status(204).json({ error: 'Token de refresco inválido' });
        }

        foundToken.rows[0].refreshToken = foundToken.rows[0].refreshToken.filter(rt => rt !== RT);
        const result = await saveRefreshToken(foundToken.rows[0].refreshToken, foundToken.rows[0].id);
        console.log(result);

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ message: 'Logout exitoso' });
    } catch (error) {
        res.status(500).json({ error: 'Error al hacer logout' });
    }
};


module.exports =  handleLogout ;