import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function MisContratos() {

  const contratos = [
    {
      id: 1,
      inmueble: "Suite Ejecutiva",
      monto: 450,
      inicio: "2026-07-01",
      fin: "2027-07-01",
      estado: "ACTIVO",
      txHash: "0xA871B9..."
    },
    {
      id: 2,
      inmueble: "Casa Moderna",
      monto: 600,
      inicio: "2025-01-01",
      fin: "2026-01-01",
      estado: "FINALIZADO",
      txHash: "0xC441D2..."
    }
  ];

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
                </tr>
              </thead>

              <tbody>

                {contratos.map((contrato) => (

                  <tr key={contrato.id}>

                    <td>#{contrato.id}</td>

                    <td>{contrato.inmueble}</td>

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
                      {contrato.txHash}
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