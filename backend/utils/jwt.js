const jwt = require("jsonwebtoken");
// Ya no necesitas importar "env" si lo lees directo

const generarToken = (usuario) => {
    return jwt.sign(
        {
            id: usuario.id,
            correo: usuario.correo,
            rol: usuario.rol
        },
        process.env.JWT_SECRET, 
        {
            expiresIn: "60d"
        }
    );
};

module.exports = {
    generarToken
};