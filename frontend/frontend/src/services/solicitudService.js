import api from "./api";

const solicitudService = {

    crearSolicitud(data) {
        return api.post("/solicitudes", data);
    },

    listarMisSolicitudes() {
        return api.get("/solicitudes/mis-solicitudes");
    },

    listarRecibidas() {
        return api.get("/solicitudes/recibidas");
    },

    aceptarSolicitud(id, observacion = "") {
        return api.put(`/solicitudes/${id}/aceptar`, {
            observacion
        });
    },

    rechazarSolicitud(id, observacion = "") {
        return api.put(`/solicitudes/${id}/rechazar`, {
            observacion
        });
    }

};

export default solicitudService;