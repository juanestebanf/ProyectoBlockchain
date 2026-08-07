import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import inmuebleService from "../../services/inmuebleService";

export default function ExplorarInmuebles() {
  const [inmuebles, setInmuebles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState("todos");

  useEffect(() => {
    cargarInmuebles();
  }, []);

  const cargarInmuebles = async () => {
    try {
      setCargando(true);
      const { data } = await inmuebleService.listar();
      const disponibles = data.data.filter(
        inmueble => inmueble.estado_disponibilidad === "DISPONIBLE"
      );
      setInmuebles(disponibles);
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

  // Obtener tipos de operación únicos para el filtro
  const tiposOperacion = ["todos", ...new Set(inmuebles.map(item => item.tipo_operacion))];

  const inmueblesFiltrados = filtroTipo === "todos"
    ? inmuebles
    : inmuebles.filter(item => item.tipo_operacion === filtroTipo);

  // Formatear precio
  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES').format(precio);
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
                <i className="bi bi-compass-fill"></i>
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
                  Explorar Inmuebles
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-building me-1"></i>
                  Encuentra tu propiedad ideal entre nuestra selección
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros y contador */}
        <div className="row align-items-center mb-4">
          <div className="col-md-6">
            <h2 
              className="fw-bold"
              style={{
                color: '#1A2A3A',
                fontFamily: 'Playfair Display, serif',
                fontSize: '1.4rem',
                position: 'relative',
                paddingBottom: '8px',
                marginBottom: '4px'
              }}
            >
              Propiedades Disponibles
            </h2>
            <p style={{ color: '#5A6A7A', margin: 0 }}>
              <span className="fw-bold" style={{ color: '#1A2A3A' }}>
                {inmueblesFiltrados.length}
              </span> propiedades encontradas
            </p>
          </div>
          <div className="col-md-6">
            {tiposOperacion.length > 1 && (
              <div className="d-flex gap-2 flex-wrap justify-content-md-end">
                {tiposOperacion.map(tipo => (
                  <button
                    key={tipo}
                    className="btn rounded-pill px-4 py-2"
                    onClick={() => setFiltroTipo(tipo)}
                    style={{
                      background: filtroTipo === tipo 
                        ? '#1A2A3A' 
                        : 'transparent',
                      color: filtroTipo === tipo 
                        ? '#F9F6F0' 
                        : '#5A6A7A',
                      border: filtroTipo === tipo 
                        ? '1px solid #1A2A3A' 
                        : '1px solid #E5E8EC',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      textTransform: 'capitalize'
                    }}
                    onMouseEnter={(e) => {
                      if (filtroTipo !== tipo) {
                        e.currentTarget.style.borderColor = '#1A2A3A';
                        e.currentTarget.style.color = '#1A2A3A';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (filtroTipo !== tipo) {
                        e.currentTarget.style.borderColor = '#E5E8EC';
                        e.currentTarget.style.color = '#5A6A7A';
                      }
                    }}
                  >
                    {tipo === "todos" ? "Todos" : tipo}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Grid de inmuebles */}
        {cargando ? (
          <div className="row g-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="col-md-4 col-sm-6" key={item}>
                <div 
                  className="card border-0"
                  style={{
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                    overflow: 'hidden',
                    height: '380px'
                  }}
                >
                  <div 
                    style={{
                      height: '220px',
                      background: 'linear-gradient(135deg, #E5E8EC 25%, #F9F6F0 50%, #E5E8EC 75%)',
                      backgroundSize: '200% 200%',
                      animation: 'loading 1.5s ease-in-out infinite'
                    }}
                  />
                  <div className="p-4">
                    <div 
                      style={{
                        height: '20px',
                        width: '70%',
                        background: '#E5E8EC',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        animation: 'loading 1.5s ease-in-out infinite'
                      }}
                    />
                    <div 
                      style={{
                        height: '16px',
                        width: '50%',
                        background: '#E5E8EC',
                        borderRadius: '4px',
                        marginBottom: '8px',
                        animation: 'loading 1.5s ease-in-out infinite 0.1s'
                      }}
                    />
                    <div 
                      style={{
                        height: '24px',
                        width: '40%',
                        background: '#E5E8EC',
                        borderRadius: '4px',
                        animation: 'loading 1.5s ease-in-out infinite 0.2s'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : inmueblesFiltrados.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div 
                className="text-center py-5"
                style={{
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                  padding: '60px 20px'
                }}
              >
                <i 
                  className="bi bi-building-fill" 
                  style={{ 
                    fontSize: '3rem', 
                    color: '#C6A15B',
                    opacity: '0.3'
                  }}
                />
                <h4 
                  className="mt-3"
                  style={{ color: '#1A2A3A' }}
                >
                  No hay propiedades disponibles
                </h4>
                <p style={{ color: '#5A6A7A' }}>
                  {filtroTipo !== "todos" 
                    ? `No encontramos propiedades en "${filtroTipo}"` 
                    : 'Pronto tendremos nuevas propiedades para ti'}
                </p>
                {filtroTipo !== "todos" && (
                  <button
                    className="btn rounded-pill px-4"
                    onClick={() => setFiltroTipo("todos")}
                    style={{
                      background: '#1A2A3A',
                      color: '#F9F6F0',
                      border: 'none',
                      padding: '10px 30px',
                      fontWeight: '500'
                    }}
                  >
                    Ver todas
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {inmueblesFiltrados.map((item) => (
              <div className="col-md-4 col-sm-6" key={item.id}>
                <div 
                  className="card border-0 h-100"
                  style={{
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(26, 42, 58, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(26, 42, 58, 0.06)';
                  }}
                >
                  {/* Imagen */}
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={
                        item.foto_principal
                          ? `http://localhost:5000/uploads/${item.foto_principal}`
                          : "https://placehold.co/600x400/E5E8EC/5A6A7A?text=Sin+Imagen"
                      }
                      alt={item.titulo}
                      style={{
                        height: '240px',
                        width: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    
                    {/* Badge de tipo de operación */}
                    <div
                      className="position-absolute"
                      style={{
                        top: '16px',
                        left: '16px'
                      }}
                    >
                      <span 
                        className="px-3 py-1 rounded-pill"
                        style={{
                          background: item.tipo_operacion === "VENTA" 
                            ? 'rgba(198, 161, 91, 0.9)' 
                            : 'rgba(26, 42, 58, 0.85)',
                          color: '#F9F6F0',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          letterSpacing: '0.5px',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        {item.tipo_operacion}
                      </span>
                    </div>

                    {/* Badge de estado */}
                    <div
                      className="position-absolute"
                      style={{
                        bottom: '16px',
                        right: '16px'
                      }}
                    >
                      <span 
                        className="px-3 py-1 rounded-pill"
                        style={{
                          background: 'rgba(0, 0, 0, 0.6)',
                          color: '#F9F6F0',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <i className="bi bi-check-circle-fill me-1" style={{ color: '#4CAF50' }}></i>
                        Disponible
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="card-body p-4">
                    <h5 
                      className="fw-bold mb-2"
                      style={{
                        color: '#1A2A3A',
                        fontSize: '1.1rem',
                        fontFamily: 'Playfair Display, serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {item.titulo}
                    </h5>

                    <p 
                      className="mb-2"
                      style={{
                        color: '#5A6A7A',
                        fontSize: '0.9rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      <i className="bi bi-geo-alt me-1" style={{ color: '#C6A15B' }}></i>
                      {item.direccion}
                    </p>

                    <div className="d-flex gap-3 mb-3">
                      {item.habitaciones && (
                        <span style={{ fontSize: '0.85rem', color: '#5A6A7A' }}>
                          <i className="bi bi-door-open me-1"></i>
                          {item.habitaciones} hab
                        </span>
                      )}
                      {item.banos && (
                        <span style={{ fontSize: '0.85rem', color: '#5A6A7A' }}>
                          <i className="bi bi-droplet me-1"></i>
                          {item.banos} baños
                        </span>
                      )}
                      {item.area && (
                        <span style={{ fontSize: '0.85rem', color: '#5A6A7A' }}>
                          <i className="bi bi-aspect-ratio me-1"></i>
                          {item.area} m²
                        </span>
                      )}
                    </div>

                    <h4 
                      className="fw-bold mb-3"
                      style={{
                        color: '#1A2A3A',
                        fontFamily: 'Playfair Display, serif'
                      }}
                    >
                      ${formatearPrecio(item.precio)}
                    </h4>

                    <Link
                      to={`/detalle-inmueble/${item.id}`}
                      className="btn w-100"
                      style={{
                        background: '#1A2A3A',
                        color: '#F9F6F0',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#C6A15B';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#1A2A3A';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <i className="bi bi-eye me-2"></i>
                      Ver Detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animación de loading */}
      <style jsx>{`
        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}