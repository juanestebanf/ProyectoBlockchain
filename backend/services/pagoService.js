const PagoModel = require("../models/pagoModel");
const ContratoModel = require("../models/contratoModel");
const AppError = require("../utils/AppError");

const usuarioModel = require("../models/usuarioModel");
const smartRentService = require("../blockchain/services/smartRentService");
const blockchainService = require("./blockchainService");

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
        async registrarPago(idPago, usuario) {

        const pago =
            await PagoModel.buscarPorId(idPago);

        if (!pago) {

            throw new AppError(
                "Pago no encontrado.",
                404
            );

        }

        const contrato =
            await ContratoModel.buscarPorId(
                pago.contrato_id
            );

        if (!contrato) {

            throw new AppError(
                "Contrato no encontrado.",
                404
            );

        }

        if (

            usuario.rol !== "ADMIN" &&

            Number(contrato.cliente_id) !== Number(usuario.id)

        ) {

            throw new AppError(
                "No puede registrar este pago.",
                403
            );

        }

        const usuarioBD =
            await usuarioModel.buscarPorId(
                usuario.id
            );

        if (!usuarioBD.private_key) {

            throw new AppError(

                "El usuario no tiene una wallet configurada.",

                400

            );

        }

        const blockchain =
            await smartRentService.registrarPago(

                contrato.id,

                pago.monto,

                usuarioBD.private_key

            );

        await PagoModel.actualizarTxHash(

            pago.id,

            blockchain.txHash

        );

        await blockchainService.registrarEvento({

            contrato_id: contrato.id,

            evento: "PAGO",

            tx_hash: blockchain.txHash,

            bloque: blockchain.bloque

        });

        await PagoModel.actualizarEstado(

            pago.id,

            "CONFIRMADO"

        );

        return {

            pago:
                await PagoModel.buscarPorId(
                    pago.id
                ),

            blockchain

        };

    }

}

module.exports = new PagoService();