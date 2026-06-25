import { useState } from 'react';
import Swal from 'sweetalert2';

export default function DashboardUsuario() {
  const [modo, setModo] = useState('propietario');

  const [nuevoInmueble, setNuevoInmueble] = useState({
    titulo: '',
    direccion: '',
    precio: '',
    descripcion: ''
  });

  const misPropiedades = [
    { id: 1, titulo: 'Dpto. Central', estado: 'APROBADO', hash: '0x71a...' },
    { id: 2, titulo: 'Casa Valle', estado: 'PENDIENTE', hash: 'N/A' },
  ];

  const catalogoDisponibles = [
    { id: 101, titulo: 'Suite Ejecutiva', precio: '450', ubicacion: 'Quito' },
    { id: 102, titulo: 'Local Comercial', precio: '800', ubicacion: 'Cuenca' },
  ];

  const handleRegisterProperty = (e) => {
    e.preventDefault();
    Swal.fire('Registrado', 'Inmueble enviado a validación de Notaría', 'success');
    setNuevoInmueble({ titulo: '', direccion: '', precio: '', descripcion: '' });
  };

  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-dark bg-primary shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-houses-fill me-2"></i> SmartRent
          </span>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => window.location.href = '/login'}
          >
            Salir <i className="bi bi-box-arrow-right"></i>
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <div className="btn-group shadow-sm" role="group">
              <button
                className={`btn px-4 ${modo === 'propietario' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setModo('propietario')}
                type="button"
              >
                <i className="bi bi-person-badge me-2"></i>Modo Propietario
              </button>

              <button
                className={`btn px-4 ${modo === 'inquilino' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setModo('inquilino')}
                type="button"
              >
                <i className="bi bi-search me-2"></i>Modo Inquilino
              </button>
            </div>
          </div>
        </div>

        {modo === 'propietario' ? (
          <div className="row">
            <div className="col-md-5 mb-4">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3">Registrar Inmueble</h4>
                <form onSubmit={handleRegisterProperty}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Título (Ej. Casa de campo)"
                    required
                    value={nuevoInmueble.titulo}
                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, titulo: e.target.value })}
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Dirección exacta"
                    required
                    value={nuevoInmueble.direccion}
                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, direccion: e.target.value })}
                  />
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Precio Mensual ($)"
                    required
                    value={nuevoInmueble.precio}
                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, precio: e.target.value })}
                  />
                  <textarea
                    className="form-control mb-3"
                    placeholder="Descripción corta"
                    rows="3"
                    value={nuevoInmueble.descripcion}
                    onChange={(e) => setNuevoInmueble({ ...nuevoInmueble, descripcion: e.target.value })}
                  ></textarea>
                  <button className="btn btn-success w-100 fw-bold" type="submit">
                    Publicar Inmueble
                  </button>
                </form>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card shadow-sm border-0 p-4">
                <h4 className="fw-bold mb-3">Mis Propiedades</h4>
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Inmueble</th>
                      <th>Estado</th>
                      <th>Blockchain Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {misPropiedades.map((p) => (
                      <tr key={p.id}>
                        <td>{p.titulo}</td>
                        <td>
                          <span className={`badge ${p.estado === 'APROBADO' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {p.estado}
                          </span>
                        </td>
                        <td className="text-muted small font-monospace">{p.hash}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 mb-3">
              <h4 className="fw-bold">Inmuebles Disponibles</h4>
              <p className="text-muted">Busca tu próximo hogar verificado en Blockchain</p>
            </div>

            {catalogoDisponibles.map((c) => (
              <div className="col-md-4 mb-4" key={c.id}>
                <div className="card shadow-sm border-0 h-100">
                  <div className="bg-secondary text-white text-center py-5 rounded-top">
                    <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
                  </div>
                  <div className="card-body">
                    <h5 className="fw-bold">{c.titulo}</h5>
                    <p className="text-muted mb-1">
                      <i className="bi bi-geo-alt me-1"></i>{c.ubicacion}
                    </p>
                    <h4 className="text-primary fw-bold">
                      ${c.precio}
                      <small className="text-muted" style={{ fontSize: '0.8rem' }}>/mes</small>
                    </h4>
                    <button
                      className="btn btn-primary w-100 mt-3"
                      onClick={() => Swal.fire('Solicitud Enviada', 'Se ha solicitado el Smart Contract', 'info')}
                      type="button"
                    >
                      Solicitar Alquiler
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}