import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import usuarioService from "../../services/usuarioService";

export default function AdminUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {

        try {

            const { data } = await usuarioService.listar();

            setUsuarios(data.data);

        } catch (error) {

            console.error(error);

            Swal.fire(
                "Error",
                "No se pudieron cargar los usuarios.",
                "error"
            );

        }

    };

    const editarUsuario = async (usuario) => {

        const { value: formValues } = await Swal.fire({

            title: "Editar usuario",

            html: `

                <input id="nombre"
                    class="swal2-input"
                    value="${usuario.nombre}">

                <input id="correo"
                    class="swal2-input"
                    value="${usuario.correo}">

                <select id="rol"
                    class="swal2-select">

                    <option value="USUARIO"
                        ${usuario.rol === "USUARIO" ? "selected" : ""}>
                        USUARIO
                    </option>

                    <option value="ADMIN"
                        ${usuario.rol === "ADMIN" ? "selected" : ""}>
                        ADMIN
                    </option>

                </select>

            `,

            focusConfirm: false,

            preConfirm: () => ({

                nombre: document.getElementById("nombre").value,

                correo: document.getElementById("correo").value,

                rol: document.getElementById("rol").value

            })

        });

        if (!formValues) return;

        try {

            await usuarioService.actualizar(
                usuario.id,
                formValues
            );

            Swal.fire(
                "Actualizado",
                "Usuario actualizado correctamente.",
                "success"
            );

            cargarUsuarios();

        } catch (error) {

            Swal.fire(
                "Error",
                error.response?.data?.message || "Error",
                "error"
            );

        }

    };

    const eliminarUsuario = async (id) => {

        const confirmacion = await Swal.fire({

            title: "¿Eliminar usuario?",

            text: "Esta acción no se puede deshacer.",

            icon: "warning",

            showCancelButton: true

        });

        if (!confirmacion.isConfirmed) return;

        try {

            await usuarioService.eliminar(id);

            Swal.fire(
                "Eliminado",
                "Usuario eliminado.",
                "success"
            );

            cargarUsuarios();

        } catch (error) {

            Swal.fire(
                "Error",
                error.response?.data?.message || "Error",
                "error"
            );

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-4">

                <h2 className="fw-bold mb-4">
                    Administración de Usuarios
                </h2>

                <div className="card shadow-sm border-0">

                    <div className="card-body">

                        <table className="table table-hover">

                            <thead className="table-light">

                                <tr>

                                    <th>ID</th>

                                    <th>Nombre</th>

                                    <th>Correo</th>

                                    <th>Rol</th>

                                    <th>Estado</th>

                                    <th>Acciones</th>

                                </tr>

                            </thead>

                            <tbody>

                                {usuarios.map(usuario => (

                                    <tr key={usuario.id}>

                                        <td>#{usuario.id}</td>

                                        <td>{usuario.nombre}</td>

                                        <td>{usuario.correo}</td>

                                        <td>{usuario.rol}</td>

                                        <td>

                                            <span className={`badge ${usuario.estado ? "bg-success" : "bg-danger"}`}>

                                                {usuario.estado ? "Activo" : "Inactivo"}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => editarUsuario(usuario)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => eliminarUsuario(usuario.id)}
                                            >
                                                Eliminar
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