const express = require("express");

const router = express.Router();

const controller = require("../controllers/solicitudController");

const authMiddleware = require("../middlewares/authMiddleware");

const {
    crearSolicitudValidator,
    responderSolicitudValidator
} = require("../validators/solicitudValidator");

router.use(authMiddleware);

router.post(
    "/",
    crearSolicitudValidator,
    controller.crear
);

router.get(
    "/mis-solicitudes",
    controller.listarMisSolicitudes
);

router.get(
    "/recibidas",
    controller.listarRecibidas
);

router.put(
    "/:id/aceptar",
    responderSolicitudValidator,
    controller.aceptar
);

router.put(
    "/:id/rechazar",
    responderSolicitudValidator,
    controller.rechazar
);
module.exports = router;