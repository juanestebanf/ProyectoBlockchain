const authService = require("../services/authService");
const { success } = require("../utils/response");

class AuthController {

    async register(req, res, next) {

        try {

            const resultado = await authService.registrar(req.body);

            return success(
                res,
                "Usuario registrado correctamente.",
                resultado,
                201
            );

        } catch (error) {

            next(error);

        }

    }

    async login(req, res, next) {

        try {

            const { correo, password } = req.body;

            const resultado = await authService.login(
                correo,
                password
            );

            return success(
                res,
                "Inicio de sesión exitoso.",
                resultado
            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new AuthController();