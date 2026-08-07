const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarioModel");
const { generarToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

class AuthService {

    async registrar(datos) {

        let { nombre, correo, password, rol } = datos;

        // Normalizar el rol
        rol = rol.toUpperCase();

        const usuarioExiste = await usuarioModel.buscarPorCorreo(correo);

        if (usuarioExiste) {

            throw new AppError(
                "Correo ya registrado.",
                400
            );

        }

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await usuarioModel.crearUsuario({

            nombre,

            correo,

            password: passwordHash,

            rol

        });

        const token = generarToken(nuevoUsuario);

        return {

            usuario: {

                id: nuevoUsuario.id,

                nombre: nuevoUsuario.nombre,

                correo: nuevoUsuario.correo,

                rol: nuevoUsuario.rol

            },

            token

        };

    }

    async login(correo, password) {

        const usuario = await usuarioModel.buscarPorCorreo(correo);

        if (!usuario) {

            throw new AppError(
                "Correo o contraseña incorrectos.",
                401
            );

        }

        const coincide = await bcrypt.compare(

            password,

            usuario.password

        );

        if (!coincide) {

            throw new AppError(
                "Correo o contraseña incorrectos.",
                401
            );

        }

        const token = generarToken(usuario);

        return {

            usuario: {

                id: usuario.id,

                nombre: usuario.nombre,

                correo: usuario.correo,

                rol: usuario.rol

            },

            token

        };

    }

}

module.exports = new AuthService();