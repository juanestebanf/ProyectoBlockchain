const { error } = require("../utils/response");

const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    return error(
        res,
        err.message || "Error interno del servidor",
        err.status || 500
    );

};

module.exports = errorMiddleware;