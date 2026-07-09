const solicitudModel = require("../models/solicitudModel");
const inmuebleModel = require("../models/inmuebleModel");
const contratoService = require("./contratoService");

const AppError = require("../utils/AppError");

class SolicitudService {

    async crear(datos) {

        const inmueble = await inmuebleModel.buscarPorId(
            datos.inmueble_id
        );

        if (!inmueble) {

            throw new AppError(
                "El inmueble no existe.",
                404
            );

        }

        if (inmueble.estado_disponibilidad !== "DISPONIBLE") {
            throw new AppError(
                "Este inmueble no está disponible para solicitudes.",
                400
            );
        }


        if (inmueble.propietario_id === datos.cliente_id) {

            throw new AppError(
                "No puedes solicitar tu propio inmueble.",
                400
            );

        }

        const existe = await solicitudModel.buscarExistente(

            datos.inmueble_id,

            datos.cliente_id

        );

        if (existe) {

            throw new AppError(
                "Ya enviaste una solicitud para este inmueble.",
                400
            );

        }

        return await solicitudModel.crear(datos);

    }

    async listarMisSolicitudes(clienteId) {

        return await solicitudModel.listarMisSolicitudes(clienteId);

    }

    async listarRecibidas(propietarioId) {

        return await solicitudModel.listarRecibidas(propietarioId);

    }

    async aceptar(id, usuario, observacion) {

        const solicitud = await solicitudModel.buscarPorId(id);

        if (!solicitud) {

            throw new AppError(
                "Solicitud no encontrada.",
                404
            );

        }

        const inmueble = await inmuebleModel.buscarPorId(
            solicitud.inmueble_id
        );


        if (solicitud.estado !== "PENDIENTE") {

            throw new AppError(
                "La solicitud ya fue procesada.",
                400
            );

        }

       const contrato = await contratoService.crearDesdeSolicitud(

            solicitud.id,

            observacion

        );

        return {

            solicitud: await solicitudModel.buscarPorId(id),
            contrato
        };

    }

    async rechazar(id, usuario, observacion) {

        const solicitud = await solicitudModel.buscarPorId(id);

        if (!solicitud) {

            throw new AppError(
                "Solicitud no encontrada.",
                404
            );

        }

        const inmueble = await inmuebleModel.buscarPorId(
            solicitud.inmueble_id
        );

        if (solicitud.estado !== "PENDIENTE") {

            throw new AppError(
                "La solicitud ya fue procesada.",
                400
            );

        }

        return await solicitudModel.actualizarEstado(

            id,

            "RECHAZADA",

            observacion

        );

    }

}

module.exports = new SolicitudService();