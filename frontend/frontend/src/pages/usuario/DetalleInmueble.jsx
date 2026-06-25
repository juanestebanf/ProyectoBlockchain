import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

export default function DetalleInmueble() {

  const solicitarContrato = () => {

    Swal.fire({
      icon: "info",
      title: "Solicitud enviada",
      text: "Se iniciará el proceso para generar el Smart Contract."
    });

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow border-0">

          <div className="row g-0">

            <div className="col-md-5">

              <div
                className="bg-secondary text-white d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <i
                  className="bi bi-image"
                  style={{ fontSize: "5rem" }}
                ></i>
              </div>

            </div>

            <div className="col-md-7">

              <div className="card-body">

                <h2 className="fw-bold">
                  Suite Ejecutiva
                </h2>

                <p className="text-muted">
                  Quito, Ecuador
                </p>

                <span className="badge bg-primary mb-3">
                  ALQUILER
                </span>

                <h3 className="text-success fw-bold">
                  $450 / mes
                </h3>

                <hr />

                <h5>Descripción</h5>

                <p>
                  Propiedad verificada y aprobada
                  para alquiler dentro de SmartRentChain.
                </p>

                <h5>Estado Blockchain</h5>

                <p className="text-success fw-bold">
                  ✓ Verificado
                </p>

                <button
                  className="btn btn-success mt-3"
                  onClick={solicitarContrato}
                >
                  Solicitar Alquiler
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}