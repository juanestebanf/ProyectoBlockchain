import Navbar from "../../components/Navbar";

export default function HistorialBlockchain() {

  const eventos = [
    {
      id: 1,
      evento: "Contrato Creado",
      bloque: 12,
      hash: "0xA871B9...",
      fecha: "2026-07-01 09:15"
    },
    {
      id: 2,
      evento: "Pago Registrado",
      bloque: 15,
      hash: "0x9D22FF...",
      fecha: "2026-08-01 08:00"
    },
    {
      id: 3,
      evento: "Pago Confirmado",
      bloque: 16,
      hash: "0x7A11BC...",
      fecha: "2026-08-01 08:02"
    },
    {
      id: 4,
      evento: "Contrato Finalizado",
      bloque: 20,
      hash: "0xF9DD22...",
      fecha: "2027-07-01 12:00"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-2">
          Historial Blockchain
        </h2>

        <p className="text-muted">
          Trazabilidad completa de eventos registrados en Blockchain.
        </p>

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>
                  <th>Evento</th>
                  <th>Bloque</th>
                  <th>Hash</th>
                  <th>Fecha</th>
                </tr>

              </thead>

              <tbody>

                {eventos.map((evento) => (

                  <tr key={evento.id}>

                    <td>

                      <span className="fw-semibold">
                        {evento.evento}
                      </span>

                    </td>

                    <td>

                      <span className="badge bg-primary">
                        #{evento.bloque}
                      </span>

                    </td>

                    <td className="small text-muted font-monospace">
                      {evento.hash}
                    </td>

                    <td>{evento.fecha}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="card shadow-sm border-0 mt-4">

          <div className="card-body">

            <h5 className="fw-bold mb-3">
              Resumen Blockchain
            </h5>

            <div className="row text-center">

              <div className="col-md-3">
                <h3 className="text-primary">20</h3>
                <p>Bloques</p>
              </div>

              <div className="col-md-3">
                <h3 className="text-success">4</h3>
                <p>Transacciones</p>
              </div>

              <div className="col-md-3">
                <h3 className="text-warning">1</h3>
                <p>Contrato</p>
              </div>

              <div className="col-md-3">
                <h3 className="text-danger">2</h3>
                <p>Pagos</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}