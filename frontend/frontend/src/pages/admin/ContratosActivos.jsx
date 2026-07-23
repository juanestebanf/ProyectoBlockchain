import Navbar from "../../components/Navbar";

export default function ContratosActivos() {

  const contratos = [
    {
      id: 1,
      inmueble: "Suite Ejecutiva",
      propietario: "Juan Pérez",
      cliente: "Carlos Ruiz",
      monto: 450,
      estado: "ACTIVO"
    },
    {
      id: 2,
      inmueble: "Casa Moderna",
      propietario: "María López",
      cliente: "Pedro Sánchez",
      monto: 600,
      estado: "ACTIVO"
    }
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Contratos Activos
        </h2>

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <table className="table table-hover">

              <thead className="table-light">

                <tr>
                  <th>ID</th>
                  <th>Inmueble</th>
                  <th>Propietario</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>

              </thead>

              <tbody>

                {contratos.map((contrato) => (

                  <tr key={contrato.id}>

                    <td>#{contrato.id}</td>

                    <td>{contrato.inmueble}</td>

                    <td>{contrato.propietario}</td>

                    <td>{contrato.cliente}</td>

                    <td>${contrato.monto}</td>

                    <td>
                      <span className="badge bg-success">
                        {contrato.estado}
                      </span>
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