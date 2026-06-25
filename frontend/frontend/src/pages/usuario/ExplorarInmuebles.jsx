import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function ExplorarInmuebles() {

  const inmuebles = [
    {
      id: 1,
      titulo: "Suite Ejecutiva",
      ubicacion: "Quito",
      precio: 450,
      tipo: "ALQUILER"
    },
    {
      id: 2,
      titulo: "Casa Moderna",
      ubicacion: "Loja",
      precio: 650,
      tipo: "ALQUILER"
    },
    {
      id: 3,
      titulo: "Terreno Comercial",
      ubicacion: "Cuenca",
      precio: 20000,
      tipo: "VENTA"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Explorar Inmuebles
        </h2>

        <div className="row">

          {inmuebles.map((item) => (

            <div
              className="col-md-4 mb-4"
              key={item.id}
            >

              <div className="card shadow-sm border-0 h-100">

                <div className="bg-secondary text-white text-center py-5">

                  <i
                    className="bi bi-house-door-fill"
                    style={{ fontSize: "2rem" }}
                  ></i>

                </div>

                <div className="card-body">

                  <h5 className="fw-bold">
                    {item.titulo}
                  </h5>

                  <p className="text-muted">
                    <i className="bi bi-geo-alt"></i>
                    {" "}
                    {item.ubicacion}
                  </p>

                  <p>
                    <span className="badge bg-primary">
                      {item.tipo}
                    </span>
                  </p>

                  <h4 className="text-success">
                    ${item.precio}
                  </h4>

                  <Link
                    to="/detalle-inmueble"
                    className="btn btn-primary w-100 mt-2"
                  >
                    Ver Detalle
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}