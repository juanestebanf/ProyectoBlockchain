const express = require("express");

const router = express.Router();

const controller = require("../controllers/usuarioController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);

router.use(roleMiddleware("ADMIN"));

router.get(
    "/",
    controller.listar
);

router.put(
    "/:id",
    controller.actualizar
);

router.delete(
    "/:id",
    controller.eliminar
);

module.exports = router;