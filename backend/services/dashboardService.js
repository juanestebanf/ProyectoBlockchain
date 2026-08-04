const dashboardModel = require("../models/dashboardModel");

class DashboardService {

    async obtenerEstadisticas() {

        return await dashboardModel.obtenerEstadisticas();

    }

}

module.exports = new DashboardService();