import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import inmuebleService from "../../services/inmuebleService";
import solicitudService from "../../services/solicitudService";

export default function DetalleInmueble() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [inmueble, setInmueble] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarInmueble();
    }, [id]);

    const cargarInmueble = async () => {
        try {
            setCargando(true);
            const { data } = await inmuebleService.obtenerPorId(id);
            setInmueble(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No se pudo cargar el inmueble.",
                "error"
            );
        } finally {
            setCargando(false);
        }
    };

    const solicitarContrato = async () => {
        const { value: mensaje } = await Swal.fire({
            title: "Solicitar Inmueble",
            text: `¿Deseas solicitar "${inmueble.titulo}"?`,
            icon: "info",
            input: "textarea",
            inputLabel: "Mensaje para el propietario",
            inputPlaceholder: "Escribe un mensaje detallado sobre tu interés...",
            showCancelButton: true,
            confirmButtonText: "Enviar Solicitud",
            confirmButtonColor: "#C6A15B",
            cancelButtonColor: "#1A2A3A",
            inputValidator: (value) => {
                if (!value || value.trim().length < 10) {
                    return "Por favor, escribe un mensaje de al menos 10 caracteres";
                }
                return null;
            }
        });

        if (!mensaje) return;

        try {
            await solicitudService.crearSolicitud({
                inmueble_id: inmueble.id,
                mensaje
            });

            Swal.fire({
                icon: 'success',
                title: '¡Solicitud Enviada!',
                text: 'El propietario recibirá tu mensaje pronto.',
                confirmButtonColor: '#C6A15B'
            });

            navigate("/explorar");
        } catch (error) {
            Swal.fire(
                "Error",
                error.response?.data?.message ||
                "No fue posible enviar la solicitud.",
                "error"
            );
        }
    };

    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat('es-ES').format(precio);
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString("es-EC", {
            year: "numeric",
            month: "long"
        });
    };

    if (cargando) {
        return (
            <>
                <Navbar />
                <div className="container py-5">
                    <div className="text-center py-5">
                        <div 
                            className="spinner-border mb-3"
                            style={{ 
                                color: '#C6A15B',
                                width: '3rem',
                                height: '3rem'
                            }}
                            role="status"
                        />
                        <p style={{ color: '#5A6A7A' }}>
                            Cargando detalles del inmueble...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    if (!inmueble) {
        return (
            <>
                <Navbar />
                <div className="container py-5">
                    <div className="text-center py-5">
                        <i 
                            className="bi bi-building-fill" 
                            style={{ 
                                fontSize: '3rem', 
                                color: '#C6A15B',
                                opacity: '0.3'
                            }}
                        />
                        <h4 className="mt-3" style={{ color: '#1A2A3A' }}>
                            Inmueble no encontrado
                        </h4>
                        <p style={{ color: '#5A6A7A' }}>
                            El inmueble que buscas no existe o fue eliminado
                        </p>
                    </div>
                </div>
            </>
        );
    }

    // Crear el arreglo de imágenes
    const imagenes = inmueble
        ? [
            ...(inmueble.foto_principal
                ? [inmueble.foto_principal]
                : []),
            ...(inmueble.imagenes || [])
                .map(img => img.nombre_archivo)
                .filter(nombre => nombre !== inmueble.foto_principal)
        ]
        : [];

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
                                <i className="bi bi-building-fill"></i>
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
                                    Detalle del Inmueble
                                </h1>
                                <p style={{ color: '#5A6A7A', margin: 0 }}>
                                    <i className="bi bi-info-circle me-1"></i>
                                    Información completa de la propiedad
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido Principal */}
                <div className="row">
                    <div className="col-12">
                        <div 
                            className="card border-0"
                            style={{
                                borderRadius: '20px',
                                background: '#FFFFFF',
                                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                                overflow: 'hidden'
                            }}
                        >
                            <div className="row g-0">
                                {/* Columna de Imagen */}
                                <div className="col-lg-6">
                                    <div 
                                        style={{
                                            position: 'relative',
                                            height: '100%',
                                            minHeight: '400px',
                                            maxHeight: '600px',
                                            overflow: 'hidden',
                                            background: '#F9F6F0'
                                        }}
                                    >
                                        
                                        {imagenes.length > 0 ? (
                                            <div
                                                id="carouselInmueble"
                                                className="carousel slide h-100"
                                                data-bs-ride="carousel"
                                            >
                                                <div className="carousel-inner h-100">
                                                    {imagenes.map((img, index) => (
                                                        <div
                                                            key={index}
                                                            className={`carousel-item h-100 ${index === 0 ? "active" : ""}`}
                                                        >
                                                            <img
                                                                src={`https://proyectoblockchain.onrender.com/uploads/${img}`}
                                                                className="d-block w-100 h-100"
                                                                alt={`Imagen ${index + 1}`}
                                                                style={{
                                                                    objectFit: "contain",
                                                                    background: '#F9F6F0'
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {imagenes.length > 1 && (
                                                    <>
                                                    <button
                                                        className="carousel-control-prev"
                                                        type="button"
                                                        data-bs-target="#carouselInmueble"
                                                        data-bs-slide="prev"
                                                        style={{
                                                            width: '50px',
                                                            opacity: 1
                                                        }}
                                                    >
                                                        <span 
                                                            className="carousel-control-prev-icon"
                                                            style={{
                                                                width: '44px',
                                                                height: '44px',
                                                                background: 'rgba(26, 42, 58, 0.75)',
                                                                borderRadius: '50%',
                                                                backdropFilter: 'blur(4px)',
                                                                border: '2px solid rgba(255,255,255,0.3)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundImage: 'none'
                                                            }}
                                                        >
                                                            <i className="bi bi-chevron-left" style={{ 
                                                                color: 'white', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: 'bold',
                                                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                                            }}></i>
                                                        </span>
                                                    </button>

                                                    <button
                                                        className="carousel-control-next"
                                                        type="button"
                                                        data-bs-target="#carouselInmueble"
                                                        data-bs-slide="next"
                                                        style={{
                                                            width: '50px',
                                                            opacity: 1
                                                        }}
                                                    >
                                                        <span 
                                                            className="carousel-control-next-icon"
                                                            style={{
                                                                width: '44px',
                                                                height: '44px',
                                                                background: 'rgba(26, 42, 58, 0.75)',
                                                                borderRadius: '50%',
                                                                backdropFilter: 'blur(4px)',
                                                                border: '2px solid rgba(255,255,255,0.3)',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                backgroundImage: 'none'
                                                            }}
                                                        >
                                                            <i className="bi bi-chevron-right" style={{ 
                                                                color: 'white', 
                                                                fontSize: '1.5rem',
                                                                fontWeight: 'bold',
                                                                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                                            }}></i>
                                                        </span>
                                                    </button>
                                                </>
                                            )}

                                                {/* Indicadores de posición */}
                                                {imagenes.length > 1 && (
                                                    <div className="carousel-indicators" style={{ bottom: '15px' }}>
                                                        {imagenes.map((_, index) => (
                                                            <button
                                                                key={index}
                                                                type="button"
                                                                data-bs-target="#carouselInmueble"
                                                                data-bs-slide-to={index}
                                                                className={index === 0 ? "active" : ""}
                                                                style={{
                                                                    width: '10px',
                                                                    height: '10px',
                                                                    borderRadius: '50%',
                                                                    background: index === 0 ? '#C6A15B' : 'rgba(255,255,255,0.5)',
                                                                    border: 'none',
                                                                    margin: '0 4px'
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Contador de imágenes */}
                                                {imagenes.length > 1 && (
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            bottom: '20px',
                                                            left: '50%',
                                                            transform: 'translateX(-50%)',
                                                            background: 'rgba(26, 42, 58, 0.6)',
                                                            color: '#F9F6F0',
                                                            padding: '4px 12px',
                                                            borderRadius: '20px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '500',
                                                            backdropFilter: 'blur(4px)',
                                                            pointerEvents: 'none'
                                                        }}
                                                    >
                                                        {`${imagenes.indexOf(imagenes[0]) + 1} / ${imagenes.length}`}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <img
                                                src="https://placehold.co/800x600/E5E8EC/5A6A7A?text=Sin+Imagen"
                                                alt="Sin imagen"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain",
                                                    background: '#F9F6F0'
                                                }}
                                            />
                                        )}
                                        
                                        {/* Badge de tipo de operación sobre la imagen */}
                                        <div
                                            className="position-absolute"
                                            style={{
                                                top: '20px',
                                                left: '20px',
                                                zIndex: 10
                                            }}
                                        >
                                            <span 
                                                className="px-4 py-2 rounded-pill"
                                                style={{
                                                    background: inmueble.tipo_operacion === "VENTA" 
                                                        ? 'rgba(198, 161, 91, 0.9)' 
                                                        : 'rgba(26, 42, 58, 0.85)',
                                                    color: '#F9F6F0',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    letterSpacing: '0.5px',
                                                    backdropFilter: 'blur(8px)'
                                                }}
                                            >
                                                {inmueble.tipo_operacion}
                                            </span>
                                        </div>

                                        {/* Badge de disponibilidad */}
                                        <div
                                            className="position-absolute"
                                            style={{
                                                bottom: '20px',
                                                right: '20px',
                                                zIndex: 10
                                            }}
                                        >
                                            <span 
                                                className="px-4 py-2 rounded-pill"
                                                style={{
                                                    background: inmueble.estado_disponibilidad === "DISPONIBLE"
                                                        ? 'rgba(76, 175, 80, 0.9)'
                                                        : 'rgba(244, 67, 54, 0.9)',
                                                    color: '#F9F6F0',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    backdropFilter: 'blur(8px)'
                                                }}
                                            >
                                                <i className={`bi ${inmueble.estado_disponibilidad === "DISPONIBLE" ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} me-2`}></i>
                                                {inmueble.estado_disponibilidad}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Columna de Información */}
                                <div className="col-lg-6">
                                    <div className="p-4 p-lg-5">
                                        {/* Título y Dirección */}
                                        <h2 
                                            className="fw-bold mb-2"
                                            style={{
                                                color: '#1A2A3A',
                                                fontFamily: 'Playfair Display, serif',
                                                fontSize: '2rem'
                                            }}
                                        >
                                            {inmueble.titulo}
                                        </h2>
                                        <p 
                                            className="mb-3"
                                            style={{
                                                color: '#5A6A7A',
                                                fontSize: '1rem'
                                            }}
                                        >
                                            <i className="bi bi-geo-alt me-2" style={{ color: '#C6A15B' }}></i>
                                            {inmueble.direccion}
                                        </p>

                                        {/* Precio */}
                                        <div 
                                            className="mb-4"
                                            style={{
                                                background: 'rgba(198, 161, 91, 0.08)',
                                                borderRadius: '12px',
                                                padding: '16px 20px',
                                                display: 'inline-block'
                                            }}
                                        >
                                            <h3 
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: '#1A2A3A',
                                                    fontFamily: 'Playfair Display, serif',
                                                    fontSize: '2.2rem'
                                                }}
                                            >
                                                ${formatearPrecio(inmueble.precio)}
                                            </h3>
                                        </div>

                                        <hr style={{ borderColor: '#F0F2F5' }} />

                                        {/* Descripción */}
                                        <div className="mb-4">
                                            <h5 
                                                className="fw-bold mb-2"
                                                style={{
                                                    color: '#1A2A3A',
                                                    fontFamily: 'Playfair Display, serif'
                                                }}
                                            >
                                                <i className="bi bi-file-text me-2" style={{ color: '#C6A15B' }}></i>
                                                Descripción
                                            </h5>
                                            <p style={{ color: '#5A6A7A', lineHeight: '1.8' }}>
                                                {inmueble.descripcion || 'Sin descripción disponible'}
                                            </p>
                                        </div>

                                        <hr style={{ borderColor: '#F0F2F5' }} />

                                        {/* Propietario */}
                                        <div className="mb-4">
                                            <h5 
                                                className="fw-bold mb-3"
                                                style={{
                                                    color: '#1A2A3A',
                                                    fontFamily: 'Playfair Display, serif'
                                                }}
                                            >
                                                <i className="bi bi-person-fill me-2" style={{ color: '#C6A15B' }}></i>
                                                Propietario
                                            </h5>
                                            <div 
                                                className="p-3 rounded-3"
                                                style={{
                                                    background: '#F9F6F0',
                                                    borderRadius: '12px'
                                                }}
                                            >
                                                <p className="mb-1">
                                                    <strong style={{ color: '#1A2A3A' }}>Nombre:</strong>
                                                    <span style={{ color: '#5A6A7A', marginLeft: '8px' }}>
                                                        {inmueble.propietario_nombre}
                                                    </span>
                                                </p>
                                                <p className="mb-1">
                                                    <strong style={{ color: '#1A2A3A' }}>Correo:</strong>
                                                    <span style={{ color: '#5A6A7A', marginLeft: '8px' }}>
                                                        {inmueble.propietario_correo}
                                                    </span>
                                                </p>
                                                <p className="mb-0">
                                                    <strong style={{ color: '#1A2A3A' }}>Miembro desde:</strong>
                                                    <span style={{ color: '#5A6A7A', marginLeft: '8px' }}>
                                                        {formatearFecha(inmueble.propietario_desde)}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Botón de Solicitud */}
                                        {inmueble.estado_disponibilidad === "DISPONIBLE" && (
                                            <button
                                                className="btn w-100"
                                                onClick={solicitarContrato}
                                                style={{
                                                    background: '#1A2A3A',
                                                    color: '#F9F6F0',
                                                    border: 'none',
                                                    padding: '14px',
                                                    borderRadius: '12px',
                                                    fontWeight: '600',
                                                    fontSize: '1rem',
                                                    transition: 'all 0.2s ease'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#C6A15B';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(198, 161, 91, 0.3)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#1A2A3A';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = 'none';
                                                }}
                                            >
                                                <i className="bi bi-envelope-paper me-2"></i>
                                                Solicitar {inmueble.tipo_operacion.toLowerCase()}
                                            </button>
                                        )}

                                        {inmueble.estado_disponibilidad !== "DISPONIBLE" && (
                                            <div 
                                                className="text-center p-3 rounded-3"
                                                style={{
                                                    background: 'rgba(244, 67, 54, 0.06)',
                                                    color: '#F44336',
                                                    borderRadius: '12px',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                <i className="bi bi-x-circle-fill me-2"></i>
                                                Este inmueble no está disponible actualmente
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}