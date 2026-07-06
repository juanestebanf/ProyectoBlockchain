const ContratoService = require("../services/ContratoService");
const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

class ContratoController {

    // ================================
    // CREAR CONTRATO DESDE SOLICITUD
    // ================================
    async crear(req, res, next) {

        try {

            const errores = validationResult(req);

            if (!errores.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errores: errores.array()
                });
            }

            const { solicitudId } = req.body;

            const contrato = await ContratoService.crearDesdeSolicitud(solicitudId);

            return res.status(201).json({
                success: true,
                message: "Contrato creado correctamente.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // LISTAR TODOS (ADMIN)
    // ================================
    async listar(req, res, next) {

        try {

            const contratos = await ContratoService.listar();

            return res.json({
                success: true,
                data: contratos
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // LISTAR POR USUARIO
    // ================================
    async listarPorUsuario(req, res, next) {

        try {

            const usuarioId = req.usuario.id;

            const contratos = await ContratoService.listarPorUsuario(usuarioId);

            return res.json({
                success: true,
                data: contratos
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // OBTENER POR ID
    // ================================
    async obtenerPorId(req, res, next) {

        try {

            const { id } = req.params;

            const contrato = await ContratoService.obtenerPorId(id);

            return res.json({
                success: true,
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // ACTUALIZAR ESTADO
    // ================================
    async actualizarEstado(req, res, next) {

        try {

            const errores = validationResult(req);

            if (!errores.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errores: errores.array()
                });
            }

            const { id } = req.params;
            const { estado } = req.body;

            const contrato = await ContratoService.actualizarEstado(id, estado);

            return res.json({
                success: true,
                message: "Estado actualizado correctamente.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // GUARDAR TX HASH BLOCKCHAIN
    // ================================
    async actualizarTxHash(req, res, next) {

        try {

            const { id } = req.params;
            const { txHash } = req.body;

            const contrato = await ContratoService.actualizarTxHash(id, txHash);

            return res.json({
                success: true,
                message: "TX Hash actualizado correctamente.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // OBSERVACIONES
    // ================================
    async actualizarObservaciones(req, res, next) {

        try {

            const { id } = req.params;
            const { observaciones } = req.body;

            const contrato = await ContratoService.actualizarObservaciones(id, observaciones);

            return res.json({
                success: true,
                message: "Observaciones actualizadas correctamente.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // FECHAS DEL CONTRATO
    // ================================
    async actualizarFechas(req, res, next) {

        try {

            const { id } = req.params;
            const { fechaInicio, fechaFin } = req.body;

            const contrato = await ContratoService.actualizarFechas(
                id,
                fechaInicio,
                fechaFin
            );

            return res.json({
                success: true,
                message: "Fechas actualizadas correctamente.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }

    // ================================
    // INCUMPLIMIENTO
    // ================================
    async incumplir(req, res, next) {

        try {

            const { id } = req.params;
            const { observacion } = req.body;

            const contrato = await ContratoService.registrarIncumplimiento(
                id,
                observacion
            );

            return res.json({
                success: true,
                message: "Incumplimiento registrado.",
                data: contrato
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ContratoController();