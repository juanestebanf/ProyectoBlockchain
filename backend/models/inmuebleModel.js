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

    async listar() {

        const query = `

            SELECT *

            FROM inmuebles

            ORDER BY fecha_registro DESC;

        `;

        const { rows } = await db.query(query);

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

            SELECT *

            FROM inmuebles

            WHERE id=$1;

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

}

module.exports = new InmuebleModel();