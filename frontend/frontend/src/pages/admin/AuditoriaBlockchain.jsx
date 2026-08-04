import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import blockchainService from "../../services/blockchainService";

export default function AuditoriaBlockchain() {

  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    cargarEventos();
  }, []);

  const cargarEventos = async () => {
    try {
      const { data } = await blockchainService.listarEventos();
      setEventos(data.data);
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "No se pudieron cargar los eventos.",
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2 className="fw-bold mb-4">
          Auditoría Blockchain
        </h2>

        <div className="card shadow-sm border-0">
          <div className="card-body">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Bloque</th>
                  <th>Evento</th>
                  <th>Contrato</th>
                  <th>Fecha</th>
                  <th>Hash</th>
                </tr>
              </thead>

              <tbody>
                {eventos.map(evento => (
                  <tr key={evento.id}>
                    <td>
                      <span className="badge bg-primary">
                        #{evento.bloque}
                      </span>
                    </td>
                    <td>{evento.evento}</td>
                    <td className="small">#{evento.contrato_id}</td>
                    <td>{new Date(evento.fecha_evento).toLocaleString()}</td>
                    <td
                      className="small font-monospace"
                      style={{ maxWidth: "250px" }}
                    >
                      {evento.tx_hash}
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
