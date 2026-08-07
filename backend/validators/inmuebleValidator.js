const { body } = require("express-validator");

const inmuebleValidator = [

    body("titulo")
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio."),

    body("direccion")
        .trim()
        .notEmpty()
        .withMessage("La dirección es obligatoria."),

    body("precio")
        .isFloat({ gt: 0 })
        .withMessage("El precio debe ser mayor que cero."),

    body("tipo_operacion")
        .isIn(["ALQUILER", "VENTA"])
        .withMessage("Tipo de operación inválido."),

    body("descripcion")
        .optional()
        .isLength({ max: 1000 })
        .withMessage("La descripción es demasiado larga.")

];

module.exports = {

    inmuebleValidator

};