const PagoModel = require("../models/pagoModel");
const ContratoModel = require("../models/contratoModel");
const AppError = require("../utils/AppError");

class PagoService {

    // =====================================
    // CREAR PAGO
    // =====================================

    async crear(datos) {

        const contrato = await ContratoModel.buscarPorId(
            datos.contrato_id
        );

        if (!contrato) {

            throw new AppError(
                "El contrato no existe.",
                404
            );

        }

        if (contrato.estado !== "ACTIVO") {

            throw new AppError(
                "Solo se pueden registrar pagos para contratos activos.",
                400
            );

        }
        const pagoPendiente =
            await PagoModel.buscarPendientePorContrato(
                datos.contrato_id
            );

        if (pagoPendiente) {

            throw new AppError(
                "Ya existe un pago pendiente para este contrato.",
                400
            );

        }

        const pago = await PagoModel.crear({

            contrato_id: datos.contrato_id,

            monto: datos.monto,

            estado: "PAGO_PENDIENTE",

            metodo_pago: datos.metodo_pago,

            referencia: datos.referencia

        });

        return pago;

    }

    // =====================================
    // LISTAR TODOS
    // =====================================

    async listar() {

        return await PagoModel.listar();

    }

    // =====================================
    // LISTAR POR CONTRATO
    // =====================================

    async listarPorContrato(contratoId) {

        return await PagoModel.listarPorContrato(
            contratoId
        );

    }

    // =====================================
    // LISTAR POR USUARIO
    // =====================================

    async listarPorUsuario(usuarioId) {

        return await PagoModel.listarPorUsuario(
            usuarioId
        );

    }

    // =====================================
    // OBTENER POR ID
    // =====================================

    async obtenerPorId(id) {

        const pago = await PagoModel.buscarPorId(id);

        if (!pago) {

            throw new AppError(
                "Pago no encontrado.",
                404
            );

        }

        return pago;

    }

    // =====================================
    // ACTUALIZAR ESTADO
    // =====================================

    async actualizarEstado(id, estado) {

        const pago = await PagoModel.buscarPorId(id);

        if (!pago) {

            throw new AppError(
                "Pago no encontrado.",
                404
            );

        }

        return await PagoModel.actualizarEstado(
            id,
            estado
        );

    }

    // =====================================
    // ACTUALIZAR TX HASH
    // =====================================

    async actualizarTxHash(id, txHash) {

        const pago = await PagoModel.buscarPorId(id);

        if (!pago) {

            throw new AppError(
                "Pago no encontrado.",
                404
            );

        }

        return await PagoModel.actualizarTxHash(
            id,
            txHash
        );

    }

    // =====================================
    // ACTUALIZAR REFERENCIA
    // =====================================

    async actualizarReferencia(id, referencia) {

        const pago = await PagoModel.buscarPorId(id);

        if (!pago) {

            throw new AppError(
                "Pago no encontrado.",
                404
            );

        }

        return await PagoModel.actualizarReferencia(
            id,
            referencia
        );

    }

}

module.exports = new PagoService();