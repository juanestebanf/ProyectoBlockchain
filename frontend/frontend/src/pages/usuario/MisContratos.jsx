import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import contratoService from "../../services/contratoService";

export default function MisContratos() {
  const [contratos, setContratos] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarContratos();
  }, []);

  const cargarContratos = async () => {
    try {
      setCargando(true);
      const { data } = await contratoService.listarMisContratos();
      console.log(data.data);
      setContratos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los contratos.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  const descargarPDF = async (id) => {
    try {
      const response = await contratoService.descargarPDF(id);
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `Contrato_${id}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Swal.fire(
        "Error",
        "No se pudo descargar el PDF.",
        "error"
      );
    }
  };

  const finalizarContrato = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Finalizar contrato?",
      text: "Esta acción quedará registrada en Blockchain.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, finalizar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1A2A3A"
    });

    if (!confirmar.isConfirmed) return;

    try {
      await contratoService.finalizarContrato(id);
      
      Swal.fire(
        "Correcto",
        "Contrato finalizado.",
        "success"
      );
      cargarContratos();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible finalizar.",
        "error"
      );
    }
  };

  const firmarContrato = async (contrato) => {
    try {
      if (usuario.id === contrato.propietario_id) {
        await contratoService.firmarPropietario(contrato.id);
        Swal.fire(
          "Correcto",
          "Contrato firmado por el propietario.",
          "success"
        );
      } else if (usuario.id === contrato.cliente_id) {
        await contratoService.firmarCliente(contrato.id);
        Swal.fire(
          "Correcto",
          "Contrato firmado por el cliente.",
          "success"
        );
      } else {
        Swal.fire(
          "Error",
          "No pertenece a este contrato.",
          "error"
        );
        return;
      }
      cargarContratos();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible firmar.",
        "error"
      );
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "—";
    return new Date(fecha).toLocaleDateString('es-EC', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-ES').format(monto);
  };

  const obtenerEstadoBadge = (estado) => {
    const estados = {
      'ACTIVO': { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.12)' },
      'PENDIENTE': { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.12)' },
      'PENDIENTE_FIRMA': { color: '#C6A15B', bg: 'rgba(198, 161, 91, 0.12)' },
      'FINALIZADO': { color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.12)' },
      'CANCELADO': { color: '#F44336', bg: 'rgba(244, 67, 54, 0.12)' }
    };
    return estados[estado] || { color: '#5A6A7A', bg: 'rgba(90, 106, 122, 0.12)' };
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
                <i className="bi bi-file-earmark-text-fill"></i>
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
                  Mis Contratos
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-file-earmark-check me-1"></i>
                  Gestiona todos tus contratos inmobiliarios
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Contratos */}
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
                  Lista de Contratos
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
                  {contratos.length} contratos
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
                      Cargando contratos...
                    </p>
                  </div>
                ) : contratos.length === 0 ? (
                  <div className="p-5 text-center">
                    <i 
                      className="bi bi-file-earmark-text-fill" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#C6A15B',
                        opacity: '0.3'
                      }}
                    />
                    <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                      No tienes contratos registrados
                    </h5>
                    <p style={{ color: '#5A6A7A' }}>
                      Los contratos que generes aparecerán aquí
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
                          Monto
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Inicio
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Fin
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Estado
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          TX Hash
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem', textAlign: 'center' }}>
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {contratos.map((contrato) => {
                        const estadoStyle = obtenerEstadoBadge(contrato.estado);
                        return (
                          <tr 
                            key={contrato.id}
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
                                #{contrato.id}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span 
                                className="fw-semibold"
                                style={{ color: '#1A2A3A' }}
                              >
                                {contrato.titulo}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span 
                                className="fw-bold"
                                style={{ 
                                  color: '#1A2A3A',
                                  fontFamily: 'Playfair Display, serif'
                                }}
                              >
                                ${formatearMonto(contrato.monto)}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{ color: '#5A6A7A', fontSize: '0.9rem' }}>
                                {contrato.fecha_inicio
                                  ? formatearFecha(contrato.fecha_inicio)
                                  : "—"}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span style={{ color: '#5A6A7A', fontSize: '0.9rem' }}>
                                {contrato.fecha_fin
                                  ? formatearFecha(contrato.fecha_fin)
                                  : "—"}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span 
                                className="px-3 py-1 rounded-pill"
                                style={{
                                  background: estadoStyle.bg,
                                  color: estadoStyle.color,
                                  fontSize: '0.75rem',
                                  fontWeight: '600'
                                }}
                              >
                                {contrato.estado}
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
                                  maxWidth: '120px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {contrato.tx_hash}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div className="d-flex gap-2 justify-content-center">
                                <button
                                  className="btn btn-sm"
                                  onClick={() => descargarPDF(contrato.id)}
                                  style={{
                                    background: 'rgba(198, 161, 91, 0.12)',
                                    color: '#C6A15B',
                                    border: 'none',
                                    padding: '6px 12px',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '0.8rem',
                                    transition: 'all 0.2s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(198, 161, 91, 0.25)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(198, 161, 91, 0.12)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                  }}
                                >
                                  <i className="bi bi-file-pdf me-1"></i>
                                  PDF
                                </button>

                                {contrato.estado === "PENDIENTE_FIRMA" && (
                                  <button
                                    className="btn btn-sm"
                                    onClick={() => firmarContrato(contrato)}
                                    style={{
                                      background: 'rgba(198, 161, 91, 0.15)',
                                      color: '#C6A15B',
                                      border: 'none',
                                      padding: '6px 12px',
                                      borderRadius: '8px',
                                      fontWeight: '500',
                                      fontSize: '0.8rem',
                                      transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.background = 'rgba(198, 161, 91, 0.30)';
                                      e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.background = 'rgba(198, 161, 91, 0.15)';
                                      e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                  >
                                    <i className="bi bi-pen-fill me-1"></i>
                                    Firmar
                                  </button>
                                )}

                                {contrato.estado === "ACTIVO" && (
                                  <button
                                    className="btn btn-sm"
                                    onClick={() => finalizarContrato(contrato.id)}
                                    style={{
                                      background: 'rgba(244, 67, 54, 0.08)',
                                      color: '#F44336',
                                      border: 'none',
                                      padding: '6px 12px',
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
                                    <i className="bi bi-check-circle me-1"></i>
                                    Finalizar
                                  </button>
                                )}
                              </div>
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
      </div>
    </>
  );
}