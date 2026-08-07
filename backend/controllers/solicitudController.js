const { validationResult } = require("express-validator");
const solicitudService = require("../services/solicitudService");

class SolicitudController {

    async crear(req, res, next) {
        try {
            const errores = validationResult(req);

            if (!errores.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    errores: errores.array()
                });
            }

            const solicitud = await solicitudService.crear({
                inmueble_id: req.body.inmueble_id,
                cliente_id: req.usuario.id,
                mensaje: req.body.mensaje
            });

            res.status(201).json({
                ok: true,
                mensaje: "Solicitud enviada correctamente.",
                data: solicitud
            });

        } catch (error) {
            next(error);
        }
    }

    async listarMisSolicitudes(req, res, next) {
        try {
            const solicitudes = await solicitudService.listarMisSolicitudes(
                req.usuario.id
            );

            res.json({
                ok: true,
                data: solicitudes
            });

        } catch (error) {
            next(error);
        }
    }

    async listarRecibidas(req, res, next) {
        try {
            const solicitudes = await solicitudService.listarRecibidas(
                    req.usuario
                );

            res.json({
                ok: true,
                data: solicitudes
            });

        } catch (error) {
            next(error);
        }
    }

    async aceptar(req, res, next) {
        try {
            // MEJORA 2 INTEGRADA: Validación de entrada antes de procesar
            const errores = validationResult(req);

            if (!errores.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    errores: errores.array()
                });
            }

            const resultado = await solicitudService.aceptar(
                req.params.id,
                req.body.observacion
            );

            res.json({
                ok: true,
                mensaje: "Solicitud aceptada.",
                data: resultado
            });

        } catch (error) {
            next(error);
        }
    }

    async rechazar(req, res, next) {
        try {
            // MEJORA 2 INTEGRADA: Validación de entrada antes de procesar
            const errores = validationResult(req);

            if (!errores.isEmpty()) {
                return res.status(400).json({
                    ok: false,
                    errores: errores.array()
                });
            }

            const resultado = await solicitudService.rechazar(
                req.params.id,
                req.body.observacion
            );

            res.json({
                ok: true,
                mensaje: "Solicitud rechazada.",
                data: resultado
            });

        } catch (error) {
            next(error);
        }
    }

}

module.exports = new SolicitudController();