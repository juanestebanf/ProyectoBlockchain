const db = require("../config/db");

class ContratoModel {

    // Crear contrato

    async crear(contrato) {

        const query = `

            INSERT INTO contratos
            (
                solicitud_id,
                inmueble_id,
                propietario_id,
                cliente_id,
                monto,
                fecha_inicio,
                fecha_fin,
                estado,
                observaciones
            )

            VALUES
            (
                $1,$2,$3,$4,$5,$6,$7,$8,$9
            )

            RETURNING *;

        `;

        const values = [

            contrato.solicitud_id,

            contrato.inmueble_id,

            contrato.propietario_id,

            contrato.cliente_id,

            contrato.monto,

            contrato.fecha_inicio,

            contrato.fecha_fin,

            contrato.estado,

            contrato.observaciones

        ];

        const { rows } = await db.query(query, values);

        return rows[0];

    }

    // Listar todos los contratos
    // (Administrador)

    async listar() {

        const query = `

            SELECT

                c.*,

                i.titulo,

                propietario.nombre AS propietario,

                cliente.nombre AS cliente

            FROM contratos c

            INNER JOIN inmuebles i

                ON i.id = c.inmueble_id

            INNER JOIN usuarios propietario

                ON propietario.id = c.propietario_id

            INNER JOIN usuarios cliente

                ON cliente.id = c.cliente_id

            ORDER BY c.fecha_creacion DESC;

        `;

        const { rows } = await db.query(query);

        return rows;

    }
    // Listar contratos de un usuario
    // (Propietario o Cliente)

    async listarPorUsuario(usuarioId) {

        const query = `

            SELECT

                c.*,

                i.titulo,

                i.direccion,

                propietario.nombre AS propietario,

                cliente.nombre AS cliente

            FROM contratos c

            INNER JOIN inmuebles i

                ON i.id = c.inmueble_id

            INNER JOIN usuarios propietario

                ON propietario.id = c.propietario_id

            INNER JOIN usuarios cliente

                ON cliente.id = c.cliente_id

            WHERE

                c.propietario_id = $1

                OR

                c.cliente_id = $1

            ORDER BY c.fecha_creacion DESC;

        `;

        const { rows } = await db.query(query, [usuarioId]);

        return rows;

    }

    // Buscar contrato por ID

    async buscarPorId(id) {

        const query = `

            SELECT

                c.*,

                i.titulo,

                i.direccion,

                propietario.nombre AS propietario,

                cliente.nombre AS cliente

            FROM contratos c

            INNER JOIN inmuebles i

                ON i.id = c.inmueble_id

            INNER JOIN usuarios propietario

                ON propietario.id = c.propietario_id

            INNER JOIN usuarios cliente

                ON cliente.id = c.cliente_id

            WHERE c.id = $1;

        `;

        const { rows } = await db.query(query, [id]);

        return rows[0];

    }
    // Actualizar estado

    async actualizarEstado(id, estado) {

        const query = `

            UPDATE contratos

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
    // Guardar TX Hash Blockchain

    async actualizarTxHash(id, txHash) {

        const query = `

            UPDATE contratos

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

    // Actualizar observaciones
    async actualizarObservaciones(id, observaciones) {

        const query = `

            UPDATE contratos

            SET

                observaciones = $1,

                fecha_actualizacion = NOW()

            WHERE id = $2

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            observaciones,

            id

        ]);

        return rows[0];

    }
    async buscarPorSolicitud(solicitudId) {

        const query = `

            SELECT *

            FROM contratos

            WHERE solicitud_id = $1;

        `;

        const { rows } = await db.query(query, [solicitudId]);

        return rows[0];

    }
    async actualizarFechas(id, fechaInicio, fechaFin) {

        const query = `

            UPDATE contratos

            SET

                fecha_inicio = $1,

                fecha_fin = $2,

                fecha_actualizacion = NOW()

            WHERE id = $3

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            fechaInicio,

            fechaFin,

            id

        ]);

        return rows[0];

    }
    async actualizarEstadoYObservaciones(

        id,

        estado,

        observaciones

    ) {

        const query = `

            UPDATE contratos

            SET

                estado = $1,

                observaciones = $2,

                fecha_actualizacion = NOW()

            WHERE id = $3

            RETURNING *;

        `;

        const { rows } = await db.query(query, [

            estado,

            observaciones,

            id

        ]);

        return rows[0];

    }
    async actualizarBlockchain(id, txHash) {

    const query = `

        UPDATE contratos

        SET

            tx_hash = $1,

            fecha_actualizacion = CURRENT_TIMESTAMP

        WHERE id = $2

        RETURNING *;

    `;

    const { rows } = await db.query(

        query,

        [

            txHash,

            id

        ]

    );

    return rows[0];

}
async marcarFirmaPropietario(id) {

    const query = `
        UPDATE contratos
        SET
            firma_propietario = TRUE,
            fecha_actualizacion = NOW()
        WHERE id = $1
        RETURNING *;
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];
}
async marcarFirmaCliente(id) {

    const query = `
        UPDATE contratos
        SET
            firma_cliente = TRUE,
            fecha_actualizacion = NOW()
        WHERE id = $1
        RETURNING *;
    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];
}
async marcarFirmaPropietario(id) {

    const query = `

        UPDATE contratos

        SET

            firma_propietario = TRUE,

            fecha_actualizacion = NOW()

        WHERE id = $1

        RETURNING *;

    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

}

async marcarFirmaCliente(id) {

    const query = `

        UPDATE contratos

        SET

            firma_cliente = TRUE,

            fecha_actualizacion = NOW()

        WHERE id = $1

        RETURNING *;

    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

}

async ambasFirmas(id) {

    const query = `

        SELECT

            firma_propietario,

            firma_cliente

        FROM contratos

        WHERE id = $1;

    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

}
async finalizarContrato(id) {

    const query = `

        UPDATE contratos

        SET

            estado = 'FINALIZADO',

            fecha_fin = CURRENT_DATE,

            fecha_actualizacion = NOW()

        WHERE id = $1

        RETURNING *;

    `;

    const { rows } = await db.query(query, [id]);

    return rows[0];

}

}

module.exports = new ContratoModel();