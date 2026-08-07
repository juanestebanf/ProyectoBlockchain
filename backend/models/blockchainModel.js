const db = require("../config/db");

class BlockchainModel {

    async crear(datos) {

        const query = `
            INSERT INTO blockchain_eventos
            (
                contrato_id,
                evento,
                tx_hash,
                bloque
            )
            VALUES
            ($1,$2,$3,$4)
            RETURNING *;
        `;

        const values = [
            datos.contrato_id,
            datos.evento,
            datos.tx_hash,
            datos.bloque
        ];

        const { rows } = await db.query(
            query,
            values
        );

        return rows[0];

    }


    async listar() {

        const query = `
            SELECT *
            FROM blockchain_eventos
            ORDER BY fecha_evento DESC;
        `;

        const { rows } = await db.query(query);

        return rows;

    }


    async buscarPorContrato(contratoId) {

        const query = `
            SELECT *
            FROM blockchain_eventos
            WHERE contrato_id = $1
            ORDER BY fecha_evento DESC;
        `;

        const { rows } = await db.query(
            query,
            [contratoId]
        );

        return rows;

    }


    async buscarPorId(id) {

        const query = `
            SELECT *
            FROM blockchain_eventos
            WHERE id = $1;
        `;

        const { rows } = await db.query(
            query,
            [id]
        );

        return rows[0];

    }

}

module.exports = new BlockchainModel();