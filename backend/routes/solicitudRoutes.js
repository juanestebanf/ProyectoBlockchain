const express = require("express");

const router = express.Router();

const controller = require("../controllers/solicitudController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
    crearSolicitudValidator,
    responderSolicitudValidator
} = require("../validators/solicitudValidator");

router.use(authMiddleware);

router.post(
    "/",
    roleMiddleware("USUARIO", "ADMIN"),
    crearSolicitudValidator,
    controller.crear
);

router.get(
    "/mis-solicitudes",
    roleMiddleware("USUARIO", "ADMIN"),
    controller.listarMisSolicitudes
);

router.get(
    "/recibidas",
    roleMiddleware("USUARIO", "ADMIN"),
    controller.listarRecibidas
);

router.put(
    "/:id/aceptar",
    roleMiddleware("ADMIN"),
    responderSolicitudValidator,
    controller.aceptar
);

router.put(
    "/:id/rechazar",
    roleMiddleware("ADMIN"),
    responderSolicitudValidator,
    controller.rechazar
);

module.exports = router;