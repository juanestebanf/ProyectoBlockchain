import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

export default function MisPagos() {

  const pagos = [
    {
      id: 1,
      fecha: "2026-07-01",
      monto: 450,
      estado: "CONFIRMADO",
      txHash: "0x8D1A..."
    },
    {
      id: 2,
      fecha: "2026-08-01",
      monto: 450,
      estado: "CONFIRMADO",
      txHash: "0x92FE..."
    }
  ];

  const registrarPago = () => {

    Swal.fire({
      icon: "success",
      title: "Pago registrado",
      text: "La transacción será enviada a Blockchain."
    });

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">
            Mis Pagos
          </h2>

          <button
            className="btn btn-success"
            onClick={registrarPago}
          >
            <i className="bi bi-cash-coin me-2"></i>
            Registrar Pago
          </button>

        </div>

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <table className="table table-hover align-middle">

              <thead className="table-light">

                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Estado</th>
                  <th>TX Hash</th>
                </tr>

              </thead>

              <tbody>

                {pagos.map((pago) => (

                  <tr key={pago.id}>

                    <td>#{pago.id}</td>

                    <td>{pago.fecha}</td>

                    <td>${pago.monto}</td>

                    <td>
                      <span className="badge bg-success">
                        {pago.estado}
                      </span>
                    </td>

                    <td className="small text-muted">
                      {pago.txHash}
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