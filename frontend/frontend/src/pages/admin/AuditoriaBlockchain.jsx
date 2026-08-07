import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import blockchainService from "../../services/blockchainService";

export default function AuditoriaBlockchain() {
  const [eventos, setEventos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      setCargando(true);
      const { data } = await blockchainService.listarEventos();
      setEventos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los eventos.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const obtenerColorEvento = (evento) => {
    const eventoLower = evento.toLowerCase();
    if (eventoLower.includes('creacion') || eventoLower.includes('creado')) return { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.12)' };
    if (eventoLower.includes('pago') || eventoLower.includes('pagado')) return { color: '#C6A15B', bg: 'rgba(198, 161, 91, 0.12)' };
    if (eventoLower.includes('actualizacion') || eventoLower.includes('actualizado')) return { color: '#2196F3', bg: 'rgba(33, 150, 243, 0.12)' };
    if (eventoLower.includes('cancelacion') || eventoLower.includes('cancelado')) return { color: '#F44336', bg: 'rgba(244, 67, 54, 0.12)' };
    if (eventoLower.includes('finalizacion') || eventoLower.includes('finalizado')) return { color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.12)' };
    if (eventoLower.includes('firma') || eventoLower.includes('firmado')) return { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.12)' };
    if (eventoLower.includes('transferencia')) return { color: '#00BCD4', bg: 'rgba(0, 188, 212, 0.12)' };
    return { color: '#1A2A3A', bg: 'rgba(26, 42, 58, 0.06)' };
  };

  const obtenerIconoEvento = (evento) => {
    const eventoLower = evento.toLowerCase();
    if (eventoLower.includes('creacion') || eventoLower.includes('creado')) return 'bi-plus-circle-fill';
    if (eventoLower.includes('pago') || eventoLower.includes('pagado')) return 'bi-coin-fill';
    if (eventoLower.includes('actualizacion') || eventoLower.includes('actualizado')) return 'bi-pencil-square';
    if (eventoLower.includes('cancelacion') || eventoLower.includes('cancelado')) return 'bi-x-circle-fill';
    if (eventoLower.includes('finalizacion') || eventoLower.includes('finalizado')) return 'bi-check-circle-fill';
    if (eventoLower.includes('firma') || eventoLower.includes('firmado')) return 'bi-pen-fill';
    if (eventoLower.includes('transferencia')) return 'bi-arrow-left-right';
    return 'bi-clock-history';
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
                <i className="bi bi-link-45deg"></i>
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
                  Auditoría Blockchain
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-database-check me-1"></i>
                  Monitorea todos los eventos registrados en la cadena de bloques
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Eventos */}
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
                  Eventos Registrados
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
                  {eventos.length} eventos
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
                      Cargando eventos blockchain...
                    </p>
                  </div>
                ) : eventos.length === 0 ? (
                  <div className="p-5 text-center">
                    <i 
                      className="bi bi-link-45deg" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#C6A15B',
                        opacity: '0.3'
                      }}
                    />
                    <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                      No hay eventos registrados
                    </h5>
                    <p style={{ color: '#5A6A7A' }}>
                      Los eventos blockchain aparecerán aquí cuando se registren transacciones
                    </p>
                  </div>
                ) : (
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ background: '#F9F6F0' }}>
                      <tr>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Bloque
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Evento
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Contrato
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Fecha
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Hash
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventos.map((evento) => {
                        const estilo = obtenerColorEvento(evento.evento);
                        return (
                          <tr 
                            key={evento.id}
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
                                className="px-3 py-1 rounded-pill"
                                style={{
                                  background: 'rgba(26, 42, 58, 0.06)',
                                  color: '#1A2A3A',
                                  fontSize: '0.8rem',
                                  fontWeight: '600',
                                  fontFamily: 'monospace'
                                }}
                              >
                                #{evento.bloque}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div className="d-flex align-items-center gap-2">
                                <div 
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    background: estilo.bg,
                                    color: estilo.color,
                                    fontSize: '0.8rem'
                                  }}
                                >
                                  <i className={obtenerIconoEvento(evento.evento)}></i>
                                </div>
                                <span className="fw-semibold" style={{ color: '#1A2A3A' }}>
                                  {evento.evento}
                                </span>
                              </div>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span 
                                className="fw-bold"
                                style={{ 
                                  color: '#1A2A3A',
                                  fontFamily: 'monospace',
                                  fontSize: '0.9rem'
                                }}
                              >
                                #{evento.contrato_id}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{ color: '#5A6A7A', fontSize: '0.85rem' }}>
                                {formatearFecha(evento.fecha_evento)}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span 
                                className="font-monospace"
                                style={{
                                  fontSize: '0.7rem',
                                  color: '#5A6A7A',
                                  background: '#F9F6F0',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  display: 'inline-block',
                                  maxWidth: '200px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {evento.tx_hash}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {eventos.length > 0 && !cargando && (
          <div className="row mt-4">
            <div className="col-12">
              <div 
                className="card border-0"
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #1A2A3A 0%, #2C3E50 100%)',
                  boxShadow: '0 4px 20px rgba(26, 42, 58, 0.15)',
                  padding: '24px 30px'
                }}
              >
                <div className="row g-4">
                  <div className="col-md-3">
                    <div 
                      className="p-3 rounded-3 text-center"
                      style={{
                        background: 'rgba(249, 246, 240, 0.06)',
                        border: '1px solid rgba(249, 246, 240, 0.1)'
                      }}
                    >
                      <h3 
                        className="fw-bold mb-1"
                        style={{ 
                          color: '#F9F6F0',
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '2rem'
                        }}
                      >
                        {eventos.length}
                      </h3>
                      <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.85rem' }}>
                        <i className="bi bi-list-ul me-1"></i>
                        Total Eventos
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div 
                      className="p-3 rounded-3 text-center"
                      style={{
                        background: 'rgba(249, 246, 240, 0.06)',
                        border: '1px solid rgba(249, 246, 240, 0.1)'
                      }}
                    >
                      <h3 
                        className="fw-bold mb-1"
                        style={{ 
                          color: '#C6A15B',
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '2rem'
                        }}
                      >
                        #{Math.max(...eventos.map(e => Number(e.bloque)))}
                      </h3>
                      <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.85rem' }}>
                        <i className="bi bi-cube-fill me-1"></i>
                        Último Bloque
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div 
                      className="p-3 rounded-3 text-center"
                      style={{
                        background: 'rgba(249, 246, 240, 0.06)',
                        border: '1px solid rgba(249, 246, 240, 0.1)'
                      }}
                    >
                      <h3 
                        className="fw-bold mb-1"
                        style={{ 
                          color: '#F9F6F0',
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '2rem'
                        }}
                      >
                        {new Set(eventos.map(e => e.evento)).size}
                      </h3>
                      <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.85rem' }}>
                        <i className="bi bi-tags me-1"></i>
                        Tipos de Eventos
                      </p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div 
                      className="p-3 rounded-3 text-center"
                      style={{
                        background: 'rgba(249, 246, 240, 0.06)',
                        border: '1px solid rgba(249, 246, 240, 0.1)'
                      }}
                    >
                      <h3 
                        className="fw-bold mb-1"
                        style={{ 
                          color: '#F9F6F0',
                          fontFamily: 'Playfair Display, serif',
                          fontSize: '2rem'
                        }}
                      >
                        {new Set(eventos.map(e => e.contrato_id)).size}
                      </h3>
                      <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.85rem' }}>
                        <i className="bi bi-file-earmark-text me-1"></i>
                        Contratos Afectados
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}