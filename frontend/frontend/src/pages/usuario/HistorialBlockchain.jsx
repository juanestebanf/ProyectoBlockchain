import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import contratoService from "../../services/contratoService";
import blockchainService from "../../services/blockchainService";

export default function HistorialBlockchain() {

    const [contratos, setContratos] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [contratoSeleccionado, setContratoSeleccionado] = useState("");

    useEffect(() => {

        cargarContratos();

    }, []);

    const cargarContratos = async () => {

        try {

            const { data } =
                await contratoService.listarMisContratos();

            setContratos(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar los contratos.",
                "error"
            );

        }

    };

    const cargarEventos = async (idContrato) => {

        try {

            const { data } =
                await blockchainService.listarPorContrato(idContrato);

            setEventos(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudo obtener el historial Blockchain.",
                "error"
            );

        }

    };

    const seleccionarContrato = async (e) => {

        const id = e.target.value;

        setContratoSeleccionado(id);

        if (id) {

            cargarEventos(id);

        } else {

            setEventos([]);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="fw-bold mb-2">
                    Historial Blockchain
                </h2>

                <p className="text-muted">
                    Consulte los eventos registrados para uno de sus contratos.
                </p>

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

                        <label className="form-label">
                            Contrato
                        </label>

                        <select
                            className="form-select"
                            value={contratoSeleccionado}
                            onChange={seleccionarContrato}
                        >

                            <option value="">
                                Seleccione un contrato
                            </option>

                            {contratos.map((contrato) => (

                                <option
                                    key={contrato.id}
                                    value={contrato.id}
                                >
                                    #{contrato.id} - {contrato.titulo}
                                </option>

                            ))}

                        </select>

                    </div>

                </div>

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

                                {eventos.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center"
                                        >

                                            No existen eventos.

                                        </td>

                                    </tr>

                                ) : (

                                    eventos.map((evento) => (

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

                                            <td
                                                className="small text-muted font-monospace"
                                            >

                                                {evento.tx_hash}

                                            </td>

                                            <td>

                                                {new Date(
                                                    evento.fecha_evento
                                                ).toLocaleString()}

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {eventos.length > 0 && (

                    <div className="card shadow-sm border-0 mt-4">

                        <div className="card-body">

                            <h5 className="fw-bold mb-3">
                                Resumen
                            </h5>

                            <div className="row text-center">

                                <div className="col-md-4">

                                    <h3 className="text-primary">

                                        {Math.max(
                                            ...eventos.map(e => Number(e.bloque))
                                        )}

                                    </h3>

                                    <p>Último bloque</p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-success">

                                        {eventos.length}

                                    </h3>

                                    <p>Eventos registrados</p>

                                </div>

                                <div className="col-md-4">

                                    <h3 className="text-warning">

                                        {contratoSeleccionado}

                                    </h3>

                                    <p>Contrato</p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </>

    );

}