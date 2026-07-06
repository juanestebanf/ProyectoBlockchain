const db = require("../config/db");

class SolicitudModel {

    async crear(solicitud) {

        const query = `

            INSERT INTO solicitudes
            (
                inmueble_id,
                cliente_id,
                mensaje
            )

            VALUES ($1,$2,$3)

            RETURNING *;

        `;

        const values = [

            solicitud.inmueble_id,

            solicitud.cliente_id,

            solicitud.mensaje

        ];

        const { rows } = await db.query(query, values);

        return rows[0];

    }

    async buscarExistente(inmuebleId, clienteId) {

        const query = `

            SELECT *

            FROM solicitudes

            WHERE inmueble_id=$1

            AND cliente_id=$2;

        `;

        const { rows } = await db.query(query, [

            inmuebleId,

            clienteId

        ]);

        return rows[0];

    }

    async listarMisSolicitudes(clienteId) {

        const query = `

            SELECT
                s.*,
                i.titulo,
                i.direccion,
                i.precio,
                i.tipo_operacion

            FROM solicitudes s

            INNER JOIN inmuebles i
                ON i.id = s.inmueble_id

            WHERE s.cliente_id=$1

            ORDER BY s.fecha_solicitud DESC;

        `;

        const { rows } = await db.query(query, [clienteId]);

        return rows;

    }

    async listarRecibidas(propietarioId) {

        const query = `

            SELECT

                s.*,

                u.nombre AS cliente,

                u.correo,

                i.titulo,
                i.direccion

            FROM solicitudes s

            INNER JOIN usuarios u

                ON u.id=s.cliente_id

            INNER JOIN inmuebles i

                ON i.id=s.inmueble_id

            WHERE i.propietario_id=$1

            ORDER BY s.fecha_solicitud DESC;

        `;

        const { rows } = await db.query(query, [propietarioId]);

        return rows;

    }

    async buscarPorId(id) {

        const query = `

            SELECT *

            FROM solicitudes

            WHERE id=$1;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }

    async actualizarEstado(id, estado, observacion = null) {

        const query = `

            UPDATE solicitudes

            SET

                estado=$1,

                observacion=$2,

                fecha_respuesta=NOW()

            WHERE id=$3

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            estado,

            observacion,

            id

        ]);

        return rows[0];

    }

    async buscarCompletaPorId(id) {

        const query = `

            SELECT

                s.*,

                i.propietario_id,

                i.precio,

                i.tipo_operacion,

                i.estado AS estado_inmueble,
                
                i.estado_disponibilidad,

                i.titulo

            FROM solicitudes s

            INNER JOIN inmuebles i

                ON i.id = s.inmueble_id

            WHERE s.id = $1;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }
    async rechazarPendientesPorInmueble(inmuebleId, solicitudAceptadaId) {

    const query = `

        UPDATE solicitudes

        SET

            estado = 'RECHAZADA',

            observacion = 'El inmueble ya no se encuentra disponible.',

            fecha_respuesta = NOW()

        WHERE inmueble_id = $1

        AND id <> $2

        AND estado = 'PENDIENTE';

    `;

    await db.query(query, [

        inmuebleId,

        solicitudAceptadaId

    ]);

}

}

module.exports = new SolicitudModel();