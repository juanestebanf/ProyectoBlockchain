import Navbar from "../../components/Navbar";

export default function DashboardAdmin() {

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Panel Administrativo
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-house-check text-primary"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">12</h3>

              <p className="text-muted">
                Inmuebles Validados
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-file-earmark-text text-success"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">8</h3>

              <p className="text-muted">
                Contratos Activos
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-link-45deg text-danger"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">54</h3>

              <p className="text-muted">
                Eventos Blockchain
              </p>

            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-people-fill text-warning"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">23</h3>

              <p className="text-muted">
                Usuarios Registrados
              </p>

            </div>
          </div>

        </div>

      </div>
    </>
  );
}