import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import inmuebleService from "../../services/inmuebleService";
import contratoService from "../../services/contratoService";
import pagoService from "../../services/pagoService";
import api from "../../services/api";

export default function DashboardUsuario() {

  const [estadisticas, setEstadisticas] = useState({
    inmuebles: 0,
    contratos: 0,
    pagos: 0,
    eventos: 0
  });

  useEffect(() => {
    cargarDashboard();
  }, []);

  const cargarDashboard = async () => {

    try {

      const [
        inmueblesRes,
        contratosRes,
        pagosRes
      ] = await Promise.all([
        inmuebleService.listarMisInmuebles(),
        contratoService.listarMisContratos(),
        pagoService.listarMisPagos()
      ]);

      const inmuebles = inmueblesRes.data.data;

      const contratos = contratosRes.data.data;

      const pagos = pagosRes.data.data;

      const activos = contratos.filter(
        c => c.estado === "ACTIVO"
      );

      let totalEventos = 0;

      for (const contrato of contratos) {

        try {

          const { data } = await api.get(
            `/blockchain/contrato/${contrato.id}`
          );

          totalEventos += data.data.length;

        } catch (e) {
          console.error(e);
        }

      }

      setEstadisticas({

        inmuebles: inmuebles.length,

        contratos: activos.length,

        pagos: pagos.length,

        eventos: totalEventos

      });

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

      <div className="container mt-5">

        <h2 className="fw-bold mb-4">
          Dashboard SmartRent
        </h2>

        <div className="row">

          <div className="col-md-3 mb-3">
            <div className="card shadow-sm border-0 text-center p-4">

              <i
                className="bi bi-building text-primary"
                style={{ fontSize: "2rem" }}
              ></i>

              <h3 className="mt-3">
                {estadisticas.inmuebles}
              </h3>

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

              <h3 className="mt-3">
                {estadisticas.contratos}
              </h3>

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

              <h3 className="mt-3">
                {estadisticas.pagos}
              </h3>

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

              <h3 className="mt-3">
                {estadisticas.eventos}
              </h3>

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