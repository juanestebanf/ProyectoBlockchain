const express = require("express");
const router = express.Router();

const { body, param } = require("express-validator");

const PagoController = require("../controllers/pagoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);

// CREAR PAGO

router.post(
    "/",
    roleMiddleware("CLIENTE"),
    [
        body("contrato_id")
            .isInt()
            .withMessage("El contrato es obligatorio."),

        body("monto")
            .isFloat({ gt: 0 })
            .withMessage("El monto debe ser mayor a cero."),

        body("metodo_pago")
            .notEmpty()
            .withMessage("El método de pago es obligatorio.")
    ],
    PagoController.crear
);

// LISTAR TODOS

router.get(
    "/",
    roleMiddleware("ADMIN"),
    PagoController.listar
);

// MIS PAGOS

router.get(
    "/mis-pagos",
    roleMiddleware("CLIENTE", "PROPIETARIO"),
    PagoController.listarPorUsuario
);

// PAGOS DE UN CONTRATO

router.get(
    "/contrato/:contratoId",
    roleMiddleware("ADMIN", "CLIENTE", "PROPIETARIO"),
    [
        param("contratoId")
            .isInt()
            .withMessage("ID de contrato inválido.")
    ],
    PagoController.listarPorContrato
);

// OBTENER POR ID

router.get(
    "/:id",
    roleMiddleware("ADMIN", "CLIENTE", "PROPIETARIO"),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido.")
    ],
    PagoController.obtenerPorId
);

// CONFIRMAR PAGO

router.put(
    "/:id/confirmar",
    roleMiddleware("ADMIN"),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido.")
    ],
    PagoController.confirmar
);

// RECHAZAR PAGO

router.put(
    "/:id/rechazar",
    roleMiddleware("ADMIN"),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido.")
    ],
    PagoController.rechazar
);

// REGISTRAR HASH BLOCKCHAIN

router.put(
    "/:id/tx",
    roleMiddleware("ADMIN"),
    [
        param("id")
            .isInt()
            .withMessage("ID inválido."),

        body("tx_hash")
            .notEmpty()
            .withMessage("Debe proporcionar el tx_hash.")
    ],
    PagoController.actualizarTxHash
);

module.exports = router;
