const db = require("../config/db");

class DashboardModel {

    async obtenerEstadisticas() {

        const query = `

            SELECT

                (SELECT COUNT(*) FROM usuarios) AS usuarios,

                (SELECT COUNT(*) FROM inmuebles WHERE estado = 'PENDIENTE') AS inmuebles_pendientes,

                (SELECT COUNT(*) FROM contratos WHERE estado = 'ACTIVO') AS contratos_activos,

                (SELECT COUNT(*) FROM blockchain_eventos) AS eventos_blockchain,

                (SELECT COUNT(*) FROM solicitudes WHERE estado = 'PENDIENTE') AS solicitudes_pendientes;

        `;

        const { rows } = await db.query(query);

        return rows[0];

    }

}

module.exports = new DashboardModel();