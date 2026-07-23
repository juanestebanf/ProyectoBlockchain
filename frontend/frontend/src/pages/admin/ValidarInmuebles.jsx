import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";

export default function ValidarInmuebles() {

  const inmuebles = [
    {
      id: 1,
      titulo: "Casa Familiar Loja",
      propietario: "Juan Pérez",
      estado: "PENDIENTE"
    },
    {
      id: 2,
      titulo: "Terreno Comercial",
      propietario: "María López",
      estado: "PENDIENTE"
    }
  ];

  const aprobar = () => {

    Swal.fire({
      icon: "success",
      title: "Inmueble aprobado"
    });

  };

  const rechazar = () => {

    Swal.fire({
      icon: "error",
      title: "Inmueble rechazado"
    });

  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="fw-bold mb-4">
          Validación de Inmuebles
        </h2>

        <div className="card shadow-sm border-0">

          <div className="card-body">

            <table className="table table-hover">

              <thead className="table-light">

                <tr>
                  <th>ID</th>
                  <th>Inmueble</th>
                  <th>Propietario</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>

              </thead>

              <tbody>

                {inmuebles.map((item) => (

                  <tr key={item.id}>

                    <td>#{item.id}</td>

                    <td>{item.titulo}</td>

                    <td>{item.propietario}</td>

                    <td>
                      <span className="badge bg-warning text-dark">
                        {item.estado}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={aprobar}
                      >
                        Aprobar
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={rechazar}
                      >
                        Rechazar
                      </button>

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