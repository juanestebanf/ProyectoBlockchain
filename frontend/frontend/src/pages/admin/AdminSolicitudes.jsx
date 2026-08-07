import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import solicitudService from "../../services/solicitudService";

export default function AdminSolicitudes() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        try {
            setCargando(true);
            const { data } = await solicitudService.listarRecibidas();
            setSolicitudes(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No se pudieron cargar las solicitudes.",
                "error"
            );
        } finally {
            setCargando(false);
        }
    };

    const aprobar = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Aceptar solicitud?",
            text: "Se generará automáticamente el contrato.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#4CAF50",
            cancelButtonColor: "#1A2A3A"
        });

        if (!confirmacion.isConfirmed) return;

        try {
            await solicitudService.aceptarSolicitud(id);
            Swal.fire(
                "Correcto",
                "Solicitud aceptada.",
                "success"
            );
            cargarSolicitudes();
        } catch (error) {
            Swal.fire(
                "Error",
                error.response?.data?.message || "No se pudo aceptar.",
                "error"
            );
        }
    };

    const rechazar = async (id) => {
        const confirmacion = await Swal.fire({
            title: "¿Rechazar solicitud?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Rechazar",
            confirmButtonColor: "#F44336",
            cancelButtonColor: "#1A2A3A"
        });

        if (!confirmacion.isConfirmed) return;

        try {
            await solicitudService.rechazarSolicitud(id);
            Swal.fire(
                "Correcto",
                "Solicitud rechazada.",
                "success"
            );
            cargarSolicitudes();
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const obtenerEstadoBadge = (estado) => {
        const estados = {
            'PENDIENTE': { color: '#FF9800', bg: 'rgba(255, 152, 0, 0.12)', icon: 'bi-clock-history' },
            'ACEPTADA': { color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.12)', icon: 'bi-check-circle-fill' },
            'RECHAZADA': { color: '#F44336', bg: 'rgba(244, 67, 54, 0.12)', icon: 'bi-x-circle-fill' }
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
                                <i className="bi bi-inbox-fill"></i>
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
                                    Solicitudes Recibidas
                                </h1>
                                <p style={{ color: '#5A6A7A', margin: 0 }}>
                                    <i className="bi bi-envelope-paper me-1"></i>
                                    Gestiona las solicitudes de los usuarios
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de Solicitudes */}
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
                                    Lista de Solicitudes
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
                                    {solicitudes.length} solicitudes
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
                                            Cargando solicitudes...
                                        </p>
                                    </div>
                                ) : solicitudes.length === 0 ? (
                                    <div className="p-5 text-center">
                                        <i 
                                            className="bi bi-inbox-fill" 
                                            style={{ 
                                                fontSize: '3rem', 
                                                color: '#C6A15B',
                                                opacity: '0.3'
                                            }}
                                        />
                                        <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                                            No hay solicitudes pendientes
                                        </h5>
                                        <p style={{ color: '#5A6A7A' }}>
                                            Las solicitudes de los usuarios aparecerán aquí
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
                                                    Cliente
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Inmueble
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Fecha
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
                                            {solicitudes.map((solicitud) => {
                                                const estadoStyle = obtenerEstadoBadge(solicitud.estado);
                                                return (
                                                    <tr 
                                                        key={solicitud.id}
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
                                                                #{solicitud.id}
                                                            </span>
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
                                                                <span className="fw-semibold" style={{ color: '#1A2A3A' }}>
                                                                    {solicitud.cliente}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{ color: '#5A6A7A' }}>
                                                                {solicitud.titulo}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{ color: '#5A6A7A', fontSize: '0.85rem' }}>
                                                                {formatearFecha(solicitud.created_at)}
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
                                                                {solicitud.estado}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            {solicitud.estado === "PENDIENTE" && (
                                                                <div className="d-flex gap-2 justify-content-center">
                                                                    <button
                                                                        className="btn btn-sm"
                                                                        onClick={() => aprobar(solicitud.id)}
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
                                                                        onClick={() => rechazar(solicitud.id)}
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
                                                            )}
                                                            {solicitud.estado !== "PENDIENTE" && (
                                                                <span style={{ color: '#B0B8C0', fontSize: '0.85rem' }}>
                                                                    —
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