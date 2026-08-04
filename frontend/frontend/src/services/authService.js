import api from "./api";

const authService = {

    login(datos) {
        return api.post("/auth/login", datos);
    },

    register(datos) {
        return api.post("/auth/register", datos);
    }

};

export default authService;