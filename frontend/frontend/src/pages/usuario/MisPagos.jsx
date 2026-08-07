import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import pagoService from "../../services/pagoService";
import contratoService from "../../services/contratoService";

export default function MisPagos() {
  const [pagos, setPagos] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      await Promise.all([cargarPagos(), cargarContratos()]);
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const cargarPagos = async () => {
    try {
      const { data } = await pagoService.listarMisPagos();
      setPagos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los pagos.", "error");
    }
  };

  const cargarContratos = async () => {
    try {
      const { data } = await contratoService.listarMisContratos();
      setContratos(data.data.filter(contrato => contrato.estado === "ACTIVO"));
    } catch (error) {
      console.error(error);
    }
  };

  const registrarPago = async () => {
    if (contratos.length === 0) {
      Swal.fire(
        "Sin contratos",
        "No tienes contratos activos para registrar pagos.",
        "info"
      );
      return;
    }

    const opciones = contratos
      .map(c => `<option value="${c.id}">${c.titulo} - $${new Intl.NumberFormat('es-ES').format(c.monto)}</option>`)
      .join("");

    const { value: formValues } = await Swal.fire({
      title: "Registrar Pago",
      width: 500,
      html: `
        <div style="text-align: left; padding: 4px 0;">
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
              <i class="bi bi-file-earmark-text" style="color: #C6A15B; margin-right: 6px;"></i>
              Contrato
            </label>
            <select 
              id="contrato" 
              class="swal2-input" 
              style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
            >
              ${opciones}
            </select>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
              <i class="bi bi-credit-card" style="color: #C6A15B; margin-right: 6px;"></i>
              Método de Pago
            </label>
            <select 
              id="metodo" 
              class="swal2-input" 
              style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
            >
              <option value="TRANSFERENCIA">Transferencia</option>
              <option value="EFECTIVO">Efectivo</option>
              <option value="TARJETA">Tarjeta</option>
            </select>
          </div>

          <div style="margin-bottom: 4px;">
            <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
              <i class="bi bi-hash" style="color: #C6A15B; margin-right: 6px;"></i>
              Referencia
            </label>
            <input
              id="referencia"
              class="swal2-input"
              placeholder="Ej: Pago-001"
              style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
            />
            <small style="color: #5A6A7A; display: block; margin-top: 4px; font-size: 0.75rem;">
              <i class="bi bi-info-circle" style="color: #C6A15B;"></i>
              Ingresa un número de referencia para identificar este pago
            </small>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar Pago",
      confirmButtonColor: "#C6A15B",
      cancelButtonColor: "#1A2A3A",
      background: "#FFFFFF",
      preConfirm: () => {
        const referencia = document.getElementById("referencia").value.trim();
        if (!referencia) {
          Swal.showValidationMessage('Por favor, ingresa una referencia.');
          return false;
        }
        return {
          contrato_id: Number(document.getElementById("contrato").value),
          metodo_pago: document.getElementById("metodo").value,
          referencia
        };
      }
    });

    if (!formValues) return;

    try {
      Swal.fire({
        title: "Registrando pago en Blockchain...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const contrato = contratos.find(c => c.id === formValues.contrato_id);

      const { data } = await pagoService.crearPago({
        contrato_id: contrato.id,
        monto: contrato.monto,
        metodo_pago: formValues.metodo_pago,
        referencia: formValues.referencia
      });

      await pagoService.registrarBlockchain(data.data.id);

      Swal.fire({
        icon: 'success',
        title: 'Pago Registrado',
        text: 'El pago ha sido registrado en la Blockchain.',
        confirmButtonColor: '#C6A15B'
      });

      cargarDatos();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible registrar el pago.",
        "error"
      );
    }
  };

  const formatearMonto = (monto) => {
    return new Intl.NumberFormat('es-ES').format(monto);
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
                <i className="bi bi-cash-coin-fill"></i>
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
                  Mis Pagos
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-credit-card me-1"></i>
                  Registra y gestiona tus pagos inmobiliarios
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón Registrar y Estadísticas */}
        <div className="row mb-4">
          <div className="col-12">
            <div 
              className="d-flex flex-wrap align-items-center justify-content-between gap-3"
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 24px',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)'
              }}
            >
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div>
                  <span style={{ color: '#5A6A7A', fontSize: '0.85rem' }}>
                    Total de Pagos
                  </span>
                  <h4 
                    className="fw-bold mb-0"
                    style={{
                      color: '#1A2A3A',
                      fontFamily: 'Playfair Display, serif'
                    }}
                  >
                    {pagos.length}
                  </h4>
                </div>
                <div className="d-none d-md-block" style={{ width: '1px', height: '30px', background: '#E5E8EC' }} />
                <div>
                  <span style={{ color: '#5A6A7A', fontSize: '0.85rem' }}>
                    Contratos Activos
                  </span>
                  <h4 
                    className="fw-bold mb-0"
                    style={{
                      color: '#1A2A3A',
                      fontFamily: 'Playfair Display, serif'
                    }}
                  >
                    {contratos.length}
                  </h4>
                </div>
              </div>

              <button
                className="btn"
                disabled={contratos.length === 0}
                onClick={registrarPago}
                style={{
                  background: contratos.length === 0 ? '#E5E8EC' : '#1A2A3A',
                  color: contratos.length === 0 ? '#5A6A7A' : '#F9F6F0',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '10px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease',
                  cursor: contratos.length === 0 ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (contratos.length > 0) {
                    e.currentTarget.style.background = '#C6A15B';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (contratos.length > 0) {
                    e.currentTarget.style.background = '#1A2A3A';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Registrar Pago
              </button>
            </div>
            {contratos.length === 0 && (
              <p className="mt-2 mb-0" style={{ color: '#FF9800', fontSize: '0.85rem' }}>
                <i className="bi bi-info-circle me-1"></i>
                No tienes contratos activos para registrar pagos
              </p>
            )}
          </div>
        </div>

        {/* Tabla de Pagos */}
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
                  Historial de Pagos
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
                  {pagos.length} pagos
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
                      Cargando pagos...
                    </p>
                  </div>
                ) : pagos.length === 0 ? (
                  <div className="p-5 text-center">
                    <i 
                      className="bi bi-cash-coin-fill" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#C6A15B',
                        opacity: '0.3'
                      }}
                    />
                    <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                      No tienes pagos registrados
                    </h5>
                    <p style={{ color: '#5A6A7A' }}>
                      Registra tu primer pago para comenzar
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
                          Método
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Referencia
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Estado
                        </th>
                        <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          TX Hash
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagos.map((pago) => (
                        <tr 
                          key={pago.id}
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
                              #{pago.id}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="fw-semibold"
                              style={{ color: '#1A2A3A' }}
                            >
                              {pago.titulo}
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
                              ${formatearMonto(pago.monto)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="px-3 py-1 rounded-pill"
                              style={{
                                background: 'rgba(26, 42, 58, 0.06)',
                                color: '#1A2A3A',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              {pago.metodo_pago || '—'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span style={{ color: '#5A6A7A', fontSize: '0.85rem' }}>
                              {pago.referencia || '—'}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            <span 
                              className="px-3 py-1 rounded-pill"
                              style={{
                                background: 'rgba(76, 175, 80, 0.12)',
                                color: '#4CAF50',
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              <i className="bi bi-check-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                              {pago.estado}
                            </span>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            {pago.tx_hash ? (
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
                                {pago.tx_hash.substring(0, 12)}...
                              </span>
                            ) : (
                              <span style={{ color: '#B0B8C0', fontSize: '0.85rem' }}>
                                —
                              </span>
                            )}
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