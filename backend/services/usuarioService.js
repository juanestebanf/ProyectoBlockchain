const usuarioModel = require("../models/usuarioModel");
const AppError = require("../utils/AppError");

class UsuarioService {

    async listar() {

        return await usuarioModel.listar();

    }

    async actualizar(id, datos) {

        const usuario = await usuarioModel.buscarPorId(id);

        if (!usuario) {

            throw new AppError(
                "Usuario no encontrado.",
                404
            );

        }

        return await usuarioModel.actualizar(id, datos);

    }

    async eliminar(id) {

        const usuario = await usuarioModel.buscarPorId(id);

        if (!usuario) {

            throw new AppError(
                "Usuario no encontrado.",
                404
            );

        }

        try {

            await usuarioModel.eliminar(id);

        } catch (error) {

            if (error.code === "23503") {

                throw new AppError(
                    "Este usuario no puede eliminarse porque tiene contratos u otra información asociada.",
                    400
                );

            }

            throw error;

        }

    }

}

module.exports = new UsuarioService();