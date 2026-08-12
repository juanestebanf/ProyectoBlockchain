const db = require("../config/db");

const smartRentService = require("../blockchain/services/smartRentService");
const contratoModel = require("../models/contratoModel");
const solicitudModel = require("../models/solicitudModel");
const inmuebleModel = require("../models/inmuebleModel");
const blockchainService = require("./blockchainService");
const usuarioModel = require("../models/usuarioModel");

const AppError = require("../utils/AppError");

class ContratoService {

    // =========================================
    // CREAR CONTRATO DESDE SOLICITUD
    // =========================================
    async crearDesdeSolicitud(solicitudId, observacion = null) {

        const cliente = await db.connect();

        try {

            await cliente.query("BEGIN");

            // Buscar la solicitud con toda la información necesaria
            const solicitud = await solicitudModel.buscarCompletaPorId(
                solicitudId
            );

            if (!solicitud) {
                throw new AppError(
                    "La solicitud no existe.",
                    404
                );
            }

            if (solicitud.estado !== "PENDIENTE") {
                throw new AppError(
                    "La solicitud ya fue procesada.",
                    400
                );
            }

            // Verificar que no exista un contrato previo
            const contratoExistente =
                await contratoModel.buscarPorSolicitud(
                    solicitud.id
                );

            if (contratoExistente) {
                throw new AppError(
                    "Ya existe un contrato para esta solicitud.",
                    400
                );
            }

            // 1. Aceptar la solicitud
            await solicitudModel.actualizarEstado(

                solicitud.id,

                "ACEPTADA",

                observacion

            );

            // 2. Crear contrato
            const contrato = await contratoModel.crear({

                solicitud_id: solicitud.id,

                inmueble_id: solicitud.inmueble_id,

                propietario_id: solicitud.propietario_id,

                cliente_id: solicitud.cliente_id,

                monto: solicitud.precio,

                fecha_inicio: new Date(),

                fecha_fin: null,

                estado: "PENDIENTE_FIRMA",

                observaciones:
                    "Contrato generado automáticamente desde la solicitud."

            });
            
            const propietario = await usuarioModel.buscarPorId(
                contrato.propietario_id
            );

            if (!propietario.private_key) {

                throw new AppError(
                    "El propietario no tiene una wallet configurada.",
                    400
                );

            }

            const blockchain = await smartRentService.crearContrato(

                {

                    idContrato: contrato.id,

                    idInmueble: contrato.inmueble_id,

                    tituloInmueble: solicitud.titulo,

                    propietario: solicitud.wallet_propietario,

                    cliente: solicitud.wallet_cliente,

                    monto: contrato.monto,

                    tipoOperacion: solicitud.tipo_operacion

                },

                propietario.private_key

            );
            await contratoModel.actualizarBlockchain(

                contrato.id,

                blockchain.txHash

            );


            // 3. Reservar inmueble
            await inmuebleModel.actualizarDisponibilidad(

                solicitud.inmueble_id,

                "RESERVADO"

            );

            // 4. Rechazar las demás solicitudes
            await solicitudModel.rechazarPendientesPorInmueble(

                solicitud.inmueble_id,

                solicitud.id

            );
            // 5. Registrar evento en Blockchain
            await blockchainService.registrarEvento({

                contrato_id: contrato.id,

                evento: "CONTRATO_CREADO",

                tx_hash: blockchain.txHash,

                bloque: blockchain.bloque

            });

            await cliente.query("COMMIT");

            return contrato;

        } catch (error) {

            await cliente.query("ROLLBACK");

            throw error;

        } finally {

            cliente.release();

        }

    }
    // =========================================
// =========================================
// FIRMA DEL PROPIETARIO
// =========================================
async firmarPropietario(idContrato, usuario) {

    const contrato = await contratoModel.buscarPorId(
        idContrato
    );

    if (!contrato) {

        throw new AppError(
            "Contrato no encontrado.",
            404
        );

    }

    // Solo el propietario o un administrador pueden firmar
    if (

        usuario.rol !== "ADMIN" &&

        Number(contrato.propietario_id) !== Number(usuario.id)

    ) {

        throw new AppError(
            "No puede firmar este contrato.",
            403
        );

    }

    // Obtener la wallet del usuario desde la BD
    const usuarioBD = await usuarioModel.buscarPorId(
        usuario.id
    );
    if (!usuarioBD.private_key) {

    throw new AppError(
        "El usuario no tiene una wallet configurada.",
        400
    );

        }

        const { ethers } = require("ethers");

        const wallet = new ethers.Wallet(
            usuarioBD.private_key
        );

        console.log("=================================");
        console.log("Usuario:", usuarioBD.nombre);
        console.log("Wallet BD:", usuarioBD.wallet);
        console.log("Wallet derivada:", wallet.address);
        console.log("=================================");

    // Firmar en blockchain usando SU wallet
    const blockchain =
        await smartRentService.firmarPropietario(

            contrato.id,

            usuarioBD.private_key

        );

    // Actualizar TX
    await contratoModel.actualizarBlockchain(
        contrato.id,
        blockchain.txHash
    );

    // Marcar que el propietario ya firmó
    await contratoModel.marcarFirmaPropietario(
        contrato.id
    );

    // Registrar evento
    await blockchainService.registrarEvento({

        contrato_id: contrato.id,

        evento: "FIRMA_PROPIETARIO",

        tx_hash: blockchain.txHash,

        bloque: blockchain.bloque

    });

    // Revisar si ambas firmas existen
    const contratoActualizado =
        await contratoModel.buscarPorId(
            contrato.id
        );

    if (

        contratoActualizado.firma_propietario &&

        contratoActualizado.firma_cliente

    ) {

        await contratoModel.actualizarEstado(

            contrato.id,

            "ACTIVO"

        );

    }

    return {

        contrato:
            await contratoModel.buscarPorId(
                contrato.id
            ),

        blockchain

    };

}

    // =========================================
    // LISTAR TODOS LOS CONTRATOS
    // =========================================
    async listar() {
        return await contratoModel.listar();
    }

    // =========================================
    // LISTAR POR USUARIO
    // =========================================
    async listarPorUsuario(usuarioId) {
        return await contratoModel.listarPorUsuario(usuarioId);
    }

    // =========================================
    // OBTENER POR ID
    // =========================================
    async obtenerPorId(id) {

        const contrato = await contratoModel.buscarPorId(id);

        if (!contrato) {
            throw new AppError("Contrato no encontrado.", 404);
        }

        return contrato;
    }

    // =========================================
    // ACTUALIZAR ESTADO
    // =========================================
    async actualizarEstado(id, estado) {
        return await contratoModel.actualizarEstado(id, estado);
    }

    // =========================================
    // GUARDAR TX BLOCKCHAIN
    // =========================================
    async actualizarTxHash(id, txHash) {
        return await contratoModel.actualizarTxHash(id, txHash);
    }

    // =========================================
    // AGREGAR OBSERVACIONES
    // =========================================
    async actualizarObservaciones(id, observaciones) {
        return await contratoModel.actualizarObservaciones(id, observaciones);
    }

    // =========================================
    // ACTUALIZAR FECHAS
    // =========================================
    async actualizarFechas(id, fechaInicio, fechaFin) {
        return await contratoModel.actualizarFechas(id, fechaInicio, fechaFin);
    }

    // =========================================
    // ESTADO + OBSERVACIONES (INCUMPLIMIENTO)
    // =========================================
    async registrarIncumplimiento(id, observacion) {
        return await contratoModel.actualizarEstadoYObservaciones(
            id,
            "INCUMPLIDO",
            observacion
        );
    }
    
// =========================================
// FIRMA DEL CLIENTE
// =========================================

async firmarCliente(idContrato, usuario) {

    const contrato =
        await contratoModel.buscarPorId(idContrato);

    if (!contrato) {

        throw new AppError(
            "Contrato no encontrado.",
            404
        );

    }

    // Solo el cliente o un administrador pueden firmar
    if (

        usuario.rol !== "ADMIN" &&

        Number(contrato.cliente_id) !== Number(usuario.id)

    ) {

        throw new AppError(
            "No puede firmar este contrato.",
            403
        );

    }

    // Obtener la información completa del usuario
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

        const { ethers } = require("ethers");

        const wallet = new ethers.Wallet(
            usuarioBD.private_key
        );

        console.log("=================================");
        console.log("Usuario:", usuarioBD.nombre);
        console.log("Wallet BD:", usuarioBD.wallet);
        console.log("Wallet derivada:", wallet.address);
        console.log("=================================");

    // Firmar usando la wallet del cliente
    const blockchain =
        await smartRentService.firmarCliente(

            contrato.id,

            usuarioBD.private_key

        );

    // Actualizar el último TX del contrato
    await contratoModel.actualizarBlockchain(

        contrato.id,

        blockchain.txHash

    );

    // Registrar evento en blockchain_eventos
    await blockchainService.registrarEvento({

        contrato_id: contrato.id,

        evento: "FIRMA_CLIENTE",

        tx_hash: blockchain.txHash,

        bloque: blockchain.bloque

    });

    // Marcar que el cliente ya firmó
    await contratoModel.marcarFirmaCliente(
        contrato.id
    );

    // Revisar si ambas firmas existen
    const contratoActualizado =
        await contratoModel.buscarPorId(
            contrato.id
        );

    if (

        contratoActualizado.firma_propietario &&

        contratoActualizado.firma_cliente

    ) {

        await contratoModel.actualizarEstado(

            contrato.id,

            "ACTIVO"

        );

    }

    return {

        contrato:
            await contratoModel.buscarPorId(
                contrato.id
            ),

        blockchain

    };

}
// =========================================
// FINALIZAR CONTRATO
// =========================================

async finalizarContrato(idContrato, usuario) {

    const contrato =
        await contratoModel.buscarPorId(idContrato);

    if (!contrato) {

        throw new AppError(
            "Contrato no encontrado.",
            404
        );

    }

    if (contrato.estado !== "ACTIVO") {

        throw new AppError(
            "Solo un contrato activo puede finalizarse.",
            400
        );

    }

    // Solo el propietario, el cliente o un administrador
    if (

        usuario.rol !== "ADMIN" &&

        Number(contrato.propietario_id) !== Number(usuario.id) &&

        Number(contrato.cliente_id) !== Number(usuario.id)

    ) {

        throw new AppError(
            "No puede finalizar este contrato.",
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
        await smartRentService.finalizarContrato(

            contrato.id,

            usuarioBD.private_key

        );

    await contratoModel.finalizarContrato(
        contrato.id
    );

    await contratoModel.actualizarBlockchain(

        contrato.id,

        blockchain.txHash

    );

    await blockchainService.registrarEvento({

        contrato_id: contrato.id,

        evento: "CONTRATO_FINALIZADO",

        tx_hash: blockchain.txHash,

        bloque: blockchain.bloque

    });

    return {

        contrato:
            await contratoModel.buscarPorId(
                contrato.id
            ),

        blockchain

    };

}
}

module.exports = new ContratoService();