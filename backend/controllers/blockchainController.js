const blockchainService = require("../services/blockchainService");


class BlockchainController {


    async crearEvento(req, res, next) {

        try {

            const evento =
                await blockchainService.registrarEvento({

                    contrato_id: req.body.contrato_id,

                    evento: req.body.evento

                });


            res.status(201).json({

                success: true,

                message: "Evento blockchain registrado correctamente.",

                data: evento

            });


        } catch (error) {

            next(error);

        }

    }



    async listar(req, res, next) {

        try {

            const eventos =
                await blockchainService.listarEventos();


            res.json({

                success: true,

                data: eventos

            });


        } catch (error) {

            next(error);

        }

    }




    async listarPorContrato(req, res, next) {

        try {


            const eventos =
                await blockchainService.listarPorContrato(
                    req.params.contratoId
                );


            res.json({

                success: true,

                data: eventos

            });


        } catch (error) {

            next(error);

        }

    }


}


module.exports = new BlockchainController();