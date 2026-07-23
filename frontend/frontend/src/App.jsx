import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import DashboardUsuario from "./pages/usuario/DashboardUsuario";
import MisInmuebles from "./pages/usuario/MisInmuebles";
import ExplorarInmuebles from "./pages/usuario/ExplorarInmuebles";

import DetalleInmueble from "./pages/usuario/DetalleInmueble";
import MisContratos from "./pages/usuario/MisContratos";
import MisPagos from "./pages/usuario/MisPagos";
import HistorialBlockchain from "./pages/usuario/HistorialBlockchain";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<DashboardUsuario />}
        />

        <Route
          path="/mis-inmuebles"
          element={<MisInmuebles />}
        />

        <Route
          path="/explorar"
          element={<ExplorarInmuebles />}
        />

        <Route
          path="/detalle-inmueble"
          element={<DetalleInmueble />}
        />

        <Route
          path="/mis-contratos"
          element={<MisContratos />}
        />

        <Route
          path="/mis-pagos"
          element={<MisPagos />}
        />

        <Route
          path="/blockchain"
          element={<HistorialBlockchain />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;