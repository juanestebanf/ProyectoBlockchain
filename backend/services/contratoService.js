const db = require("../config/db");

const contratoModel = require("../models/contratoModel");
const solicitudModel = require("../models/solicitudModel");
const inmuebleModel = require("../models/inmuebleModel");
const blockchainService = require("./blockchainService");

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

                fecha_inicio: null,

                fecha_fin: null,

                estado: "PENDIENTE_FIRMA",

                observaciones:
                    "Contrato generado automáticamente desde la solicitud."

            });

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

                evento: "CONTRATO_CREADO"

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
    // LISTAR TODOS LOS CONTRATOS
    // =========================================
    async listar() {
        return await ContratoModel.listar();
    }

    // =========================================
    // LISTAR POR USUARIO
    // =========================================
    async listarPorUsuario(usuarioId) {
        return await ContratoModel.listarPorUsuario(usuarioId);
    }

    // =========================================
    // OBTENER POR ID
    // =========================================
    async obtenerPorId(id) {

        const contrato = await ContratoModel.buscarPorId(id);

        if (!contrato) {
            throw new AppError("Contrato no encontrado.", 404);
        }

        return contrato;
    }

    // =========================================
    // ACTUALIZAR ESTADO
    // =========================================
    async actualizarEstado(id, estado) {
        return await ContratoModel.actualizarEstado(id, estado);
    }

    // =========================================
    // GUARDAR TX BLOCKCHAIN
    // =========================================
    async actualizarTxHash(id, txHash) {
        return await ContratoModel.actualizarTxHash(id, txHash);
    }

    // =========================================
    // AGREGAR OBSERVACIONES
    // =========================================
    async actualizarObservaciones(id, observaciones) {
        return await ContratoModel.actualizarObservaciones(id, observaciones);
    }

    // =========================================
    // ACTUALIZAR FECHAS
    // =========================================
    async actualizarFechas(id, fechaInicio, fechaFin) {
        return await ContratoModel.actualizarFechas(id, fechaInicio, fechaFin);
    }

    // =========================================
    // ESTADO + OBSERVACIONES (INCUMPLIMIENTO)
    // =========================================
    async registrarIncumplimiento(id, observacion) {
        return await ContratoModel.actualizarEstadoYObservaciones(
            id,
            "INCUMPLIDO",
            observacion
        );
    }
}

module.exports = new ContratoService();