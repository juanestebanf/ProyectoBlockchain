const crypto = require("crypto");

class HashService {


    generarHash(datos) {

        const contenido = JSON.stringify(datos);


        const hash = crypto
            .createHash("sha256")
            .update(contenido)
            .digest("hex");


        return hash;

    }


}

module.exports = new HashService();