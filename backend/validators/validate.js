const { validationResult } = require("express-validator");
const AppError = require("../utils/AppError");

const validate = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return next(
            new AppError(
                errores.array()[0].msg,
                400
            )
        );

    }

    next();

};

module.exports = validate;