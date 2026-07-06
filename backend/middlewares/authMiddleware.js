const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {

            throw new AppError(
                "Token no proporcionado.",
                401
            );

        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = decoded;

        next();

    } catch (error) {

        next(
            new AppError(
                "Token inválido o expirado.",
                401
            )
        );

    }

};

module.exports = authMiddleware;