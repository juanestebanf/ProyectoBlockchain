import Navbar from "../../components/Navbar";

export default function AuditoriaBlockchain() {

  const eventos = [
    {
      id: 1,
      bloque: 12,
      evento: "Contrato Creado",
      hash: "0xA871B9..."
    },
    {
      id: 2,
      bloque: 15,
      evento: "Pago Registrado",
      hash: "0xD221AF..."
    },
    {
      id: 3,
      bloque: 18,
      evento: "Incumplimiento",
      hash: "0xB771CE..."
    },
    {
      id: 4,
      bloque: 20,
      evento: "Contrato Finalizado",
      hash: "0xF9DD22..."
    }
  ];

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
                  <th>Hash</th>
                </tr>

              </thead>

              <tbody>

                {eventos.map((evento) => (

                  <tr key={evento.id}>

                    <td>
                      <span className="badge bg-primary">
                        #{evento.bloque}
                      </span>
                    </td>

                    <td>{evento.evento}</td>

                    <td className="small font-monospace">
                      {evento.hash}
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