const inmuebleService = require("../services/inmuebleService");
const { success } = require("../utils/response");

class InmuebleController {

    async crear(req, res, next) {

        try {

            const datos = {
                ...req.body,
                propietario_id: req.usuario.id
            };

            const inmueble = await inmuebleService.crear(datos);

            return success(
                res,
                "Inmueble registrado correctamente.",
                inmueble,
                201
            );

        } catch (error) {

            next(error);

        }

    }

    async listar(req, res, next) {

        try {

            const inmuebles = await inmuebleService.listar();

            return success(
                res,
                "Listado obtenido correctamente.",
                inmuebles
            );

        } catch (error) {

            next(error);

        }

    }

    async listarMisInmuebles(req, res, next) {

        try {

            const inmuebles = await inmuebleService.listarPorPropietario(
                req.usuario.id
            );

            return success(
                res,
                "Mis inmuebles.",
                inmuebles
            );

        } catch (error) {

            next(error);

        }

    }

    async buscarPorId(req, res, next) {

        try {

            const inmueble = await inmuebleService.buscarPorId(
                req.params.id
            );

            return success(
                res,
                "Detalle del inmueble.",
                inmueble
            );

        } catch (error) {

            next(error);

        }

    }

    async actualizar(req, res, next) {

        try {

            const inmueble = await inmuebleService.actualizar(

                req.params.id,

                req.usuario.id,

                req.body

            );

            return success(
                res,
                "Inmueble actualizado correctamente.",
                inmueble
            );

        } catch (error) {

            next(error);

        }

    }

    async eliminar(req, res, next) {

        try {

            await inmuebleService.eliminar(

                req.params.id,

                req.usuario.id

            );

            return success(
                res,
                "Inmueble eliminado correctamente."
            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new InmuebleController();