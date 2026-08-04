import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../../services/authService";
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();
  
  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('usuario'); // Por defecto 'usuario'

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !correo || !password || !rol) {
      Swal.fire(
        "Campos incompletos",
        "Complete todos los datos.",
        "warning"
      );
      return;
    }

    try {
      const { data } = await authService.register({
        nombre,
        correo,
        password,
        rol: rol.toUpperCase()
      });

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("usuario", JSON.stringify(data.data.usuario));

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: "Tu cuenta ha sido creada correctamente.",
        timer: 1200,
        showConfirmButton: false
      });

      setTimeout(() => {
        if (data.data.usuario.rol === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 1200);

    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
        "No fue posible registrar el usuario.",
        "error"
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '450px', borderRadius: '15px' }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-plus text-primary" style={{ fontSize: '3rem' }}></i>
          <h2 className="fw-bold mt-2">Crea tu Cuenta</h2>
          <p className="text-muted small">Regístrate en SmartRent para comenzar</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Nombre Completo</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person"></i></span>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Ej. Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Correo */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Correo Electrónico</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-envelope"></i></span>
              <input 
                type="email" 
                className="form-control" 
                placeholder="nombre@correo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock"></i></span>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Campo Selección de Rol */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Tipo de Usuario (Rol)</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-briefcase"></i></span>
              <select 
                className="form-select" 
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              >
                <option value="usuario">Usuario (Propietario / Arrendatario)</option>
                <option value="admin">Administrador (Validación / Notaría)</option>
              </select>
            </div>
            <div className="form-text text-muted small mt-1">
              * El Administrador simula las funciones de la Notaría encargada de validar inmuebles.
            </div>
          </div>

          {/* Botón de envío */}
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm mb-3">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-2">
          <span className="text-muted small">¿Ya tienes una cuenta? </span>
          <Link to="/login" className="small fw-bold text-decoration-none">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
}
