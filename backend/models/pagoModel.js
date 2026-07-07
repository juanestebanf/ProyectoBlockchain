const db = require("../config/db");

class PagoModel {

    // Crear pago

    async crear(pago) {

        const query = `

            INSERT INTO pagos
            (
                contrato_id,
                monto,
                estado,
                metodo_pago,
                referencia
            )

            VALUES
            (
                $1,$2,$3,$4,$5
            )

            RETURNING *;

        `;

        const values = [

            pago.contrato_id,

            pago.monto,

            pago.estado,

            pago.metodo_pago,

            pago.referencia

        ];

        const { rows } = await db.query(query, values);

        return rows[0];

    }

    // Listar todos los pagos

    async listar() {

        const query = `

            SELECT

                p.*,

                c.estado AS estado_contrato,

                i.titulo

            FROM pagos p

            INNER JOIN contratos c

                ON c.id = p.contrato_id

            INNER JOIN inmuebles i

                ON i.id = c.inmueble_id

            ORDER BY p.fecha_pago DESC;

        `;

        const { rows } = await db.query(query);

        return rows;

    }

    // Listar pagos por contrato

    async listarPorContrato(contratoId) {

        const query = `

            SELECT *

            FROM pagos

            WHERE contrato_id = $1

            ORDER BY fecha_pago DESC;

        `;

        const { rows } = await db.query(query, [contratoId]);

        return rows;

    }

    // Listar pagos de un usuario

    async listarPorUsuario(usuarioId) {

        const query = `

            SELECT

                p.*,

                i.titulo,

                c.estado AS estado_contrato

            FROM pagos p

            INNER JOIN contratos c

                ON c.id = p.contrato_id

            INNER JOIN inmuebles i

                ON i.id = c.inmueble_id

            WHERE

                c.propietario_id = $1

                OR

                c.cliente_id = $1

            ORDER BY p.fecha_pago DESC;

        `;

        const { rows } = await db.query(query, [usuarioId]);

        return rows;

    }

    // Buscar pago por ID

    async buscarPorId(id) {

        const query = `

            SELECT *

            FROM pagos

            WHERE id = $1;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }

    // Actualizar estado

    async actualizarEstado(id, estado) {

        const query = `

            UPDATE pagos

            SET

                estado = $1,

                fecha_actualizacion = NOW()

            WHERE id = $2

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            estado,

            id

        ]);

        return rows[0];

    }

    // Guardar hash blockchain

    async actualizarTxHash(id, txHash) {

        const query = `

            UPDATE pagos

            SET

                tx_hash = $1,

                fecha_actualizacion = NOW()

            WHERE id = $2

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            txHash,

            id

        ]);

        return rows[0];

    }

    // Actualizar referencia

    async actualizarReferencia(id, referencia) {

        const query = `

            UPDATE pagos

            SET

                referencia = $1,

                fecha_actualizacion = NOW()

            WHERE id = $2

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            referencia,

            id

        ]);

        return rows[0];

    }

}

module.exports = new PagoModel();