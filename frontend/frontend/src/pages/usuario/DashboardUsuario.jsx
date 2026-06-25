import Navbar from "../../components/Navbar";

export default function DashboardUsuario() {

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <h2 className="fw-bold mb-4">
          Dashboard SmartRentChain
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-building text-primary"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">3</h3>

              <p className="text-muted">
                Mis Inmuebles
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-file-earmark-text text-success"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">2</h3>

              <p className="text-muted">
                Contratos Activos
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-cash-coin text-warning"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">8</h3>

              <p className="text-muted">
                Pagos Registrados
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-link-45deg text-danger"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">12</h3>

              <p className="text-muted">
                Eventos Blockchain
              </p>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}