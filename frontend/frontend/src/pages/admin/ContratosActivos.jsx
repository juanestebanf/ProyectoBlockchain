import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import contratoService from "../../services/contratoService";

export default function ContratosActivos() {

    const [contratos, setContratos] = useState([]);

    useEffect(() => {
        cargarContratos();
    }, []);

    const cargarContratos = async () => {

        try {

            const { data } =
                await contratoService.listarTodos();

            setContratos(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No fue posible cargar los contratos.",
                "error"
            );

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="fw-bold mb-4">
                    Contratos Activos
                </h2>

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <table className="table table-hover align-middle">

                            <thead className="table-light">

                                <tr>

                                    <th>ID</th>

                                    <th>Inmueble</th>

                                    <th>Propietario</th>

                                    <th>Cliente</th>

                                    <th>Monto</th>

                                    <th>Estado</th>

                                    <th>Blockchain</th>

                                </tr>

                            </thead>

                            <tbody>

                                {contratos.map((contrato) => (

                                    <tr key={contrato.id}>

                                        <td>
                                            #{contrato.id}
                                        </td>

                                        <td>
                                            {contrato.titulo}
                                        </td>

                                        <td>
                                            {contrato.propietario}
                                        </td>

                                        <td>
                                            {contrato.cliente}
                                        </td>

                                        <td>
                                            ${contrato.monto}
                                        </td>

                                        <td>

                                            <span
                                                className={`badge ${
                                                    contrato.estado === "ACTIVO"
                                                        ? "bg-success"
                                                        : contrato.estado === "FINALIZADO"
                                                        ? "bg-secondary"
                                                        : "bg-warning text-dark"
                                                }`}
                                            >
                                                {contrato.estado}
                                            </span>

                                        </td>

                                        <td>

                                            {contrato.tx_hash ? (

                                                <span className="text-success">

                                                    ✓ Registrado

                                                </span>

                                            ) : (

                                                <span className="text-muted">

                                                    Pendiente

                                                </span>

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