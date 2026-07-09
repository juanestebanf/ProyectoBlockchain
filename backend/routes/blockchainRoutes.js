const express = require("express");

const router = express.Router();


const blockchainController =
    require("../controllers/blockchainController");


const authMiddleware =
    require("../middlewares/authMiddleware");


const roleMiddleware =
    require("../middlewares/roleMiddleware");



router.use(authMiddleware);



// Registrar evento blockchain
router.post(
    "/",
    roleMiddleware("ADMIN"),
    blockchainController.crearEvento
);



// Listar eventos blockchain
router.get(
    "/",
    roleMiddleware("ADMIN"),
    blockchainController.listar
);



// Historial blockchain de un contrato
router.get(
    "/contrato/:contratoId",
    blockchainController.listarPorContrato
);



module.exports = router;