const usuarioService = require("../services/usuarioService");
const { success } = require("../utils/response");

class UsuarioController {

    async listar(req, res, next) {

        try {

            const usuarios = await usuarioService.listar();

            return success(
                res,
                "Usuarios obtenidos correctamente.",
                usuarios
            );

        } catch (error) {

            next(error);

        }

    }

    async actualizar(req, res, next) {

        try {

            const usuario = await usuarioService.actualizar(

                req.params.id,

                req.body

            );

            return success(
                res,
                "Usuario actualizado correctamente.",
                usuario
            );

        } catch (error) {

            next(error);

        }

    }

    async eliminar(req, res, next) {

        try {

            await usuarioService.eliminar(

                req.params.id

            );

            return success(
                res,
                "Usuario eliminado correctamente."
            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new UsuarioController();