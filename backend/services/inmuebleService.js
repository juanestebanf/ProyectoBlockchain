const inmuebleModel = require("../models/inmuebleModel");
const imagenInmuebleModel = require("../models/ImagenInmuebleModel");
const AppError = require("../utils/AppError");
const fs = require("fs");
const path = require("path");

class InmuebleService {

    async crear(datos) {

        const tiposPermitidos = ["ALQUILER", "VENTA"];

        if (!tiposPermitidos.includes(datos.tipo_operacion)) {
            throw new AppError(
                "Tipo de operación inválido.",
                400
            );
        }

        const inmueble = await inmuebleModel.crear(datos);

        if (datos.imagenes && datos.imagenes.length > 0) {

            for (const imagen of datos.imagenes) {

                await imagenInmuebleModel.crear(
                    inmueble.id,
                    imagen.filename
                );

            }

        }

        return inmueble;

    }

    async listar(usuarioId) {

        return await inmuebleModel.listar(usuarioId);

    }

    async listarPorPropietario(propietarioId) {

        return await inmuebleModel.listarPorPropietario(propietarioId);

    }

    async buscarPorId(id) {

        const inmueble = await inmuebleModel.buscarPorId(id);

        if (!inmueble) {

            throw new AppError(
                "El inmueble no existe.",
                404
            );

        }

        inmueble.imagenes =
            await imagenInmuebleModel.listarPorInmueble(
                inmueble.id
            );

        return inmueble;

    }

    async actualizar(id, usuarioId, datos) {

        const inmueble = await inmuebleModel.buscarPorId(id);

        if (!inmueble) {
            throw new AppError(
                "El inmueble no existe.",
                404
            );
        }

        if (inmueble.propietario_id !== usuarioId) {
            throw new AppError(
                "No tienes permisos para modificar este inmueble.",
                403
            );
        }

        if (["ALQUILADO", "VENDIDO"].includes(inmueble.estado)) {
            throw new AppError(
                "No es posible modificar este inmueble.",
                400
            );
        }

        if (

            datos.foto_principal &&
            inmueble.foto_principal &&
            datos.foto_principal !== inmueble.foto_principal

        ) {

            const rutaImagen = path.join(
                __dirname,
                "..",
                "uploads",
                inmueble.foto_principal
            );
            if (fs.existsSync(rutaImagen)) {
                fs.unlinkSync(rutaImagen);
            }
        }
        
        return await inmuebleModel.actualizar(id, datos);
    }

    async eliminar(id, usuarioId) {
        const inmueble = await inmuebleModel.buscarPorId(id);
        if (!inmueble) {
            throw new AppError(
                "El inmueble no existe.",
                404
            );
        }

        if (inmueble.propietario_id !== usuarioId) {
            throw new AppError(
                "No tienes permisos para eliminar este inmueble.",
                403
            );
        }

        if (["ALQUILADO", "VENDIDO"].includes(inmueble.estado)) {
            throw new AppError(
                "Este inmueble no puede eliminarse.",
                400
            );
        }

        if (inmueble.foto) {

            const rutaImagen = path.join(
                __dirname,
                "..",
                "uploads",
                inmueble.foto
            );

            if (fs.existsSync(rutaImagen)) {

                fs.unlinkSync(rutaImagen);

            }

        }

        if (inmueble.foto_principal) {

            const rutaImagen = path.join(
                __dirname,
                "..",
                "uploads",
                inmueble.foto_principal
            );

            if (fs.existsSync(rutaImagen)) {

                fs.unlinkSync(rutaImagen);

            }

        }

        await inmuebleModel.eliminar(id);

    }

    async actualizarEstado(id, estado) {

        const estadosPermitidos = [
            "PENDIENTE",
            "APROBADO",
            "RECHAZADO",
            "RESERVADO",
            "ALQUILADO",
            "VENDIDO"
        ];

        if (!estadosPermitidos.includes(estado)) {
            throw new AppError(
                "Estado inválido.",
                400
            );
        }

        return await inmuebleModel.actualizarEstado(
            id,
            estado
        );

    }
    
    async listarPendientes() {

        return await inmuebleModel.listarPendientes();

    }
    
    async aprobar(id) {

        const inmueble = await inmuebleModel.buscarPorId(id);

        if (!inmueble) {

            throw new AppError(
                "Inmueble no encontrado.",
                404
            );

        }

        await inmuebleModel.actualizarEstado(
            id,
            "APROBADO"
        );

        return await inmuebleModel.actualizarDisponibilidad(
            id,
            "DISPONIBLE"
        );

    }
    
    async rechazar(id) {

        const inmueble = await inmuebleModel.buscarPorId(id);

        if (!inmueble) {

            throw new AppError(
                "Inmueble no encontrado.",
                404
            );

        }

        return await inmuebleModel.actualizarEstado(
            id,
            "RECHAZADO"
        );

    }
    async agregarImagen(id, usuario, nombreArchivo) {

        const inmueble = await inmuebleModel.buscarPorId(id);

        if (!inmueble) {

            throw new AppError(
                "El inmueble no existe.",
                404
            );

        }

        if (

            usuario.rol !== "ADMIN" &&
            Number(inmueble.propietario_id) !== Number(usuario.id)

        ) {

            throw new AppError(
                "No tienes permisos para agregar imágenes.",
                403
            );

        }

        if (!nombreArchivo) {

            throw new AppError(
                "Debe seleccionar una imagen.",
                400
            );

        }

        return await imagenInmuebleModel.crear(

            inmueble.id,

            nombreArchivo

        );

    }

}

module.exports = new InmuebleService();