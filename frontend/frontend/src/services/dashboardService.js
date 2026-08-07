import api from "./api";

const dashboardService = {

    obtenerEstadisticas() {
        return api.get("/dashboard/admin");
    }

};

export default dashboardService;