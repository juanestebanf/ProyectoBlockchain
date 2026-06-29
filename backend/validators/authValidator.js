const { body } = require("express-validator");

const registerValidator = [

    body("nombre")
        .trim()
        .notEmpty()
        .withMessage("El nombre es obligatorio.")
        .isLength({ min: 3 })
        .withMessage("El nombre debe tener al menos 3 caracteres."),

    body("correo")
        .trim()
        .isEmail()
        .withMessage("Correo electrónico inválido."),

    body("password")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe tener mínimo 6 caracteres."),

    body("rol")
        .isIn(["USUARIO", "ADMIN"])
        .withMessage("Rol inválido.")

];

const loginValidator = [

    body("correo")
        .isEmail()
        .withMessage("Correo electrónico inválido."),

    body("password")
        .notEmpty()
        .withMessage("La contraseña es obligatoria.")

];

module.exports = {

    registerValidator,

    loginValidator

};