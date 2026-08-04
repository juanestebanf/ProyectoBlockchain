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
const listar = async () => {

    const query = `

        SELECT

            id,
            nombre,
            correo,
            rol,
            estado,
            fecha_registro

        FROM usuarios

        ORDER BY id;

    `;

    const { rows } = await db.query(query);

    return rows;

};

const actualizar = async (id, datos) => {

    const query = `

        UPDATE usuarios

        SET

            nombre=$1,
            correo=$2,
            rol=$3

        WHERE id=$4

        RETURNING
            id,
            nombre,
            correo,
            rol,
            estado;

    `;

    const values = [

        datos.nombre,

        datos.correo,

        datos.rol,

        id

    ];

    const { rows } = await db.query(query, values);

    return rows[0];

};

const eliminar = async (id) => {

    await db.query(

        `DELETE FROM usuarios WHERE id=$1`,

        [id]

    );

};

module.exports = {

    crearUsuario,

    buscarPorCorreo,

    buscarPorId,
    
    listar,

    actualizar,

    eliminar

};