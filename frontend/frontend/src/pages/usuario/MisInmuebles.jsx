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
  const [fotoPrincipal, setFotoPrincipal] = useState(null);
  const [fotoEditar, setFotoEditar] = useState(null);

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
    try {
      const formData = new FormData();
      formData.append("titulo", nuevoInmueble.titulo);
      formData.append("direccion", nuevoInmueble.direccion);
      formData.append("descripcion", nuevoInmueble.descripcion);
      formData.append("precio", nuevoInmueble.precio);
      formData.append("tipo_operacion", nuevoInmueble.tipo_operacion);

      if (fotoPrincipal) {
        formData.append("foto", fotoPrincipal);
      }

      await inmuebleService.crear(formData);

      Swal.fire("Correcto", "Inmueble registrado correctamente.", "success");

      setNuevoInmueble({
        titulo: "",
        direccion: "",
        descripcion: "",
        precio: "",
        tipo_operacion: ""
      });
      setFotoPrincipal(null);
      cargarInmuebles();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible registrar el inmueble.",
        "error"
      );
    }
  };

  const eliminarInmueble = async (id) => {
    const confirmar = await Swal.fire({
      title: "¿Eliminar inmueble?",
      text: "Esta acción no podrá deshacerse.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar"
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
      title: "Editar inmueble",
      html: `
        <input id="titulo" class="swal2-input" value="${inmueble.titulo}" />

        <input id="direccion" class="swal2-input" value="${inmueble.direccion}" />

        <input id="precio" class="swal2-input" type="number" value="${inmueble.precio}" />

        <textarea id="descripcion" class="swal2-textarea">${inmueble.descripcion}</textarea>

        <select id="tipo" class="swal2-input">
          <option value="ALQUILER" ${inmueble.tipo_operacion === "ALQUILER" ? "selected" : ""}>
            ALQUILER
          </option>
          <option value="VENTA" ${inmueble.tipo_operacion === "VENTA" ? "selected" : ""}>
            VENTA
          </option>
        </select>

        <input
          id="foto"
          type="file"
          class="swal2-file"
          accept="image/*"
        />
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      preConfirm: () => {

        const formData = new FormData();

        formData.append(
            "titulo",
            document.getElementById("titulo").value
        );

        formData.append(
            "direccion",
            document.getElementById("direccion").value
        );

        formData.append(
            "precio",
            document.getElementById("precio").value
        );

        formData.append(
            "descripcion",
            document.getElementById("descripcion").value
        );

        formData.append(
            "tipo_operacion",
            document.getElementById("tipo").value
        );

        const foto = document.getElementById("foto").files[0];

        if (foto) {
            formData.append("foto", foto);
        }

        return formData;

    }
    });

    if (!formValues) return;

    try {
            await inmuebleService.actualizar(
          inmueble.id,
          formValues
      );

      Swal.fire("Correcto", "Inmueble actualizado.", "success");
      cargarInmuebles();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible actualizar.",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Mis Inmuebles</h2>

        <div className="row">
          <div className="col-lg-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Registrar Inmueble</h5>

                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control mb-2"
                    placeholder="Título"
                    value={nuevoInmueble.titulo}
                    onChange={(e) =>
                      setNuevoInmueble({ ...nuevoInmueble, titulo: e.target.value })
                    }
                  />

                  <input
                    className="form-control mb-2"
                    placeholder="Dirección"
                    value={nuevoInmueble.direccion}
                    onChange={(e) =>
                      setNuevoInmueble({ ...nuevoInmueble, direccion: e.target.value })
                    }
                  />

                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Precio"
                    value={nuevoInmueble.precio}
                    onChange={(e) =>
                      setNuevoInmueble({ ...nuevoInmueble, precio: e.target.value })
                    }
                  />

                  <select
                    className="form-select mb-2"
                    value={nuevoInmueble.tipo_operacion}
                    onChange={(e) =>
                      setNuevoInmueble({ ...nuevoInmueble, tipo_operacion: e.target.value })
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
                      setNuevoInmueble({ ...nuevoInmueble, descripcion: e.target.value })
                    }
                  />

                  <input
                    type="file"
                    className="form-control mb-2"
                    accept="image/*"
                    onChange={(e) => setFotoPrincipal(e.target.files[0])}
                  />

                  <button className="btn btn-success w-100">Registrar</button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold mb-3">Mis Propiedades</h5>

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inmuebles.map((i) => (
                      <tr key={i.id}>
                        <td>{i.titulo}</td>
                        <td>{i.tipo_operacion}</td>
                        <td>${i.precio}</td>
                        <td>
                          <span
                            className={`badge ${
                              i.estado === "PENDIENTE"
                                ? "bg-warning text-dark"
                                : "bg-success"
                            }`}
                          >
                            {i.estado}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => editarInmueble(i)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => eliminarInmueble(i.id)}
                          >
                            Eliminar
                          </button>
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
