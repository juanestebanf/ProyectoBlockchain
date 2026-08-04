import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import inmuebleService from "../../services/inmuebleService";
import solicitudService from "../../services/solicitudService";

export default function DetalleInmueble() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [inmueble, setInmueble] = useState(null);

    useEffect(() => {

        cargarInmueble();

    }, [id]);

    const cargarInmueble = async () => {

        try {

            const { data } =
                await inmuebleService.obtenerPorId(id);

            setInmueble(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudo cargar el inmueble.",
                "error"
            );

        }

    };

    const solicitarContrato = async () => {

        const { value: mensaje } = await Swal.fire({

            title: "Solicitud de inmueble",

            input: "textarea",

            inputLabel: "Mensaje para el propietario",

            inputPlaceholder:
                "Escriba un mensaje...",

            showCancelButton: true,

            confirmButtonText: "Enviar"

        });

        if (!mensaje) return;

        try {

            await solicitudService.crearSolicitud({

                inmueble_id: inmueble.id,

                mensaje

            });

            Swal.fire(

                "Correcto",

                "Solicitud enviada correctamente.",

                "success"

            );

            navigate("/explorar");

        } catch (error) {

            Swal.fire(

                "Error",

                error.response?.data?.message ||

                "No fue posible enviar la solicitud.",

                "error"

            );

        }

    };

    if (!inmueble) {

        return (
            <>
                <Navbar />
                <div className="container mt-5">
                    Cargando...
                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <div className="card shadow border-0">

                    <div className="row g-0">

                        <div className="col-md-5">

                            <img
                                src={
                                    inmueble.foto_principal
                                        ? `http://localhost:5000/uploads/${inmueble.foto_principal}`
                                        : "https://placehold.co/800x600?text=Sin+Imagen"
                                }
                                alt={inmueble.titulo}
                                className="img-fluid h-100 w-100"
                                style={{
                                    objectFit: "cover",
                                    minHeight: "450px"
                                }}
                            />

                        </div>

                        <div className="col-md-7">

                            <div className="card-body">

                                <h2 className="fw-bold">
                                    {inmueble.titulo}
                                </h2>

                                <p className="text-muted">
                                    {inmueble.direccion}
                                </p>

                                <span className="badge bg-primary mb-3">
                                    {inmueble.tipo_operacion}
                                </span>

                                <h3 className="text-success fw-bold">
                                    ${inmueble.precio}
                                </h3>

                                <hr />

                                <h5>Descripción</h5>

                                <p>
                                    {inmueble.descripcion}
                                </p>

                                <h5>Disponibilidad</h5>

                                <p
                                    className={
                                        inmueble.estado_disponibilidad === "DISPONIBLE"
                                            ? "text-success fw-bold"
                                            : "text-danger fw-bold"
                                    }
                                >
                                    {inmueble.estado_disponibilidad}
                                </p>

                                {inmueble.estado_disponibilidad === "DISPONIBLE" && (

                                    <button
                                        className="btn btn-success mt-3"
                                        onClick={solicitarContrato}
                                    >
                                        Solicitar {inmueble.tipo_operacion.toLowerCase()}
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}