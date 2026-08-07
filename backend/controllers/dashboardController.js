const dashboardService = require("../services/dashboardService");
const { success } = require("../utils/response");

class DashboardController {

    async obtenerEstadisticas(req, res, next) {

        try {

            const estadisticas =
                await dashboardService.obtenerEstadisticas();

            return success(
                res,
                "Estadísticas obtenidas correctamente.",
                estadisticas
            );

        } catch (error) {

            next(error);

        }

    }

}

module.exports = new DashboardController();