import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import pagoService from "../../services/pagoService";
import contratoService from "../../services/contratoService";

export default function MisPagos() {

  const [pagos, setPagos] = useState([]);
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    cargarPagos();
    cargarContratos();
  }, []);

  const cargarPagos = async () => {
    try {
      const { data } = await pagoService.listarMisPagos();
      setPagos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los pagos.", "error");
    }
  };

  const cargarContratos = async () => {
    try {
      const { data } = await contratoService.listarMisContratos();
      setContratos(data.data.filter(contrato => contrato.estado === "ACTIVO"));
    } catch (error) {
      console.error(error);
    }
  };

  const registrarPago = async () => {
    if (contratos.length === 0) {
      Swal.fire(
        "Sin contratos",
        "No tienes contratos activos para registrar pagos.",
        "info"
      );
      return;
    }

    const opciones = contratos
      .map(c => `<option value="${c.id}">${c.titulo} - $${c.monto}</option>`)
      .join("");

    const { value: formValues } = await Swal.fire({
      title: "Registrar Pago",
      html: `
        <select id="contrato" class="swal2-input">
          ${opciones}
        </select>

        <select id="metodo" class="swal2-input">
          <option value="TRANSFERENCIA">TRANSFERENCIA</option>
          <option value="EFECTIVO">EFECTIVO</option>
          <option value="TARJETA">TARJETA</option>
        </select>

        <input
          id="referencia"
          class="swal2-input"
          placeholder="Referencia"
        />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      preConfirm: () => {
        const referencia = document.getElementById("referencia").value.trim();
        if (!referencia) {
          Swal.showValidationMessage("Ingrese una referencia.");
          return false;
        }
        return {
          contrato_id: Number(document.getElementById("contrato").value),
          metodo_pago: document.getElementById("metodo").value,
          referencia
        };
      }
    });

    if (!formValues) return;

    try {
      Swal.fire({
        title: "Registrando pago...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const contrato = contratos.find(c => c.id === formValues.contrato_id);

      const { data } = await pagoService.crearPago({
        contrato_id: contrato.id,
        monto: contrato.monto,
        metodo_pago: formValues.metodo_pago,
        referencia: formValues.referencia
      });

      await pagoService.registrarBlockchain(data.data.id);

      Swal.fire("Correcto", "Pago registrado en Blockchain.", "success");

      cargarPagos();
      cargarContratos();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No fue posible registrar el pago.",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Mis Pagos</h2>

          <div>
            <button
              className="btn btn-success"
              disabled={contratos.length === 0}
              onClick={registrarPago}
            >
              <i className="bi bi-cash-coin me-2"></i>
              Registrar Pago
            </button>
            {contratos.length === 0 && (
              <small className="text-muted ms-2">
                No existen contratos activos.
              </small>
            )}
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Inmueble</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>TX Hash</th>
                </tr>
              </thead>

              <tbody>
                {pagos.map((pago) => (
                  <tr key={pago.id}>
                    <td>#{pago.id}</td>
                    <td>{pago.titulo}</td>
                    <td>${pago.monto}</td>
                    <td>
                      <span className="badge bg-success">
                        {pago.estado}
                      </span>
                    </td>
                    <td className="small">
                      {pago.tx_hash
                        ? `${pago.tx_hash.substring(0, 12)}...`
                        : "-"}
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
