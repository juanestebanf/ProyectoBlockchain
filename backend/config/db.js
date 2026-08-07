const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

// ⭐ NUEVO: Configurar el search_path al iniciar la conexión
pool.on('connect', (client) => {
    client.query('SET search_path TO public');
    console.log('✅ search_path configurado a public');
});

// Verificar conexión
pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL conectado correctamente a Neon");
        client.release();
    })
    .catch(err => {
        console.error("❌ Error al conectar PostgreSQL");
        console.error(err.message);
    });

module.exports = pool;