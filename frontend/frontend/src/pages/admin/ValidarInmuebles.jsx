import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import inmuebleService from "../../services/inmuebleService";

export default function ValidarInmuebles() {

  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {
    cargarPendientes();
  }, []);

  const cargarPendientes = async () => {

    try {

      const { data } = await inmuebleService.listarPendientes();

      setInmuebles(data.data);

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "No se pudieron cargar los inmuebles.",
        "error"
      );

    }

  };

  const aprobar = async (id) => {

    const respuesta = await Swal.fire({

      title: "¿Aprobar inmueble?",

      text: "El inmueble quedará disponible para el público.",

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Sí, aprobar"

    });

    if (!respuesta.isConfirmed) return;

    try {

      await inmuebleService.aprobar(id);

      Swal.fire(
        "Correcto",
        "Inmueble aprobado.",
        "success"
      );

      cargarPendientes();

    } catch (error) {

      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo aprobar.",
        "error"
      );

    }

  };

  const rechazar = async (id) => {

    const respuesta = await Swal.fire({

      title: "¿Rechazar inmueble?",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Sí, rechazar"

    });

    if (!respuesta.isConfirmed) return;

    try {

      await inmuebleService.rechazar(id);

      Swal.fire(
        "Correcto",
        "Inmueble rechazado.",
        "success"
      );

      cargarPendientes();

    } catch (error) {

      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo rechazar.",
        "error"
      );

    }

  };

  return (

    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Validación de Inmuebles
        </h2>

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <table className="table table-hover">

              <thead className="table-light">

                <tr>

                  <th>ID</th>

                  <th>Inmueble</th>

                  <th>Propietario</th>

                  <th>Estado</th>

                  <th>Acciones</th>

                </tr>

              </thead>

              <tbody>

                {inmuebles.map((item) => (

                  <tr key={item.id}>

                    <td>#{item.id}</td>

                    <td>{item.titulo}</td>

                    <td>{item.propietario}</td>

                    <td>

                      <span className="badge bg-warning text-dark">

                        {item.estado}

                      </span>

                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => aprobar(item.id)}
                      >
                        Aprobar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rechazar(item.id)}
                      >
                        Rechazar
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </>

  );

}