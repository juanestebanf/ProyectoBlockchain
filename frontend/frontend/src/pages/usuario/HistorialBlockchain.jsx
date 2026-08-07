import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import contratoService from "../../services/contratoService";
import blockchainService from "../../services/blockchainService";

export default function HistorialBlockchain() {
    const [contratos, setContratos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [contratoSeleccionado, setContratoSeleccionado] = useState("");
    const [cargando, setCargando] = useState(false);
    const [cargandoContratos, setCargandoContratos] = useState(true);

    useEffect(() => {
        cargarContratos();
    }, []);

    const cargarContratos = async () => {
        try {
            setCargandoContratos(true);
            const { data } = await contratoService.listarMisContratos();
            setContratos(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No se pudieron cargar los contratos.",
                "error"
            );
        } finally {
            setCargandoContratos(false);
        }
    };

    const cargarEventos = async (idContrato) => {
        try {
            setCargando(true);
            const { data } = await blockchainService.listarPorContrato(idContrato);
            setEventos(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No se pudo obtener el historial Blockchain.",
                "error"
            );
            setEventos([]);
        } finally {
            setCargando(false);
        }
    };

    const seleccionarContrato = async (e) => {
        const id = e.target.value;
        setContratoSeleccionado(id);
        if (id) {
            await cargarEventos(id);
        } else {
            setEventos([]);
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
        if (eventoLower.includes('creacion') || eventoLower.includes('creado')) return '#4CAF50';
        if (eventoLower.includes('pago') || eventoLower.includes('pagado')) return '#C6A15B';
        if (eventoLower.includes('actualizacion') || eventoLower.includes('actualizado')) return '#2196F3';
        if (eventoLower.includes('cancelacion') || eventoLower.includes('cancelado')) return '#F44336';
        if (eventoLower.includes('finalizacion') || eventoLower.includes('finalizado')) return '#9C27B0';
        return '#1A2A3A';
    };

    const obtenerIconoEvento = (evento) => {
        const eventoLower = evento.toLowerCase();
        if (eventoLower.includes('creacion') || eventoLower.includes('creado')) return 'bi-plus-circle-fill';
        if (eventoLower.includes('pago') || eventoLower.includes('pagado')) return 'bi-coin-fill';
        if (eventoLower.includes('actualizacion') || eventoLower.includes('actualizado')) return 'bi-pencil-square';
        if (eventoLower.includes('cancelacion') || eventoLower.includes('cancelado')) return 'bi-x-circle-fill';
        if (eventoLower.includes('finalizacion') || eventoLower.includes('finalizado')) return 'bi-check-circle-fill';
        return 'bi-clock-history';
    };

    return (
        <>
            <Navbar />

            <div className="container py-5">
                {/* Título de página */}
                <div className="row mb-5">
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
                                    Historial Blockchain
                                </h1>
                                <p style={{ color: '#5A6A7A', margin: 0 }}>
                                    <i className="bi bi-database me-1"></i>
                                    Consulta los eventos registrados en la cadena de bloques
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Selector de Contrato */}
                <div className="row mb-4">
                    <div className="col-lg-8">
                        <div 
                            className="card border-0"
                            style={{
                                borderRadius: '16px',
                                background: '#FFFFFF',
                                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                                padding: '28px'
                            }}
                        >
                            <div className="d-flex align-items-center gap-3 flex-wrap">
                                <div style={{ flex: '1', minWidth: '200px' }}>
                                    <label 
                                        className="form-label fw-semibold mb-2"
                                        style={{ 
                                            color: '#1A2A3A',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        <i className="bi bi-file-earmark-text me-2" style={{ color: '#C6A15B' }}></i>
                                        Selecciona un contrato
                                    </label>
                                    <select
                                        className="form-select"
                                        value={contratoSeleccionado}
                                        onChange={seleccionarContrato}
                                        disabled={cargandoContratos}
                                        style={{
                                            borderRadius: '10px',
                                            border: '1px solid #E5E8EC',
                                            padding: '10px 16px',
                                            background: '#F9F6F0',
                                            color: '#1A2A3A',
                                            transition: 'all 0.2s ease',
                                            cursor: cargandoContratos ? 'not-allowed' : 'pointer'
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
                                        <option value="">
                                            {cargandoContratos ? 'Cargando contratos...' : 'Seleccione un contrato'}
                                        </option>
                                        {contratos.map((contrato) => (
                                            <option key={contrato.id} value={contrato.id}>
                                                #{contrato.id} - {contrato.titulo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {contratoSeleccionado && (
                                    <div className="mt-2 mt-md-0">
                                        <span 
                                            className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                                            style={{
                                                background: 'rgba(198, 161, 91, 0.1)',
                                                color: '#C6A15B',
                                                fontSize: '0.85rem',
                                                fontWeight: '500'
                                            }}
                                        >
                                            <i className="bi bi-check-circle-fill"></i>
                                            Contrato #{contratoSeleccionado}
                                        </span>
                                    </div>
                                )}
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
                                {eventos.length > 0 && (
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
                                )}
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
                                            className="bi bi-inbox-fill" 
                                            style={{ 
                                                fontSize: '3rem', 
                                                color: '#C6A15B',
                                                opacity: '0.3'
                                            }}
                                        />
                                        <h5 
                                            className="mt-3"
                                            style={{ color: '#1A2A3A' }}
                                        >
                                            {contratoSeleccionado 
                                                ? 'No hay eventos registrados para este contrato' 
                                                : 'Selecciona un contrato para ver su historial'}
                                        </h5>
                                        <p style={{ color: '#5A6A7A' }}>
                                            {contratoSeleccionado 
                                                ? 'Este contrato aún no tiene actividad en la blockchain' 
                                                : 'Los eventos blockchain aparecerán aquí'}
                                        </p>
                                    </div>
                                ) : (
                                    <table className="table table-hover align-middle mb-0">
                                        <thead style={{ background: '#F9F6F0' }}>
                                            <tr>
                                                <th style={{ padding: '16px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Evento
                                                </th>
                                                <th style={{ padding: '16px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Bloque
                                                </th>
                                                <th style={{ padding: '16px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Hash
                                                </th>
                                                <th style={{ padding: '16px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Fecha
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {eventos.map((evento) => (
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
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div 
                                                                className="d-flex align-items-center justify-content-center rounded-circle"
                                                                style={{
                                                                    width: '32px',
                                                                    height: '32px',
                                                                    background: `${obtenerColorEvento(evento.evento)}20`,
                                                                    color: obtenerColorEvento(evento.evento)
                                                                }}
                                                            >
                                                                <i className={obtenerIconoEvento(evento.evento)}></i>
                                                            </div>
                                                            <span className="fw-semibold" style={{ color: '#1A2A3A' }}>
                                                                {evento.evento}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{ padding: '16px 20px' }}>
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
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <span 
                                                            className="font-monospace"
                                                            style={{
                                                                fontSize: '0.8rem',
                                                                color: '#5A6A7A',
                                                                background: '#F9F6F0',
                                                                padding: '4px 8px',
                                                                borderRadius: '4px'
                                                            }}
                                                        >
                                                            {evento.tx_hash}
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '16px 20px' }}>
                                                        <span style={{ color: '#5A6A7A', fontSize: '0.9rem' }}>
                                                            {formatearFecha(evento.fecha_evento)}
                                                        </span>
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

                {/* Resumen */}
                {eventos.length > 0 && !cargando && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div 
                                className="card border-0"
                                style={{
                                    borderRadius: '16px',
                                    background: 'linear-gradient(135deg, #1A2A3A 0%, #2C3E50 100%)',
                                    boxShadow: '0 4px 20px rgba(26, 42, 58, 0.15)',
                                    padding: '30px'
                                }}
                            >
                                <div className="row g-4">
                                    <div className="col-md-4">
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
                                                    fontSize: '2.2rem'
                                                }}
                                            >
                                                #{Math.max(...eventos.map(e => Number(e.bloque)))}
                                            </h3>
                                            <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                                                <i className="bi bi-cube-fill me-1"></i>
                                                Último bloque
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                                    fontSize: '2.2rem'
                                                }}
                                            >
                                                {eventos.length}
                                            </h3>
                                            <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                                                <i className="bi bi-list-ul me-1"></i>
                                                Eventos registrados
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
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
                                                    fontSize: '1.2rem',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                #{contratoSeleccionado}
                                            </h3>
                                            <p style={{ color: 'rgba(249, 246, 240, 0.6)', margin: 0, fontSize: '0.9rem' }}>
                                                <i className="bi bi-file-earmark-text me-1"></i>
                                                Contrato ID
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .form-select:disabled {
                    opacity: 0.6;
                }
                .form-select option {
                    padding: 8px;
                }
            `}</style>
        </>
    );
}