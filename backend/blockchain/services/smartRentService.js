const { obtenerContrato } = require("../config/providerFactory");

class SmartRentService {

    // =====================================
    // CREAR CONTRATO EN BLOCKCHAIN
    // =====================================

    async crearContrato(datos, privateKey) {
        const smartRent = obtenerContrato(privateKey);

        const tx = await smartRent.crearContrato(

            datos.idContrato,

            datos.idInmueble,

            datos.tituloInmueble,

            datos.propietario,

            datos.cliente,

            BigInt(parseInt(datos.monto)),

            datos.tipoOperacion

        );

        const receipt = await tx.wait();

        return {

            txHash: tx.hash,

            bloque: receipt.blockNumber

        };

    }
    // =====================================
    // FIRMA DEL PROPIETARIO
    // =====================================

    async firmarPropietario(idContrato, privateKey) {

        const smartRent = obtenerContrato(privateKey);

        const tx = await smartRent.firmarPropietario(
            idContrato
        );

        const receipt = await tx.wait();

        return {

            txHash: receipt.hash,

            bloque: receipt.blockNumber

        };

    }

   // =====================================
    // FIRMA DEL CLIENTE
    // =====================================

    async firmarCliente(idContrato, privateKey) {

        const smartRent = obtenerContrato(privateKey);

        const tx = await smartRent.firmarCliente(
            idContrato
        );

        const receipt = await tx.wait();

        return {

            txHash: receipt.hash,

            bloque: receipt.blockNumber

        };

    }

}

module.exports = new SmartRentService();