import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import inmuebleService from "../../services/inmuebleService";

export default function ExplorarInmuebles() {

  const [inmuebles, setInmuebles] = useState([]);

  useEffect(() => {

    cargarInmuebles();

  }, []);

  const cargarInmuebles = async () => {

    try {

      const { data } =
        await inmuebleService.listar();

      setInmuebles(

          data.data.filter(

              inmueble =>
                  inmueble.estado_disponibilidad === "DISPONIBLE"

          )

      );

    } catch (error) {

      console.error(error);

      Swal.fire(
        "Error",
        "No se pudieron cargar los inmuebles.",
        "error"
      );

    }

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Explorar Inmuebles
        </h2>

        <div className="row">

          {inmuebles.length === 0 ? (

            <div className="col-12">

              <div className="alert alert-info">

                No existen inmuebles disponibles.

              </div>

            </div>

          ) : (

            inmuebles.map((item) => (

              <div
                className="col-md-4 mb-4"
                key={item.id}
              >

                <div className="card shadow-sm border-0 h-100">

                  <img
                    src={
                        item.foto_principal
                            ? `http://localhost:5000/uploads/${item.foto_principal}`
                            : "https://placehold.co/600x400?text=Sin+Imagen"
                    }
                    alt={item.titulo}
                    className="card-img-top"
                    style={{
                        height: "220px",
                        objectFit: "cover"
                    }}
                />

                  <div className="card-body">

                    <h5 className="fw-bold">
                      {item.titulo}
                    </h5>

                    <p className="text-muted">

                      <i className="bi bi-geo-alt"></i>{" "}

                      {item.direccion}

                    </p>

                    <p>

                      <span className="badge bg-primary">

                        {item.tipo_operacion}

                      </span>

                    </p>

                    <h4 className="text-success">

                      ${item.precio}

                    </h4>

                    <Link
                      to={`/detalle-inmueble/${item.id}`}
                      className="btn btn-primary w-100 mt-2"
                  >
                      Ver Detalle
                  </Link>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </div>
    </>
  );

}