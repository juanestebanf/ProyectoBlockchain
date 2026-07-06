const db = require("../config/db");

const ContratoModel = require("../models/contratoModel");
const SolicitudModel = require("../models/solicitudModel");
const InmuebleModel = require("../models/inmuebleModel");

const AppError = require("../utils/AppError");

class ContratoService {

    // =========================================
    // CREAR CONTRATO DESDE SOLICITUD
    // =========================================
    async crearDesdeSolicitud(solicitudId) {

        const cliente = await db.connect();

        try {

            await cliente.query("BEGIN");

            // 1. Obtener solicitud completa
            const solicitud = await SolicitudModel.buscarCompletaPorId(solicitudId);

            if (!solicitud) {
                throw new AppError("Solicitud no encontrada.", 404);
            }

            // 2. Validar estado
            if (solicitud.estado !== "ACEPTADA") {
                throw new AppError("La solicitud no está aceptada.", 400);
            }

            // 3. Evitar duplicidad de contrato
            const contratoExistente =
                await ContratoModel.buscarPorSolicitud(solicitudId);

            if (contratoExistente) {
                throw new AppError("Ya existe un contrato para esta solicitud.", 400);
            }

            // 4. Crear contrato
            const contrato = await ContratoModel.crear({
                solicitud_id: solicitud.id,
                inmueble_id: solicitud.inmueble_id,
                propietario_id: solicitud.propietario_id,
                cliente_id: solicitud.cliente_id,
                monto: solicitud.precio,
                fecha_inicio: null,
                fecha_fin: null,
                estado: "PENDIENTE_FIRMA",
                observaciones: null
            });

            // 5. Actualizar disponibilidad del inmueble
            const nuevoEstado =
                solicitud.tipo_operacion === "VENTA"
                    ? "VENDIDO"
                    : "ALQUILADO";

            await InmuebleModel.actualizarDisponibilidad(
                solicitud.inmueble_id,
                nuevoEstado
            );

            // 6. Actualizar solicitud
            await SolicitudModel.actualizarEstado(
                solicitud.id,
                "ACEPTADA",
                "Contrato generado correctamente."
            );

            // 7. Cancelar otras solicitudes
            await SolicitudModel.rechazarPendientesPorInmueble(
                solicitud.inmueble_id,
                solicitud.id
            );

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