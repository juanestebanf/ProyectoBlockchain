const { validationResult } = require("express-validator");
const pagoService = require("../services/pagoService");

class PagoController {

    // ===============================
    // Crear pago
    // ===============================
    async crear(req, res, next) {

        try {

            const errores = validationResult(req);

            if (!errores.isEmpty()) {

                return res.status(400).json({

                    ok: false,

                    errores: errores.array()

                });

            }

            const pago = await pagoService.crear({

                contrato_id: req.body.contrato_id,

                monto: req.body.monto,

                metodo_pago: req.body.metodo_pago,

                referencia: req.body.referencia

            });

            res.status(201).json({

                ok: true,

                mensaje: "Pago registrado correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Listar todos (ADMIN)
    // ===============================
    async listar(req, res, next) {

        try {

            const pagos = await pagoService.listar();

            res.json({

                ok: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Mis pagos
    // ===============================
    async listarPorUsuario(req, res, next) {

        try {

            const pagos = await pagoService.listarPorUsuario(

                req.usuario.id

            );

            res.json({

                ok: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Pagos por contrato
    // ===============================
    async listarPorContrato(req, res, next) {

        try {

            const pagos = await pagoService.listarPorContrato(

                req.params.contratoId

            );

            res.json({

                ok: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Obtener pago
    // ===============================
    async obtenerPorId(req, res, next) {

        try {

            const pago = await pagoService.obtenerPorId(

                req.params.id

            );

            res.json({

                ok: true,

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Confirmar pago
    // ===============================
    async confirmar(req, res, next) {

        try {

            const pago = await pagoService.actualizarEstado(

                req.params.id,

                "CONFIRMADO"

            );

            res.json({

                ok: true,

                mensaje: "Pago confirmado.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Rechazar pago
    // ===============================
    async rechazar(req, res, next) {

        try {

            const pago = await pagoService.actualizarEstado(

                req.params.id,

                "RECHAZADO"

            );

            res.json({

                ok: true,

                mensaje: "Pago rechazado.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // ===============================
    // Registrar hash Blockchain
    // ===============================
    async actualizarTxHash(req, res, next) {

        try {

            const pago = await pagoService.actualizarTxHash(

                req.params.id,

                req.body.tx_hash

            );

            res.json({

                ok: true,

                mensaje: "Hash registrado correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new PagoController();