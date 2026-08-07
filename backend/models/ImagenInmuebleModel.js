const db = require("../config/db");

class ImagenInmuebleModel {

    async crear(inmuebleId, nombreArchivo) {

        const query = `

            INSERT INTO imagenes_inmueble
            (
                inmueble_id,
                nombre_archivo
            )

            VALUES ($1, $2)

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            inmuebleId,
            nombreArchivo

        ]);

        return rows[0];

    }

    async listarPorInmueble(inmuebleId) {

        const query = `

            SELECT *

            FROM imagenes_inmueble

            WHERE inmueble_id = $1

            ORDER BY id;

        `;

        const { rows } = await db.query(query, [inmuebleId]);

        return rows;

    }

    async eliminar(id) {

        const query = `

            DELETE FROM imagenes_inmueble

            WHERE id = $1

            RETURNING *;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }

    async eliminarPorInmueble(inmuebleId) {

        const query = `

            DELETE FROM imagenes_inmueble

            WHERE inmueble_id = $1;

        `;

        await db.query(query, [inmuebleId]);

    }

}

module.exports = new ImagenInmuebleModel();