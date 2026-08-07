import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import inmuebleService from "../../services/inmuebleService";

export default function ValidarInmuebles() {
  const [inmuebles, setInmuebles] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = async () => {
    try {
      setCargando(true);
      const { data } = await inmuebleService.listarPendientes();
      setInmuebles(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los inmuebles.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  const aprobar = async (id) => {
    const respuesta = await Swal.fire({
      title: "¿Aprobar inmueble?",
      text: "El inmueble quedará disponible para el público.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, aprobar",
      confirmButtonColor: "#4CAF50",
      cancelButtonColor: "#1A2A3A"
    });

    if (!respuesta.isConfirmed) return;

    try {
      await inmuebleService.aprobar(id);
      Swal.fire(
        "Correcto",
        "Inmueble aprobado.",
        "success"
      );
      cargarPendientes();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo aprobar.",
        "error"
      );
    }
  };

  const rechazar = async (id) => {
    const respuesta = await Swal.fire({
      title: "¿Rechazar inmueble?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, rechazar",
      confirmButtonColor: "#F44336",
      cancelButtonColor: "#1A2A3A"
    });

    if (!respuesta.isConfirmed) return;

    try {
      await inmuebleService.rechazar(id);
      Swal.fire(
        "Correcto",
        "Inmueble rechazado.",
        "success"
      );
      cargarPendientes();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo rechazar.",
        "error"
      );
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <>
      <Navbar />

      <div className="container py-4">
        {/* Header */}
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
                <i className="bi bi-building-check"></i>
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
                  Validación de Inmuebles
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-shield-check me-1"></i>
                  Gestiona la aprobación de inmuebles para su publicación
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Inmuebles Pendientes */}
        <div className="row">
          <div className="col-12">
            <div 
              className="card border-0"
              style={{
                borderRadius: '16px',
                background: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                overflow: 'hidden'
              }}
            >
              <div 
                className="d-flex justify-content-between align-items-center p-4"
                style={{
                  borderBottom: '1px solid #F0F2F5'
                }}
              >
                <h5 
                  className="fw-bold mb-0"
                  style={{
                    color: '#1A2A3A',
                    fontFamily: 'Playfair Display, serif'
                  }}
                >
                  <i className="bi bi-list-ul me-2" style={{ color: '#C6A15B' }}></i>
                  Inmuebles Pendientes
                </h5>
                <span 
                  className="px-3 py-1 rounded-pill"
                  style={{
                    background: 'rgba(26, 42, 58, 0.06)',
                    color: '#1A2A3A',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}
                >
                  {inmuebles.length} pendientes
                </span>
              </div>

              <div className="table-responsive">
                {cargando ? (
                  <div className="p-5 text-center">
                    <div 
                      className="spinner-border mb-3"
                      style={{ 
                        color: '#C6A15B',
                        width: '2.5rem',
                        height: '2.5rem'
                      }}
                      role="status"
                    />
                    <p style={{ color: '#5A6A7A' }}>
                      Cargando inmuebles pendientes...
                    </p>
                  </div>
                ) : inmuebles.length === 0 ? (
                  <div className="p-5 text-center">
                    <i 
                      className="bi bi-building-check" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#C6A15B',
                        opacity: '0.3'
                      }}
                    />
                    <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                      No hay inmuebles pendientes
                    </h5>
                    <p style={{ color: '#5A6A7A' }}>
                      Todos los inmuebles han sido validados
                    </p>
                  </div>
                ) : (
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ background: '#F9F6F0' }}>
                      <tr>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          ID
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Inmueble
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Propietario
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Precio
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Tipo
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Estado
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem', textAlign: 'center' }}>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {inmuebles.map((item) => (
                        <tr 
                          key={item.id}
                          style={{
                            transition: 'all 0.2s ease',
                            borderBottom: '1px solid #F0F2F5'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#F9F6F0';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="fw-bold"
                              style={{ 
                                color: '#1A2A3A',
                                fontFamily: 'monospace',
                                fontSize: '0.9rem'
                              }}
                            >
                              #{item.id}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div>
                              <span 
                                className="fw-semibold"
                                style={{ color: '#1A2A3A' }}
                              >
                                {item.titulo}
                              </span>
                              <br />
                              <span style={{ color: '#B0B8C0', fontSize: '0.7rem' }}>
                                <i className="bi bi-geo-alt me-1"></i>
                                {item.direccion || 'Sin dirección'}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <div 
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width: '32px',
                                  height: '32px',
                                  background: 'rgba(198, 161, 91, 0.12)',
                                  color: '#C6A15B',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <i className="bi bi-person-fill"></i>
                              </div>
                              <div>
                                <span style={{ color: '#5A6A7A', fontSize: '0.9rem' }}>
                                  {item.propietario}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="fw-bold"
                              style={{ 
                                color: '#1A2A3A',
                                fontFamily: 'Playfair Display, serif'
                              }}
                            >
                              ${new Intl.NumberFormat('es-ES').format(item.precio)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="px-3 py-1 rounded-pill"
                              style={{
                                background: item.tipo_operacion === "VENTA" 
                                  ? 'rgba(198, 161, 91, 0.15)' 
                                  : 'rgba(26, 42, 58, 0.06)',
                                color: item.tipo_operacion === "VENTA" ? '#C6A15B' : '#1A2A3A',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              {item.tipo_operacion}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1"
                              style={{
                                background: 'rgba(255, 152, 0, 0.12)',
                                color: '#FF9800',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              <i className="bi bi-clock-history me-1" style={{ fontSize: '0.6rem' }}></i>
                              {item.estado}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm"
                                onClick={() => aprobar(item.id)}
                                style={{
                                  background: 'rgba(76, 175, 80, 0.12)',
                                  color: '#4CAF50',
                                  border: 'none',
                                  padding: '6px 14px',
                                  borderRadius: '8px',
                                  fontWeight: '500',
                                  fontSize: '0.8rem',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(76, 175, 80, 0.25)';
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(76, 175, 80, 0.12)';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                <i className="bi bi-check-circle me-1"></i>
                                Aprobar
                              </button>
                              <button
                                className="btn btn-sm"
                                onClick={() => rechazar(item.id)}
                                style={{
                                  background: 'rgba(244, 67, 54, 0.08)',
                                  color: '#F44336',
                                  border: 'none',
                                  padding: '6px 14px',
                                  borderRadius: '8px',
                                  fontWeight: '500',
                                  fontSize: '0.8rem',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(244, 67, 54, 0.18)';
                                  e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(244, 67, 54, 0.08)';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }}
                              >
                                <i className="bi bi-x-circle me-1"></i>
                                Rechazar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}