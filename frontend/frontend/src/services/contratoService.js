import api from "./api";

const contratoService = {

     listarTodos() {
        return api.get("/contratos");
    },
    listarMisContratos() {
        return api.get("/contratos/mis-contratos");
    },

    firmarPropietario(id) {
        return api.put(`/contratos/${id}/firmar-propietario`);
    },

    firmarCliente(id) {
        return api.put(`/contratos/${id}/firmar-cliente`);
    },

    finalizarContrato(id) {
        return api.put(`/contratos/${id}/finalizar`);
    },

    descargarPDF(id) {
        return api.get(`/contratos/${id}/pdf`, {
            responseType: "blob"
        });
    }
   

};

export default contratoService;