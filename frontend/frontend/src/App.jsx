// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import DashboardUsuario from './pages/usuario/DashboardUsuario'; // Importamos el nuevo Dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirección por defecto al Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Rutas Públicas (Autenticación) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Privadas */}
        <Route path="/dashboard-usuario" element={<DashboardUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;