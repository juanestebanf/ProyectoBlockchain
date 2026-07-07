const express = require("express");
const router = express.Router();

const { body, param } = require("express-validator");

const PagoController = require("../controllers/pagoController");
const authMiddleware = require("../middlewares/authMiddleware");

// =====================================
// CREAR PAGO
// =====================================

router.post(
    "/",
    authMiddleware,
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

// =====================================
// LISTAR TODOS
// =====================================

router.get(
    "/",
    authMiddleware,
    PagoController.listar
);

// =====================================
// LISTAR MIS PAGOS
// =====================================

router.get(
    "/mis-pagos",
    authMiddleware,
    PagoController.listarPorUsuario
);

// =====================================
// LISTAR POR CONTRATO
// =====================================

router.get(
    "/contrato/:contratoId",
    authMiddleware,
    [
        param("contratoId")
            .isInt()
            .withMessage("ID de contrato inválido.")
    ],
    PagoController.listarPorContrato
);

// =====================================
// OBTENER POR ID
// =====================================

router.get(
    "/:id",
    authMiddleware,
    [
        param("id")
            .isInt()
            .withMessage("ID inválido.")
    ],
    PagoController.obtenerPorId
);

// =====================================
// ACTUALIZAR ESTADO
// =====================================

router.put(
    "/:id/estado",
    authMiddleware,
    [
        param("id").isInt(),

        body("estado")
            .isIn([
                "PENDIENTE",
                "PAGADO",
                "VENCIDO",
                "ANULADO"
            ])
            .withMessage("Estado no válido.")
    ],
    PagoController.actualizarEstado
);

// =====================================
// ACTUALIZAR TX HASH
// =====================================

router.put(
    "/:id/tx",
    authMiddleware,
    [
        param("id").isInt(),

        body("txHash")
            .notEmpty()
            .withMessage("Debe proporcionar el hash.")
    ],
    PagoController.actualizarTxHash
);

// =====================================
// ACTUALIZAR REFERENCIA
// =====================================

router.put(
    "/:id/referencia",
    authMiddleware,
    [
        param("id").isInt(),

        body("referencia")
            .notEmpty()
            .withMessage("La referencia es obligatoria.")
    ],
    PagoController.actualizarReferencia
);

module.exports = router;