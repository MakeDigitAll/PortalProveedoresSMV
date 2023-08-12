const { Pool } = require("pg");
const { db } = require("./config");

const pool = new Pool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    port: db.port,
});

pool.connect((err, client, done) => {
    if (err) {
        console.log("Error al conectar con la base de datos");
    } else {
        console.log("Conexión exitosa con la base de datos");
    }
});

module.exports = pool;