const db = require("../config/db");

class InmuebleModel {

    async crear(inmueble) {

        const query = `

            INSERT INTO inmuebles
            (
                propietario_id,
                titulo,
                direccion,
                descripcion,
                precio,
                tipo_operacion,
                foto_principal
            )

            VALUES($1,$2,$3,$4,$5,$6,$7)

            RETURNING *;

        `;

        const values = [

            inmueble.propietario_id,

            inmueble.titulo,

            inmueble.direccion,

            inmueble.descripcion,

            inmueble.precio,

            inmueble.tipo_operacion,

            inmueble.foto_principal

        ];

        const { rows } = await db.query(query, values);

        return rows[0];

    }

    async listar(usuarioId) {

        const query = `
            SELECT *
            FROM inmuebles
            WHERE propietario_id <> $1
            ORDER BY fecha_registro DESC;
        `;

        const { rows } =
            await db.query(query, [usuarioId]);
        return rows;
    }

    async listarPorPropietario(propietarioId) {

        const query = `

            SELECT *

            FROM inmuebles

            WHERE propietario_id=$1

            ORDER BY fecha_registro DESC;

        `;

        const { rows } = await db.query(query, [propietarioId]);

        return rows;

    }

    async buscarPorId(id) {

        const query = `

            SELECT

                i.*,

                u.nombre AS propietario_nombre,

                u.correo AS propietario_correo,

                u.fecha_registro AS propietario_desde

            FROM inmuebles i

            INNER JOIN usuarios u

                ON u.id = i.propietario_id

            WHERE i.id = $1;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }

    async actualizar(id, inmueble) {

        const query = `

            UPDATE inmuebles

            SET

                titulo=$1,

                direccion=$2,

                descripcion=$3,

                precio=$4,

                tipo_operacion=$5,

                foto_principal=$6,

                fecha_actualizacion=NOW()

            WHERE id=$7

            RETURNING *;

        `;

        const values = [

            inmueble.titulo,

            inmueble.direccion,

            inmueble.descripcion,

            inmueble.precio,

            inmueble.tipo_operacion,

            inmueble.foto_principal,

            id

        ];

        const { rows } = await db.query(query, values);

        return rows[0];

    }

    async eliminar(id) {

        const query = `

            DELETE FROM inmuebles

            WHERE id=$1;

        `;

        await db.query(query, [id]);

    }

    async actualizarEstado(id, estado) {

            const query = `

                UPDATE inmuebles

                SET

                    estado=$1,

                    fecha_actualizacion=NOW()

                WHERE id=$2

                RETURNING *;

            `;

            const { rows } = await db.query(query, [estado, id]);

            return rows[0];

        }
        // Alias para legibilidad en el Service
        async cambiarEstado(id, estado) {

        return await this.actualizarEstado(id, estado);

    }
    async actualizarDisponibilidad(id, estadoDisponibilidad) {

        const query = `

            UPDATE inmuebles

            SET

                estado_disponibilidad = $1,

                fecha_actualizacion = NOW()

            WHERE id = $2

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            estadoDisponibilidad,

            id

        ]);

        return rows[0];

    }
    async listarPendientes() {

    const query = `

        SELECT

            i.*,

            u.nombre AS propietario

        FROM inmuebles i

        INNER JOIN usuarios u

            ON u.id = i.propietario_id

        WHERE i.estado = 'PENDIENTE'

        ORDER BY i.fecha_registro DESC;

    `;

    const { rows } = await db.query(query);

    return rows;

}

}

module.exports = new InmuebleModel();