import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import contratoService from "../../services/contratoService";

export default function MisContratos() {

  const [contratos, setContratos] = useState([]);
  useEffect(() => {
    cargarContratos();
  }, []);

  const cargarContratos = async () => {
    try {
      const { data } = await contratoService.listarMisContratos();
      setContratos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los contratos.",
        "error"
      );
    }
  };

  const descargarPDF = async (id) => {

    try {

      const response = await contratoService.descargarPDF(id);

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `Contrato_${id}.pdf`;

      link.click();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      Swal.fire(
        "Error",
        "No se pudo descargar el PDF.",
        "error"
      );

    }

  };

const finalizarContrato = async (id) => {

  const confirmar = await Swal.fire({
    title: "¿Finalizar contrato?",
    text: "Esta acción quedará registrada en Blockchain.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, finalizar"
  });

  if (!confirmar.isConfirmed) return;

  try {

    await contratoService.finalizarContrato(id);

    Swal.fire(
      "Correcto",
      "Contrato finalizado.",
      "success"
    );

    cargarContratos();

  } catch (error) {

    Swal.fire(
      "Error",
      error.response?.data?.message || "No fue posible finalizar.",
      "error"
    );

  }

};


  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">
          Mis Contratos
        </h2>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Inmueble</th>
                  <th>Monto</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>Estado</th>
                  <th>TX Hash</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {contratos.map((contrato) => (
                  <tr key={contrato.id}>
                    <td>#{contrato.id}</td>
                    <td>{contrato.titulo}</td>
                    <td>${contrato.monto}</td>
                    <td>{contrato.inicio}</td>
                    <td>{contrato.fin}</td>
                    <td>
                      <span
                        className={`badge ${
                          contrato.estado === "ACTIVO"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {contrato.estado}
                      </span>
                    </td>
                    <td className="small text-muted">
                      {contrato.tx_hash}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => descargarPDF(contrato.id)}
                      >
                        PDF
                      </button>

                      {contrato.estado === "ACTIVO" && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => finalizarContrato(contrato.id)}
                        >
                          Finalizar
                        </button>
                      )}
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
