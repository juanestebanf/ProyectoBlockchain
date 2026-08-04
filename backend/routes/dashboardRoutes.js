const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.get(

    "/admin",

    authMiddleware,

    roleMiddleware("ADMIN"),

    dashboardController.obtenerEstadisticas

);

module.exports = router;