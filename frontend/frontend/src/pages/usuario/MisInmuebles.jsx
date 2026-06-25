import { useState } from "react";
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

  const inmuebles = [
    {
      id: 1,
      titulo: "Casa Familiar Loja",
      direccion: "Loja Centro",
      precio: 450,
      tipo: "ALQUILER",
      estado: "APROBADO",
      hash: "0x71A2B..."
    },
    {
      id: 2,
      titulo: "Terreno Catamayo",
      direccion: "Catamayo",
      precio: 15000,
      tipo: "VENTA",
      estado: "PENDIENTE",
      hash: "-"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Inmueble registrado",
      text: "Se envió para validación."
    });

    setNuevoInmueble({
      titulo: "",
      direccion: "",
      descripcion: "",
      precio: "",
      tipo_operacion: ""
    });
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Mis Inmuebles
        </h2>

        <div className="row">

          <div className="col-lg-4">

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Registrar Inmueble
                </h5>

                <form onSubmit={handleSubmit}>

                  <input
                    className="form-control mb-2"
                    placeholder="Título"
                    value={nuevoInmueble.titulo}
                    onChange={(e) =>
                      setNuevoInmueble({
                        ...nuevoInmueble,
                        titulo: e.target.value
                      })
                    }
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Dirección"
                    value={nuevoInmueble.direccion}
                    onChange={(e) =>
                      setNuevoInmueble({
                        ...nuevoInmueble,
                        direccion: e.target.value
                      })
                    }
                  />

                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Precio"
                    value={nuevoInmueble.precio}
                    onChange={(e) =>
                      setNuevoInmueble({
                        ...nuevoInmueble,
                        precio: e.target.value
                      })
                    }
                  />

                  <select
                    className="form-select mb-2"
                    value={nuevoInmueble.tipo_operacion}
                    onChange={(e) =>
                      setNuevoInmueble({
                        ...nuevoInmueble,
                        tipo_operacion: e.target.value
                      })
                    }
                  >
                    <option value="">Tipo Operación</option>
                    <option value="ALQUILER">Alquiler</option>
                    <option value="VENTA">Venta</option>
                  </select>

                  <textarea
                    className="form-control mb-2"
                    rows="3"
                    placeholder="Descripción"
                    value={nuevoInmueble.descripcion}
                    onChange={(e) =>
                      setNuevoInmueble({
                        ...nuevoInmueble,
                        descripcion: e.target.value
                      })
                    }
                  />

                  <input
                    type="file"
                    className="form-control mb-2"
                  />

                  <input
                    type="file"
                    className="form-control mb-3"
                    accept=".pdf"
                  />

                  <button
                    className="btn btn-success w-100"
                  >
                    Registrar
                  </button>

                </form>

              </div>

            </div>

          </div>

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-body">

                <h5 className="fw-bold mb-3">
                  Mis Propiedades
                </h5>

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Hash</th>
                    </tr>
                  </thead>

                  <tbody>

                    {inmuebles.map((i) => (

                      <tr key={i.id}>
                        <td>{i.titulo}</td>
                        <td>{i.tipo}</td>
                        <td>${i.precio}</td>

                        <td>
                          <span
                            className={`badge ${
                              i.estado === "APROBADO"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {i.estado}
                          </span>
                        </td>

                        <td className="small text-muted">
                          {i.hash}
                        </td>
                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}