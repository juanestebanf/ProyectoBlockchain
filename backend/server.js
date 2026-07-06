const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const inmuebleRoutes = require("./routes/inmuebleRoutes");
const solicitudRoutes = require("./routes/solicitudRoutes");
const contratoRoutes = require("./routes/contratoRoutes");

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
app.use("/api/inmuebles", inmuebleRoutes);
app.use("/api/solicitudes", solicitudRoutes);
app.use("/api/contratos", contratoRoutes);

// Middleware de errores
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});