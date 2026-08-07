const contract = require("./blockchain/config/provider");

async function probarConexion() {

    try {

        const direccion = await contract.getAddress();

        console.log("Contrato conectado:");

        console.log(direccion);

    } catch (error) {

        console.error(error);

    }

}

probarConexion();