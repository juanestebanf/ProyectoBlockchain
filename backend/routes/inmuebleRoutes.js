const express = require("express");

const router = express.Router();

const inmuebleController = require("../controllers/inmuebleController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const {
    inmuebleValidator
} = require("../validators/inmuebleValidator");

const validate = require("../validators/validate");

router.get(

    "/",

    inmuebleController.listar

);

router.get(

    "/mis-inmuebles",

    authMiddleware,

    inmuebleController.listarMisInmuebles

);

router.get(

    "/:id",

    inmuebleController.buscarPorId

);

router.post(

    "/",

    authMiddleware,

    roleMiddleware("ADMIN", "PROPIETARIO"),

    inmuebleValidator,

    validate,

    inmuebleController.crear

);

router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("ADMIN", "PROPIETARIO"),

    inmuebleValidator,

    validate,

    inmuebleController.actualizar

);

router.delete(

    "/:id",

    authMiddleware,

    roleMiddleware("ADMIN", "PROPIETARIO"),

    inmuebleController.eliminar

);

module.exports = router;