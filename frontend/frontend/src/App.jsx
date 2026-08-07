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

import AdminSolicitudes from "./pages/admin/AdminSolicitudes";
import ValidarInmuebles from "./pages/admin/ValidarInmuebles";
import ContratosActivos from "./pages/admin/ContratosActivos";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AuditoriaBlockchain from "./pages/admin/AuditoriaBlockchain";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Rutas libres */}
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Rutas protegidas de usuario */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <DashboardUsuario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-inmuebles"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <MisInmuebles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/explorar"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <ExplorarInmuebles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle-inmueble/:id"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <DetalleInmueble />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-contratos"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <MisContratos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-pagos"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <MisPagos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blockchain"
          element={
            <ProtectedRoute roles={["USUARIO"]}>
              <HistorialBlockchain />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas de administrador */}
        <Route
          path="/admin/solicitudes"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminSolicitudes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/validar-inmuebles"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ValidarInmuebles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/contratos"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <ContratosActivos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AdminUsuarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/auditoria"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <AuditoriaBlockchain />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
