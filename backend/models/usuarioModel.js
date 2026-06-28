const db = require("../config/db");

const crearUsuario = async (usuario) => {

    const { nombre, correo, password, rol } = usuario;

    const query = `
        INSERT INTO usuarios
        (nombre, correo, password, rol)
        VALUES ($1,$2,$3,$4)
        RETURNING *
    `;

    const values = [
        nombre,
        correo,
        password,
        rol
    ];

    const { rows } = await db.query(query, values);

    return rows[0];

};

const buscarPorCorreo = async (correo) => {

    const query = `
        SELECT *
        FROM usuarios
        WHERE correo=$1
    `;

    const { rows } = await db.query(query, [correo]);

    return rows[0];

};

const buscarPorId = async (id) => {

    const query = `
        SELECT *
        FROM usuarios
        WHERE id=$1
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

};

module.exports = {

    crearUsuario,

    buscarPorCorreo,

    buscarPorId

};