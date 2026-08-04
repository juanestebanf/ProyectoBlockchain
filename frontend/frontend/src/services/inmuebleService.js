import api from "./api";

const inmuebleService = {

    listar() {
        return api.get("/inmuebles");
    },

    obtenerPorId(id) {
        return api.get(`/inmuebles/${id}`);
    },

    listarMisInmuebles() {
        return api.get("/inmuebles/mis-inmuebles");
    },

    crear(formData) {
        return api.post(
            "/inmuebles",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    },

    actualizar(id, formData) {
        return api.put(
            `/inmuebles/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    },

    eliminar(id) {
        return api.delete(`/inmuebles/${id}`);
    },

    listarPendientes() {
        return api.get("/inmuebles/pendientes");
    },

    aprobar(id) {
        return api.put(`/inmuebles/${id}/aprobar`);
    },

    rechazar(id) {
        return api.put(`/inmuebles/${id}/rechazar`);
    }

};

export default inmuebleService;
