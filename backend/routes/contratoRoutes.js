const express = require("express");
const router = express.Router();

const ContratoController = require("../controllers/contratoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const { body, param } = require("express-validator");


// ================================
// CREAR CONTRATO
// ================================
router.post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        body("solicitudId")
            .isInt()
            .withMessage("La solicitud es obligatoria y debe ser un ID válido")
    ],
    ContratoController.crear
);


// ================================
// LISTAR TODOS LOS CONTRATOS
// ================================
router.get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    ContratoController.listar
);


// ================================
// LISTAR MIS CONTRATOS
// ================================
router.get(
    "/mis-contratos",
    authMiddleware,
    roleMiddleware("USUARIO", "ADMIN"),
    ContratoController.listarPorUsuario
);


// ================================
// OBTENER CONTRATO POR ID
// ================================
router.get(
    "/:id",
    authMiddleware,
    roleMiddleware(
        "ADMIN",
        "USUARIO"
    ),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido")
    ],
    ContratoController.obtenerPorId
);


// ================================
// ACTUALIZAR ESTADO
// ================================
router.put(
    "/:id/estado",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        param("id").isInt(),
        body("estado").notEmpty()
    ],
    ContratoController.actualizarEstado
);
router.put(
    "/:id/firmar-propietario",
    authMiddleware,
    roleMiddleware("USUARIO", "ADMIN"),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido")
    ],
    ContratoController.firmarPropietario
);
// ================================
// FIRMA DEL CLIENTE
// ================================

router.put(

    "/:id/firmar-cliente",

    authMiddleware,

    roleMiddleware("USUARIO", "ADMIN"),

    [

        param("id")
            .isInt()
            .withMessage("ID inválido")

    ],

    ContratoController.firmarCliente

);

// ================================
// FINALIZAR CONTRATO
// ================================

router.put(

    "/:id/finalizar",

    authMiddleware,

    roleMiddleware("USUARIO", "ADMIN"),

    [

        param("id")
            .isInt()
            .withMessage("ID inválido")

    ],

    ContratoController.finalizarContrato

);

// ================================
// TX HASH BLOCKCHAIN
// ================================
router.put(
    "/:id/tx",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        param("id").isInt(),
        body("txHash").notEmpty()
    ],
    ContratoController.actualizarTxHash
);


// ================================
// OBSERVACIONES
// ================================a
router.put(
    "/:id/observaciones",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        param("id").isInt(),
        body("observaciones").notEmpty()
    ],
    ContratoController.actualizarObservaciones
);


// ================================
// FECHAS DEL CONTRATO
// ================================
router.put(
    "/:id/fechas",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        param("id").isInt(),
        body("fechaInicio").notEmpty(),
        body("fechaFin").notEmpty()
    ],
    ContratoController.actualizarFechas
);


// ================================
// INCUMPLIMIENTO
// ================================
router.put(
    "/:id/incumplimiento",
    authMiddleware,
    roleMiddleware("ADMIN"),
    [
        param("id").isInt(),
        body("observacion").notEmpty()
    ],
    ContratoController.incumplir
);

module.exports = router;