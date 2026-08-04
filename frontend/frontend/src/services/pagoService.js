import api from "./api";

const pagoService = {

    listarMisPagos() {
        return api.get("/pagos/mis-pagos");
    },

    crearPago(data) {
        return api.post("/pagos", data);
    },

    registrarBlockchain(id) {
        return api.put(`/pagos/${id}/blockchain`);
    },

    obtenerPorId(id) {
        return api.get(`/pagos/${id}`);
    }

};

export default pagoService;