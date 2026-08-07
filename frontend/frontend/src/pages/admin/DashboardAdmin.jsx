import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dashboardService from "../../services/dashboardService";

export default function DashboardAdmin() {
  const [estadisticas, setEstadisticas] = useState({
    usuarios: 0,
    inmuebles_pendientes: 0,
    contratos_activos: 0,
    eventos_blockchain: 0,
    solicitudes_pendientes: 0
  });
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      setCargando(true);
      const { data } = await dashboardService.obtenerEstadisticas();
      setEstadisticas(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No fue posible cargar el dashboard.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        {/* Header con mensaje de bienvenida */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div 
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'rgba(198, 161, 91, 0.12)',
                  color: '#C6A15B',
                  fontSize: '1.8rem'
                }}
              >
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <div>
                <h1 
                  className="fw-bold mb-1"
                  style={{
                    color: '#1A2A3A',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '2.2rem'
                  }}
                >
                  Panel Administrativo
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-person-gear me-1"></i>
                  Bienvenido al panel de administración de SmartRent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta de Bienvenida - No invasiva */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="card border-0"
              style={{
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F9F6F0 0%, #F0EDE7 100%)',
                border: '1px solid rgba(198, 161, 91, 0.1)',
                padding: '20px 28px'
              }}
            >
              <div className="d-flex align-items-center gap-3 flex-wrap">
                <div 
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: 'rgba(198, 161, 91, 0.15)',
                    color: '#C6A15B',
                    fontSize: '1.2rem'
                  }}
                >
                  <i className="bi bi-info-circle"></i>
                </div>
                <div style={{ flex: 1 }}>
                  <p className="mb-0" style={{ color: '#1A2A3A', fontSize: '0.95rem' }}>
                    <span className="fw-semibold">Panel de Administración</span>
                    <span style={{ color: '#5A6A7A' }}>
                      {" "}— Desde aquí podrás gestionar usuarios, validar inmuebles, 
                      revisar solicitudes y monitorear contratos activos.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="row g-4">
          {/* Inmuebles Pendientes */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card border-0 h-100 transition-all"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                padding: '24px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.06)';
              }}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(33, 150, 243, 0.12)',
                  color: '#2196F3',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-building-check"></i>
              </div>
              <h3 
                className="fw-bold mb-1"
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {cargando ? '...' : estadisticas.inmuebles_pendientes}
              </h3>
              <p 
                className="mb-0"
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Inmuebles Pendientes
              </p>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #2196F3 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>

          {/* Contratos Activos */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card border-0 h-100 transition-all"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                padding: '24px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.06)';
              }}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(76, 175, 80, 0.12)',
                  color: '#4CAF50',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-file-earmark-text"></i>
              </div>
              <h3 
                className="fw-bold mb-1"
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {cargando ? '...' : estadisticas.contratos_activos}
              </h3>
              <p 
                className="mb-0"
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Contratos Activos
              </p>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #4CAF50 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>

          {/* Eventos Blockchain */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card border-0 h-100 transition-all"
              style={{
                background: 'linear-gradient(135deg, #1A2A3A 0%, #2C3E50 100%)',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.15)',
                padding: '24px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.15)';
              }}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(198, 161, 91, 0.15)',
                  color: '#C6A15B',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-link-45deg"></i>
              </div>
              <h3 
                className="fw-bold mb-1"
                style={{
                  color: '#F9F6F0',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {cargando ? '...' : estadisticas.eventos_blockchain}
              </h3>
              <p 
                className="mb-0"
                style={{
                  color: 'rgba(249, 246, 240, 0.7)',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Eventos Blockchain
              </p>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #C6A15B 0%, transparent 100%)',
                  opacity: '0.2'
                }}
              />
            </div>
          </div>

          {/* Usuarios Registrados */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card border-0 h-100 transition-all"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                padding: '24px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.06)';
              }}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(198, 161, 91, 0.12)',
                  color: '#C6A15B',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-people-fill"></i>
              </div>
              <h3 
                className="fw-bold mb-1"
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {cargando ? '...' : estadisticas.usuarios}
              </h3>
              <p 
                className="mb-0"
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Usuarios Registrados
              </p>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #C6A15B 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>

          {/* Solicitudes Pendientes */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card border-0 h-100 transition-all"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                padding: '24px 20px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.06)';
              }}
            >
              <div 
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{
                  width: '48px',
                  height: '48px',
                  background: 'rgba(255, 152, 0, 0.12)',
                  color: '#FF9800',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-inbox-fill"></i>
              </div>
              <h3 
                className="fw-bold mb-1"
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {cargando ? '...' : estadisticas.solicitudes_pendientes}
              </h3>
              <p 
                className="mb-0"
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Solicitudes Pendientes
              </p>
              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #FF9800 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
}