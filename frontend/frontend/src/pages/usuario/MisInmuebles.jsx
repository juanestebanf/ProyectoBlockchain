import { useEffect, useState } from "react";
import inmuebleService from "../../services/inmuebleService";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar";

export default function MisInmuebles() {
  const [nuevoInmueble, setNuevoInmueble] = useState({
    titulo: "",
    direccion: "",
    descripcion: "",
    precio: "",
    tipo_operacion: ""
  });

  const [inmuebles, setInmuebles] = useState([]);
  const [imagenes, setImagenes] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarInmuebles();
  }, []);

  const cargarInmuebles = async () => {
    try {
      const { data } = await inmuebleService.listarMisInmuebles();
      setInmuebles(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los inmuebles.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoInmueble.titulo || !nuevoInmueble.precio || !nuevoInmueble.tipo_operacion) {
      Swal.fire("Campos incompletos", "Completa los campos obligatorios.", "warning");
      return;
    }

    try {
      setCargando(true);
      const formData = new FormData();
      formData.append("titulo", nuevoInmueble.titulo);
      formData.append("direccion", nuevoInmueble.direccion);
      formData.append("descripcion", nuevoInmueble.descripcion);
      formData.append("precio", nuevoInmueble.precio);
      formData.append("tipo_operacion", nuevoInmueble.tipo_operacion);

      imagenes.forEach((imagen) => {
          formData.append("imagenes", imagen);
      });

      await inmuebleService.crear(formData);

      Swal.fire("Correcto", "Inmueble registrado correctamente.", "success");

      setNuevoInmueble({
        titulo: "",
        direccion: "",
        descripcion: "",
        precio: "",
        tipo_operacion: ""
      });
      setImagenes([]);
      cargarInmuebles();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible registrar el inmueble.",
        "error"
      );
    } finally {
      setCargando(false);
    }
  };

  const eliminarInmueble = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar inmueble?",
      text: "Esta acción no podrá deshacerse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1A2A3A"
    });

    if (!confirmar.isConfirmed) return;

    try {
      await inmuebleService.eliminar(id);
      Swal.fire("Correcto", "Inmueble eliminado.", "success");
      cargarInmuebles();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible eliminar.",
        "error"
      );
    }
  };

  const editarInmueble = async (inmueble) => {
  const { value: formValues } = await Swal.fire({
    title: 'Editar Inmueble',
    width: 550,
    html: `
      <div style="text-align: left; padding: 4px 0;">
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-tag" style="color: #C6A15B; margin-right: 6px;"></i>
            Título
          </label>
          <input 
            id="titulo" 
            class="swal2-input" 
            value="${inmueble.titulo}" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
          />
        </div>
        
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-geo-alt" style="color: #C6A15B; margin-right: 6px;"></i>
            Dirección
          </label>
          <input 
            id="direccion" 
            class="swal2-input" 
            value="${inmueble.direccion || ''}" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
          />
        </div>
        
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-cash" style="color: #C6A15B; margin-right: 6px;"></i>
            Precio
          </label>
          <input 
            id="precio" 
            type="number" 
            class="swal2-input" 
            value="${inmueble.precio}" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
          />
        </div>
        
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-briefcase" style="color: #C6A15B; margin-right: 6px;"></i>
            Tipo
          </label>
          <select 
            id="tipo" 
            class="swal2-input" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
          >
            <option value="ALQUILER" ${inmueble.tipo_operacion === "ALQUILER" ? "selected" : ""}>
              ALQUILER
            </option>
            <option value="VENTA" ${inmueble.tipo_operacion === "VENTA" ? "selected" : ""}>
              VENTA
            </option>
          </select>
        </div>
        
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-file-text" style="color: #C6A15B; margin-right: 6px;"></i>
            Descripción
          </label>
          <textarea 
            id="descripcion" 
            class="swal2-textarea" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; resize: vertical; min-height: 80px; font-size: 0.95rem; font-family: inherit;"
          >${inmueble.descripcion || ''}</textarea>
        </div>
        
        <div>
          <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
            <i class="bi bi-image" style="color: #C6A15B; margin-right: 6px;"></i>
            Foto Principal
          </label>
          <input 
            id="foto" 
            type="file" 
            class="swal2-file" 
            accept="image/*" 
            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 8px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.9rem;"
          />
          <small style="color: #5A6A7A; display: block; margin-top: 5px; font-size: 0.75rem;">
            <i class="bi bi-info-circle" style="color: #C6A15B;"></i>
            Solo si deseas cambiar la imagen
          </small>
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar Cambios',
    confirmButtonColor: '#C6A15B',
    cancelButtonColor: '#1A2A3A',
    background: '#FFFFFF',
    preConfirm: () => {
      const titulo = document.getElementById("titulo").value.trim();
      const precio = document.getElementById("precio").value.trim();
      
      if (!titulo || !precio) {
        Swal.showValidationMessage('Título y precio son obligatorios');
        return false;
      }
      
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("direccion", document.getElementById("direccion").value);
      formData.append("precio", precio);
      formData.append("descripcion", document.getElementById("descripcion").value);
      formData.append("tipo_operacion", document.getElementById("tipo").value);
      const foto = document.getElementById("foto").files[0];
      if (foto) formData.append("foto", foto);
      return formData;
    }
  });

  if (!formValues) return;

  try {
    await inmuebleService.actualizar(inmueble.id, formValues);
    Swal.fire({
      icon: 'success',
      title: '¡Actualizado!',
      text: 'Inmueble actualizado correctamente.',
      confirmButtonColor: '#C6A15B'
    });
    cargarInmuebles();
  } catch (error) {
    Swal.fire(
      "Error",
      error.response?.data?.message || "No fue posible actualizar.",
      "error"
    );
  }
};

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
                  Mis Inmuebles
                </h1>
                <p style={{ color: '#5A6A7A', margin: 0 }}>
                  <i className="bi bi-grid-3x3-gap-fill me-1"></i>
                  Administra tus propiedades registradas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/* Formulario - Sidebar izquierdo */}
          <div className="col-lg-4">
            <div 
              className="card border-0 h-100"
              style={{
                borderRadius: '16px',
                background: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)'
              }}
            >
              <div className="card-body p-4">
                <h5 
                  className="fw-bold mb-3 d-flex align-items-center gap-2"
                  style={{
                    color: '#1A2A3A',
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.2rem'
                  }}
                >
                  <span style={{ color: '#C6A15B' }}>✦</span>
                  Registrar Inmueble
                </h5>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                      Título <span style={{ color: '#C6A15B' }}>*</span>
                    </label>
                    <input
                      className="form-control"
                      placeholder="Ej: Casa en la montaña"
                      value={nuevoInmueble.titulo}
                      onChange={(e) =>
                        setNuevoInmueble({ ...nuevoInmueble, titulo: e.target.value })
                      }
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E8EC',
                        padding: '10px 14px',
                        background: '#F9F6F0',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C6A15B';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E8EC';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                      Dirección
                    </label>
                    <input
                      className="form-control"
                      placeholder="Ej: Calle Principal #123"
                      value={nuevoInmueble.direccion}
                      onChange={(e) =>
                        setNuevoInmueble({ ...nuevoInmueble, direccion: e.target.value })
                      }
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E8EC',
                        padding: '10px 14px',
                        background: '#F9F6F0',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C6A15B';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E8EC';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                        Precio <span style={{ color: '#C6A15B' }}>*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="0"
                        value={nuevoInmueble.precio}
                        onChange={(e) =>
                          setNuevoInmueble({ ...nuevoInmueble, precio: e.target.value })
                        }
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #E5E8EC',
                          padding: '10px 14px',
                          background: '#F9F6F0',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#C6A15B';
                          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E5E8EC';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                        Tipo <span style={{ color: '#C6A15B' }}>*</span>
                      </label>
                      <select
                        className="form-select"
                        value={nuevoInmueble.tipo_operacion}
                        onChange={(e) =>
                          setNuevoInmueble({ ...nuevoInmueble, tipo_operacion: e.target.value })
                        }
                        style={{
                          borderRadius: '10px',
                          border: '1px solid #E5E8EC',
                          padding: '10px 14px',
                          background: '#F9F6F0',
                          transition: 'all 0.2s ease'
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
                        <option value="">Tipo</option>
                        <option value="ALQUILER">Alquiler</option>
                        <option value="VENTA">Venta</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                      Descripción
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Describe las características de tu inmueble..."
                      value={nuevoInmueble.descripcion}
                      onChange={(e) =>
                        setNuevoInmueble({ ...nuevoInmueble, descripcion: e.target.value })
                      }
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E8EC',
                        padding: '10px 14px',
                        background: '#F9F6F0',
                        resize: 'vertical',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C6A15B';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 161, 91, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E8EC';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold" style={{ fontSize: '0.85rem', color: '#1A2A3A' }}>
                      Galería de imágenes
                    </label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => setImagenes(Array.from(e.target.files))}
                      style={{
                        borderRadius: '10px',
                        border: '1px solid #E5E8EC',
                        padding: '8px 14px',
                        background: '#F9F6F0',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#C6A15B';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E5E8EC';
                      }}
                    />
                    {imagenes.length > 0 && (
                      <div
                        style={{
                          marginTop: "10px",
                          background: "#F9F6F0",
                          borderRadius: "10px",
                          padding: "10px"
                        }}
                      >
                        <small
                          className="fw-semibold"
                          style={{
                            color: "#1A2A3A",
                            display: "block",
                            marginBottom: "8px"
                          }}
                        >
                          Imágenes seleccionadas ({imagenes.length})
                        </small>

                        {imagenes.map((imagen, index) => (
                          <div
                            key={index}
                            style={{
                              fontSize: "0.85rem",
                              color: "#5A6A7A",
                              marginBottom: "4px"
                            }}
                          >
                            <i
                              className="bi bi-image-fill me-2"
                              style={{ color: "#C6A15B" }}
                            ></i>

                            {imagen.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn w-100"
                    disabled={cargando}
                    style={{
                      background: '#1A2A3A',
                      color: '#F9F6F0',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '10px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (!cargando) {
                        e.currentTarget.style.background = '#C6A15B';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!cargando) {
                        e.currentTarget.style.background = '#1A2A3A';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <i className={`bi ${cargando ? 'bi-hourglass-split' : 'bi-plus-circle'} me-2`}></i>
                    {cargando ? 'Registrando...' : 'Registrar Inmueble'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Tabla de inmuebles */}
          <div className="col-lg-8">
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
                  Mis Propiedades
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
                  {inmuebles.length} propiedades
                </span>
              </div>

              <div className="table-responsive">
                {inmuebles.length === 0 ? (
                  <div className="p-5 text-center">
                    <i 
                      className="bi bi-building-fill" 
                      style={{ 
                        fontSize: '3rem', 
                        color: '#C6A15B',
                        opacity: '0.3'
                      }}
                    />
                    <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                      No tienes propiedades registradas
                    </h5>
                    <p style={{ color: '#5A6A7A' }}>
                      Comienza registrando tu primer inmueble en el panel izquierdo
                    </p>
                  </div>
                ) : (
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ background: '#F9F6F0' }}>
                      <tr>
                        <th style={{ padding: '14px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Título
                        </th>
                        <th style={{ padding: '14px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Tipo
                        </th>
                        <th style={{ padding: '14px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Precio
                        </th>
                        <th style={{ padding: '14px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                          Estado
                        </th>
                        <th style={{ padding: '14px 20px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem', textAlign: 'center' }}>
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
                          <td style={{ padding: '14px 20px' }}>
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-semibold" style={{ color: '#1A2A3A' }}>
                                {item.titulo}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
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
                          <td style={{ padding: '14px 20px' }}>
                            <span className="fw-bold" style={{ color: '#1A2A3A' }}>
                              ${formatearPrecio(item.precio)}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <span 
                              className={`px-3 py-1 rounded-pill ${
                                item.estado === "PENDIENTE"
                                  ? "bg-warning bg-opacity-10 text-warning"
                                  : "bg-success bg-opacity-10 text-success"
                              }`}
                              style={{
                                fontSize: '0.75rem',
                                fontWeight: '600'
                              }}
                            >
                              {item.estado}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px' }}>
                            <div className="d-flex gap-2 justify-content-center">
                              <button
                                className="btn btn-sm"
                                onClick={() => editarInmueble(item)}
                                style={{
                                  background: 'rgba(26, 42, 58, 0.06)',
                                  color: '#1A2A3A',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(198, 161, 91, 0.15)';
                                  e.currentTarget.style.color = '#C6A15B';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(26, 42, 58, 0.06)';
                                  e.currentTarget.style.color = '#1A2A3A';
                                }}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm"
                                onClick={() => eliminarInmueble(item.id)}
                                style={{
                                  background: 'rgba(244, 67, 54, 0.06)',
                                  color: '#F44336',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '8px',
                                  transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(244, 67, 54, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'rgba(244, 67, 54, 0.06)';
                                }}
                              >
                                <i className="bi bi-trash"></i>
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