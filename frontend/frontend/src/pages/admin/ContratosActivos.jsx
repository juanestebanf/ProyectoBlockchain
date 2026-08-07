import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import contratoService from "../../services/contratoService";

export default function ContratosActivos() {
    const [contratos, setContratos] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarContratos();
    }, []);

    const cargarContratos = async () => {
        try {
            setCargando(true);
            const { data } = await contratoService.listarTodos();
            setContratos(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No fue posible cargar los contratos.",
                "error"
            );
        } finally {
            setCargando(false);
        }
    };

    const formatearMonto = (monto) => {
        return new Intl.NumberFormat('es-ES').format(monto);
    };

    const obtenerEstadoBadge = (estado) => {
        const estados = {
            'ACTIVO': { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.12)', icon: 'bi-check-circle-fill' },
            'FINALIZADO': { color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.12)', icon: 'bi-check-circle-fill' },
            'PENDIENTE': { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.12)', icon: 'bi-clock-history' },
            'CANCELADO': { color: '#F44336', bg: 'rgba(244, 67, 54, 0.12)', icon: 'bi-x-circle-fill' }
        };
        return estados[estado] || { color: '#5A6A7A', bg: 'rgba(90, 106, 122, 0.12)', icon: 'bi-circle' };
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
                                    Contratos Activos
                                </h1>
                                <p style={{ color: '#5A6A7A', margin: 0 }}>
                                    <i className="bi bi-eye me-1"></i>
                                    Visualiza todos los contratos registrados en la plataforma
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
                                            No hay contratos registrados
                                        </h5>
                                        <p style={{ color: '#5A6A7A' }}>
                                            Los contratos aparecerán aquí cuando se generen
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
                                                    Cliente
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Monto
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Estado
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Blockchain
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
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div 
                                                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                                                    style={{
                                                                        width: '28px',
                                                                        height: '28px',
                                                                        background: 'rgba(198, 161, 91, 0.12)',
                                                                        color: '#C6A15B',
                                                                        fontSize: '0.7rem'
                                                                    }}
                                                                >
                                                                    <i className="bi bi-person-fill"></i>
                                                                </div>
                                                                <span style={{ color: '#5A6A7A' }}>
                                                                    {contrato.propietario}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div 
                                                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                                                    style={{
                                                                        width: '28px',
                                                                        height: '28px',
                                                                        background: 'rgba(26, 42, 58, 0.06)',
                                                                        color: '#1A2A3A',
                                                                        fontSize: '0.7rem'
                                                                    }}
                                                                >
                                                                    <i className="bi bi-person-fill"></i>
                                                                </div>
                                                                <span style={{ color: '#5A6A7A' }}>
                                                                    {contrato.cliente}
                                                                </span>
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
                                                                ${formatearMonto(contrato.monto)}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span 
                                                                className="px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1"
                                                                style={{
                                                                    background: estadoStyle.bg,
                                                                    color: estadoStyle.color,
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600'
                                                                }}
                                                            >
                                                                <i className={`${estadoStyle.icon} me-1`} style={{ fontSize: '0.6rem' }}></i>
                                                                {contrato.estado}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            {contrato.tx_hash ? (
                                                                <span 
                                                                    className="px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1"
                                                                    style={{
                                                                        background: 'rgba(76, 175, 80, 0.12)',
                                                                        color: '#4CAF50',
                                                                        fontSize: '0.75rem',
                                                                        fontWeight: '600'
                                                                    }}
                                                                >
                                                                    <i className="bi bi-check-circle-fill me-1" style={{ fontSize: '0.6rem' }}></i>
                                                                    Registrado
                                                                </span>
                                                            ) : (
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
                                                                    Pendiente
                                                                </span>
                                                            )}
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