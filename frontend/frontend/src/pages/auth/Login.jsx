import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../../services/authService";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      Swal.fire(
        "Campos vacíos",
        "Complete todos los campos.",
        "warning"
      );
      return;
    }

    try {
      setCargando(true);
      const { data } = await authService.login({
        correo,
        password
      });

      login(
        data.data.usuario,
        data.data.token
      );

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
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
        "Correo o contraseña incorrectos.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      {/* Columna Izquierda - 50% con imagen de fondo */}
      <div 
        className="d-none d-lg-flex flex-column justify-content-center align-items-center position-relative"
        style={{
          width: '50%',
          height: '100vh',
          flexShrink: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '40px'
        }}
      >
        {/* Overlay oscuro */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: 'linear-gradient(135deg, rgba(26, 42, 58, 0.88) 0%, rgba(26, 42, 58, 0.65) 100%)'
          }}
        />
        
        {/* Contenido centrado verticalmente */}
        <div className="position-relative z-1 text-center" style={{ maxWidth: '480px' }}>
          {/* Línea decorativa */}
          <div 
            className="mx-auto mb-4" 
            style={{
              width: '60px',
              height: '3px',
              background: '#C6A15B',
              borderRadius: '2px'
            }}
          />
          
          {/* Logo */}
          <div 
            className="d-inline-flex align-items-center justify-content-center rounded-3 mb-4"
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(198, 161, 91, 0.15)',
              border: '1px solid rgba(198, 161, 91, 0.2)',
              fontSize: '2.8rem',
              color: '#C6A15B'
            }}
          >
            <i className="bi bi-house-lock-fill"></i>
          </div>
          
          <h1 
            className="display-4 fw-bold mb-3"
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#F9F6F0',
              letterSpacing: '-0.5px'
            }}
          >
            SmartRent
          </h1>
          
          <p 
            className="lead mb-4"
            style={{
              color: 'rgba(249, 246, 240, 0.85)',
              fontWeight: '300',
              fontSize: '1.05rem',
              lineHeight: '1.7'
            }}
          >
            Transformando el mercado inmobiliario con tecnología blockchain. 
            Transparencia, seguridad y eficiencia en cada transacción.
          </p>

          {/* Badge */}
          <div 
            className="d-inline-block px-4 py-2 rounded-pill mb-4"
            style={{
              background: 'rgba(198, 161, 91, 0.15)',
              border: '1px solid rgba(198, 161, 91, 0.25)',
              color: '#C6A15B',
              fontSize: '0.85rem',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}
          >
            ✦ Gestión Inteligente de Propiedades
          </div>

          {/* Características */}
          <div className="row g-3">
            <div className="col-4">
              <div 
                className="p-2 rounded-3"
                style={{
                  background: 'rgba(249, 246, 240, 0.06)',
                  border: '1px solid rgba(249, 246, 240, 0.06)'
                }}
              >
                <i className="bi bi-shield-check fs-4" style={{ color: '#C6A15B' }}></i>
                <p className="small mb-0 mt-1" style={{ color: 'rgba(249, 246, 240, 0.7)' }}>
                  Seguro
                </p>
              </div>
            </div>
            <div className="col-4">
              <div 
                className="p-2 rounded-3"
                style={{
                  background: 'rgba(249, 246, 240, 0.06)',
                  border: '1px solid rgba(249, 246, 240, 0.06)'
                }}
              >
                <i className="bi bi-clock-history fs-4" style={{ color: '#C6A15B' }}></i>
                <p className="small mb-0 mt-1" style={{ color: 'rgba(249, 246, 240, 0.7)' }}>
                  Rápido
                </p>
              </div>
            </div>
            <div className="col-4">
              <div 
                className="p-2 rounded-3"
                style={{
                  background: 'rgba(249, 246, 240, 0.06)',
                  border: '1px solid rgba(249, 246, 240, 0.06)'
                }}
              >
                <i className="bi bi-graph-up fs-4" style={{ color: '#C6A15B' }}></i>
                <p className="small mb-0 mt-1" style={{ color: 'rgba(249, 246, 240, 0.7)' }}>
                  Eficiente
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer izquierdo */}
        <div className="position-absolute bottom-0 start-0 w-100 text-center pb-3" style={{ zIndex: 1 }}>
          <p style={{ color: 'rgba(249, 246, 240, 0.3)', fontSize: '0.7rem', letterSpacing: '0.5px', margin: 0 }}>
            © 2026 SmartRent. Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Columna Derecha - 50% con formulario sin card */}
      <div 
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          width: '50%',
          height: '100vh',
          flexShrink: 0,
          background: '#F9F6F0',
          padding: '40px'
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Logo móvil */}
          <div className="d-lg-none text-center mb-4">
            <div 
              className="d-inline-flex align-items-center justify-content-center rounded-3 mb-2"
              style={{
                width: '56px',
                height: '56px',
                background: 'rgba(198, 161, 91, 0.12)',
                color: '#C6A15B',
                fontSize: '1.8rem'
              }}
            >
              <i className="bi bi-house-lock-fill"></i>
            </div>
            <h3 
              className="fw-bold mb-0"
              style={{
                color: '#1A2A3A',
                fontFamily: 'Playfair Display, serif'
              }}
            >
              SmartRent
            </h3>
          </div>

          {/* Título del formulario */}
          <div className="mb-4">
            <h2 
              className="fw-bold mb-1"
              style={{
                color: '#1A2A3A',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.8rem'
              }}
            >
              Iniciar Sesión
            </h2>
            <p style={{ color: '#5A6A7A', fontSize: '0.95rem', margin: 0 }}>
              Accede a tu cuenta SmartRent
            </p>
          </div>

          <form onSubmit={handleLogin}>
            {/* Campo Correo */}
            <div className="mb-3">
              <label 
                className="form-label fw-semibold"
                style={{
                  color: '#1A2A3A',
                  fontSize: '0.9rem'
                }}
              >
                Correo Electrónico
              </label>
              <div 
                className="d-flex align-items-center"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E5E8EC',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C6A15B';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E8EC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span 
                  style={{
                    padding: '0 12px',
                    color: '#5A6A7A',
                    fontSize: '1.1rem'
                  }}
                >
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control border-0"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  style={{
                    background: 'transparent',
                    padding: '10px 12px',
                    fontSize: '0.95rem',
                    color: '#1A2A3A',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="mb-4">
              <label 
                className="form-label fw-semibold"
                style={{
                  color: '#1A2A3A',
                  fontSize: '0.9rem'
                }}
              >
                Contraseña
              </label>
              <div 
                className="d-flex align-items-center"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #E5E8EC',
                  transition: 'all 0.2s ease',
                  overflow: 'hidden'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C6A15B';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E5E8EC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span 
                  style={{
                    padding: '0 12px',
                    color: '#5A6A7A',
                    fontSize: '1.1rem'
                  }}
                >
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control border-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    background: 'transparent',
                    padding: '10px 12px',
                    fontSize: '0.95rem',
                    color: '#1A2A3A',
                    outline: 'none',
                    boxShadow: 'none'
                  }}
                />
              </div>
            </div>

            {/* Botón Ingresar */}
            <button
              className="btn w-100 fw-bold"
              type="submit"
              disabled={cargando}
              style={{
                background: '#1A2A3A',
                color: '#F9F6F0',
                border: 'none',
                padding: '12px',
                borderRadius: '10px',
                fontSize: '1rem',
                transition: 'all 0.2s ease',
                opacity: cargando ? 0.7 : 1,
                cursor: cargando ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!cargando) {
                  e.currentTarget.style.background = '#C6A15B';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(198, 161, 91, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!cargando) {
                  e.currentTarget.style.background = '#1A2A3A';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {cargando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Ingresando...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Ingresar
                </>
              )}
            </button>
          </form>

          {/* Link a Registro */}
          <div className="text-center mt-4">
            <span style={{ color: '#5A6A7A', fontSize: '0.95rem' }}>
              ¿No tienes cuenta?
            </span>
            <Link
              className="ms-2 fw-bold text-decoration-none"
              to="/register"
              style={{
                color: '#C6A15B',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1A2A3A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#C6A15B';
              }}
            >
              Registrarse
            </Link>
          </div>

          {/* Línea decorativa */}
          <div 
            className="mt-4 text-center"
            style={{
              fontSize: '0.75rem',
              color: '#B0B8C0',
              letterSpacing: '0.5px'
            }}
          >
            <i className="bi bi-shield-check me-1"></i>
            Plataforma segura con Blockchain
          </div>
        </div>
      </div>
    </div>
  );
}