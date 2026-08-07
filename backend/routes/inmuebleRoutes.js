const express = require("express");

const router = express.Router();

const inmuebleController = require("../controllers/inmuebleController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
    inmuebleValidator
} = require("../validators/inmuebleValidator");

const validate = require("../validators/validate");

router.get(
    "/",
    authMiddleware,
    inmuebleController.listar
);

router.get(
    "/mis-inmuebles",
    authMiddleware,
    inmuebleController.listarMisInmuebles
);
router.get(
    "/pendientes",
    authMiddleware,
    roleMiddleware("ADMIN"),
    inmuebleController.listarPendientes
);

router.put(
    "/:id/aprobar",
    authMiddleware,
    roleMiddleware("ADMIN"),
    inmuebleController.aprobar
);

router.put(
    "/:id/rechazar",
    authMiddleware,
    roleMiddleware("ADMIN"),
    inmuebleController.rechazar
);

router.get(
    "/:id",
    inmuebleController.buscarPorId
);

router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN", "USUARIO"),
    upload.array("imagenes", 10),
    inmuebleValidator,
    validate,
    inmuebleController.crear
);
router.post(
    "/:id/imagenes",
    authMiddleware,
    roleMiddleware("ADMIN", "USUARIO"),
    upload.single("foto"),
    inmuebleController.agregarImagen
);

router.put(

    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "USUARIO"),
    upload.array("imagenes", 10),
    inmuebleValidator,
    validate,
    inmuebleController.actualizar
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("ADMIN", "USUARIO"),
    inmuebleController.eliminar
);

module.exports = router;