const PagoService = require("../services/pagoService");
const { validationResult } = require("express-validator");

class PagoController {

    // =====================================
    // CREAR PAGO
    // =====================================

    async crear(req, res, next) {

        try {

            const errores = validationResult(req);

            if (!errores.isEmpty()) {

                return res.status(400).json({

                    success: false,

                    errores: errores.array()

                });

            }

            const pago = await PagoService.crear(req.body);

            return res.status(201).json({

                success: true,

                message: "Pago creado correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // LISTAR TODOS
    // =====================================

    async listar(req, res, next) {

        try {

            const pagos = await PagoService.listar();

            return res.json({

                success: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // LISTAR POR CONTRATO
    // =====================================

    async listarPorContrato(req, res, next) {

        try {

            const { contratoId } = req.params;

            const pagos = await PagoService.listarPorContrato(contratoId);

            return res.json({

                success: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // LISTAR MIS PAGOS
    // =====================================

    async listarPorUsuario(req, res, next) {

        try {

            const usuarioId = req.usuario.id;

            const pagos = await PagoService.listarPorUsuario(usuarioId);

            return res.json({

                success: true,

                data: pagos

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // OBTENER POR ID
    // =====================================

    async obtenerPorId(req, res, next) {

        try {

            const { id } = req.params;

            const pago = await PagoService.obtenerPorId(id);

            return res.json({

                success: true,

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // ACTUALIZAR ESTADO
    // =====================================

    async actualizarEstado(req, res, next) {

        try {

            const { id } = req.params;

            const { estado } = req.body;

            const pago = await PagoService.actualizarEstado(

                id,

                estado

            );

            return res.json({

                success: true,

                message: "Estado actualizado correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // ACTUALIZAR TX HASH
    // =====================================

    async actualizarTxHash(req, res, next) {

        try {

            const { id } = req.params;

            const { txHash } = req.body;

            const pago = await PagoService.actualizarTxHash(

                id,

                txHash

            );

            return res.json({

                success: true,

                message: "Hash almacenado correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

    // =====================================
    // ACTUALIZAR REFERENCIA
    // =====================================

    async actualizarReferencia(req, res, next) {

        try {

            const { id } = req.params;

            const { referencia } = req.body;

            const pago = await PagoService.actualizarReferencia(

                id,

                referencia

            );

            return res.json({

                success: true,

                message: "Referencia actualizada correctamente.",

                data: pago

            });

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new PagoController();