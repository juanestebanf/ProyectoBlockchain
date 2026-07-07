const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const inmuebleRoutes = require("./routes/inmuebleRoutes");
const solicitudRoutes = require("./routes/solicitudRoutes");
const contratoRoutes = require("./routes/contratoRoutes");
const pagoRoutes = require("./routes/pagoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API funcionando correctamente"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/inmuebles", inmuebleRoutes); // INMUEBLES
app.use("/api/solicitudes", solicitudRoutes); // SOLICITUDES
app.use("/api/contratos", contratoRoutes); //CONTRATOS
app.use("/api/pagos", pagoRoutes); // PAGOS

// Middleware de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});