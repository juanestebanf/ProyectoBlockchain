const blockchainModel = require("../models/blockchainModel");
const contratoModel = require("../models/contratoModel");
const hashService = require("./hashService");

const AppError = require("../utils/AppError");


class BlockchainService {


    async registrarEvento(datos) {

        const contrato = await contratoModel.buscarPorId(
            datos.contrato_id
        );

        if (!contrato) {

            throw new AppError(
                "El contrato no existe.",
                404
            );

        }

        const evento = await blockchainModel.crear({

            contrato_id: contrato.id,

            evento: datos.evento,

            tx_hash: datos.tx_hash,

            bloque: datos.bloque

        });

        return evento;

}
    async listarEventos() {

        return await blockchainModel.listar();

    }



    async listarPorContrato(contratoId) {

        const contrato =
            await contratoModel.buscarPorId(
                contratoId
            );


        if (!contrato) {

            throw new AppError(
                "El contrato no existe.",
                404
            );

        }


        return await blockchainModel.buscarPorContrato(
            contratoId
        );

    }



}


module.exports = new BlockchainService();