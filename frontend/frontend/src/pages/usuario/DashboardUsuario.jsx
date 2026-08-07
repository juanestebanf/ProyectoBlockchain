import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import inmuebleService from "../../services/inmuebleService";
import contratoService from "../../services/contratoService";
import pagoService from "../../services/pagoService";
import api from "../../services/api";

export default function DashboardUsuario() {
  const [estadisticas, setEstadisticas] = useState({
    inmuebles: 0,
    contratos: 0,
    pagos: 0,
    eventos: 0
  });

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const [
        inmueblesRes,
        contratosRes,
        pagosRes
      ] = await Promise.all([
        inmuebleService.listarMisInmuebles(),
        contratoService.listarMisContratos(),
        pagoService.listarMisPagos()
      ]);

      const inmuebles = inmueblesRes.data.data;
      const contratos = contratosRes.data.data;
      const pagos = pagosRes.data.data;

      const activos = contratos.filter(
        c => c.estado === "ACTIVO"
      );

      let totalEventos = 0;
      for (const contrato of contratos) {
        try {
          const { data } = await api.get(
            `/blockchain/contrato/${contrato.id}`
          );
          totalEventos += data.data.length;
        } catch (e) {
          console.error(e);
        }
      }

      setEstadisticas({
        inmuebles: inmuebles.length,
        contratos: activos.length,
        pagos: pagos.length,
        eventos: totalEventos
      });

    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No fue posible cargar el dashboard.",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Hero Section - Quiénes somos (Reducido) */}
      <div 
        className="position-relative overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #1A2A3A 0%, #2C3E50 100%)',
          padding: '40px 0 30px 0',
          marginBottom: '32px'
        }}
      >
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              {/* Línea decorativa */}
              <div 
                className="mx-auto mb-3" 
                style={{
                  width: '50px',
                  height: '3px',
                  background: '#C6A15B',
                  borderRadius: '2px'
                }}
              />
              
              <h1 
                className="display-5 fw-bold mb-2" 
                style={{
                  color: '#F9F6F0',
                  fontFamily: 'Playfair Display, serif',
                  letterSpacing: '-0.5px',
                  fontSize: '2.5rem'
                }}
              >
                SmartRent
              </h1>
              
              <p 
                className="lead mb-0" 
                style={{
                  color: 'rgba(249, 246, 240, 0.85)',
                  fontWeight: '300',
                  fontSize: '1rem',
                  maxWidth: '800px',
                  margin: '0 auto',
                  lineHeight: '1.6'
                }}
              >
                Transformando el mercado inmobiliario con tecnología blockchain. 
                Transparencia, seguridad y eficiencia en cada transacción.
              </p>

              {/* Badge decorativo */}
              <div 
                className="mt-3 d-inline-block px-4 py-1.5 rounded-pill"
                style={{
                  background: 'rgba(198, 161, 91, 0.15)',
                  border: '1px solid rgba(198, 161, 91, 0.3)',
                  color: '#C6A15B',
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  letterSpacing: '0.5px'
                }}
              >
                ✦ Gestión Inteligente de Propiedades
              </div>
            </div>
          </div>
        </div>

        {/* Decoración geométrica sutil (reducida) */}
        <div 
          className="position-absolute" 
          style={{
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            background: 'rgba(198, 161, 91, 0.05)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
        <div 
          className="position-absolute" 
          style={{
            bottom: '-60px',
            left: '-60px',
            width: '300px',
            height: '300px',
            background: 'rgba(198, 161, 91, 0.03)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Dashboard Stats */}
      <div className="container pb-5">
        <div className="row g-4">
          {/* Título de sección - Separación reducida */}
          <div className="col-12">
            <h2 
              className="fw-bold mb-1" 
              style={{
                color: '#1A2A3A',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.8rem',
                position: 'relative',
                paddingBottom: '10px'
              }}
            >
              Panel de Control
              <span 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '40px',
                  height: '3px',
                  background: '#C6A15B',
                  borderRadius: '2px'
                }}
              />
            </h2>
            <p style={{ color: '#5A6A7A', marginTop: '8px', marginBottom: '16px', fontSize: '0.95rem' }}>
              Resumen de tu actividad en SmartRent
            </p>
          </div>

          {/* Card 1 - Inmuebles */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card h-100 border-0 transition-all"
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
                  background: 'rgba(26, 42, 58, 0.06)',
                  color: '#1A2A3A',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-building"></i>
              </div>

              <h3 
                className="fw-bold mb-1" 
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {estadisticas.inmuebles}
              </h3>

              <p 
                className="mb-0" 
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Mis Inmuebles
              </p>

              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #1A2A3A 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>

          {/* Card 2 - Contratos Activos */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card h-100 border-0 transition-all"
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
                {estadisticas.contratos}
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
                  background: 'linear-gradient(90deg, #C6A15B 0%, transparent 100%)',
                  opacity: '0.15'
                }}
              />
            </div>
          </div>

          {/* Card 3 - Pagos Registrados */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card h-100 border-0 transition-all"
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
                  background: 'rgba(26, 42, 58, 0.06)',
                  color: '#1A2A3A',
                  fontSize: '1.3rem'
                }}
              >
                <i className="bi bi-cash-coin"></i>
              </div>

              <h3 
                className="fw-bold mb-1" 
                style={{
                  color: '#1A2A3A',
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px'
                }}
              >
                {estadisticas.pagos}
              </h3>

              <p 
                className="mb-0" 
                style={{
                  color: '#5A6A7A',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                Pagos Registrados
              </p>

              <div 
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '3px',
                  background: 'linear-gradient(90deg, #1A2A3A 0%, transparent 100%)',
                  opacity: '0.1'
                }}
              />
            </div>
          </div>

          {/* Card 4 - Eventos Blockchain */}
          <div className="col-md-3 col-sm-6">
            <div 
              className="card h-100 border-0 transition-all"
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
                {estadisticas.eventos}
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
                  top: '-30px',
                  right: '-30px',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(198, 161, 91, 0.03)',
                  borderRadius: '50%',
                  pointerEvents: 'none'
                }}
              />
              
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
        </div>

        {/* Footer decorativo del dashboard */}
        <div className="row mt-4">
          <div className="col-12 text-center">
            <p 
              style={{
                color: '#5A6A7A',
                fontSize: '0.8rem',
                opacity: '0.5',
                letterSpacing: '0.3px'
              }}
            >
              <i className="bi bi-shield-check me-1"></i>
              Todos los datos están protegidos por la red blockchain
            </p>
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