import api from "./api";

const usuarioService = {

    listar() {
        return api.get("/usuarios");
    },

    actualizar(id, data) {
        return api.put(`/usuarios/${id}`, data);
    },

    eliminar(id) {
        return api.delete(`/usuarios/${id}`);
    }

};

export default usuarioService;