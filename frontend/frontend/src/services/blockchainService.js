import api from "./api";

const blockchainService = {

    listarEventos() {
        return api.get("/blockchain");
    },

    listarPorContrato(idContrato) {
        return api.get(`/blockchain/contrato/${idContrato}`);
    }

};

export default blockchainService;