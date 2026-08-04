import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2";
import solicitudService from "../../services/solicitudService";

export default function AdminSolicitudes() {

    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        try {

            const { data } = await solicitudService.listarRecibidas();

            setSolicitudes(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar las solicitudes.",
                "error"
            );

        }
    };

    const aprobar = async (id) => {

        const confirmacion = await Swal.fire({
            title: "¿Aceptar solicitud?",
            text: "Se generará automáticamente el contrato.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Aceptar"
        });

        if (!confirmacion.isConfirmed) return;

        try {

            await solicitudService.aceptarSolicitud(id);

            Swal.fire(
                "Correcto",
                "Solicitud aceptada.",
                "success"
            );

            cargarSolicitudes();

        } catch (error) {

            Swal.fire(
                "Error",
                error.response?.data?.message || "No se pudo aceptar.",
                "error"
            );

        }

    };

    const rechazar = async (id) => {

        const confirmacion = await Swal.fire({
            title: "¿Rechazar solicitud?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Rechazar"
        });

        if (!confirmacion.isConfirmed) return;

        try {

            await solicitudService.rechazarSolicitud(id);

            Swal.fire(
                "Correcto",
                "Solicitud rechazada.",
                "success"
            );

            cargarSolicitudes();

        } catch (error) {

            Swal.fire(
                "Error",
                error.response?.data?.message || "No se pudo rechazar.",
                "error"
            );

        }

    };

    return (
        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="fw-bold mb-4">
                    Solicitudes Recibidas
                </h2>

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <table className="table table-hover">

                            <thead className="table-light">

                                <tr>
                                    <th>ID</th>
                                    <th>Cliente</th>
                                    <th>Inmueble</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>

                            </thead>

                            <tbody>

                                {solicitudes.map((s) => (

                                    <tr key={s.id}>

                                        <td>#{s.id}</td>

                                        <td>{s.cliente}</td>

                                        <td>{s.titulo}</td>

                                        <td>

                                            <span className="badge bg-warning text-dark">

                                                {s.estado}

                                            </span>

                                        </td>

                                        <td>

                                            {s.estado === "PENDIENTE" && (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => aprobar(s.id)}
                                                    >
                                                        Aprobar
                                                    </button>

                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => rechazar(s.id)}
                                                    >
                                                        Rechazar
                                                    </button>
                                                </>
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