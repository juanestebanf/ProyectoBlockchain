const { body } = require("express-validator");

const crearSolicitudValidator = [

    body("inmueble_id")
        .notEmpty()
        .withMessage("El inmueble es obligatorio.")
        .isInt({ min: 1 })
        .withMessage("El ID del inmueble debe ser válido."),

    body("mensaje")
        .optional()
        .isLength({ max: 500 })
        .withMessage("El mensaje no puede superar los 500 caracteres.")

];

const responderSolicitudValidator = [

    body("observacion")
        .optional()
        .isLength({ max: 500 })
        .withMessage("La observación no puede superar los 500 caracteres.")

];

module.exports = {
    crearSolicitudValidator,
    responderSolicitudValidator
};