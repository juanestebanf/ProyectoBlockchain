import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import dashboardService from "../../services/dashboardService";

export default function DashboardAdmin() {

  const [estadisticas, setEstadisticas] = useState({
    usuarios: 0,
    inmuebles_pendientes: 0,
    contratos_activos: 0,
    eventos_blockchain: 0,
    solicitudes_pendientes: 0
  });

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {
    try {
      const { data } = await dashboardService.obtenerEstadisticas();
      setEstadisticas(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No fue posible cargar el dashboard.",
        "error"
      );
    }
  };

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
              <i className="bi bi-house-check text-primary" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-3">{estadisticas.inmuebles_pendientes}</h3>
              <p className="text-muted">Inmuebles Validados</p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">
              <i className="bi bi-file-earmark-text text-success" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-3">{estadisticas.contratos_activos}</h3>
              <p className="text-muted">Contratos Activos</p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">
              <i className="bi bi-link-45deg text-danger" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-3">{estadisticas.eventos_blockchain}</h3>
              <p className="text-muted">Eventos Blockchain</p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">
              <i className="bi bi-people-fill text-warning" style={{ fontSize: "2rem" }}></i>
              <h3 className="mt-3">{estadisticas.usuarios}</h3>
              <p className="text-muted">Usuarios Registrados</p>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">
              <i
                className="bi bi-clock-history text-info"
                style={{ fontSize: "2rem" }}
              ></i>
              <h3 className="mt-3">
                {estadisticas.solicitudes_pendientes}
              </h3>
              <p className="text-muted">
                Solicitudes Pendientes
              </p>

            </div>
          </div>

        </div>
      </div>
    </>
  );
}
