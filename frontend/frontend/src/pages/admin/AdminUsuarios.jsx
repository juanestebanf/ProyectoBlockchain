import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import usuarioService from "../../services/usuarioService";

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            setCargando(true);
            const { data } = await usuarioService.listar();
            setUsuarios(data.data);
        } catch (error) {
            console.error(error);
            Swal.fire(
                "Error",
                "No se pudieron cargar los usuarios.",
                "error"
            );
        } finally {
            setCargando(false);
        }
    };

    const editarUsuario = async (usuario) => {
        const { value: formValues } = await Swal.fire({
            title: "Editar Usuario",
            width: 500,
            html: `
                <div style="text-align: left; padding: 4px 0;">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
                            <i class="bi bi-person" style="color: #C6A15B; margin-right: 6px;"></i>
                            Nombre
                        </label>
                        <input 
                            id="nombre" 
                            class="swal2-input" 
                            value="${usuario.nombre}" 
                            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
                        />
                    </div>

                    <div style="margin-bottom: 16px;">
                        <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
                            <i class="bi bi-envelope" style="color: #C6A15B; margin-right: 6px;"></i>
                            Correo
                        </label>
                        <input 
                            id="correo" 
                            class="swal2-input" 
                            value="${usuario.correo}" 
                            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
                        />
                    </div>

                    <div style="margin-bottom: 4px;">
                        <label style="display: block; font-weight: 600; color: #1A2A3A; font-size: 0.85rem; margin-bottom: 5px;">
                            <i class="bi bi-briefcase" style="color: #C6A15B; margin-right: 6px;"></i>
                            Rol
                        </label>
                        <select 
                            id="rol" 
                            class="swal2-input" 
                            style="border-radius: 10px; border: 1px solid #E5E8EC; padding: 10px 14px; background: #F9F6F0; width: 100%; box-sizing: border-box; font-size: 0.95rem;"
                        >
                            <option value="USUARIO" ${usuario.rol === "USUARIO" ? "selected" : ""}>
                                USUARIO
                            </option>
                            <option value="ADMIN" ${usuario.rol === "ADMIN" ? "selected" : ""}>
                                ADMIN
                            </option>
                        </select>
                        <small style="color: #5A6A7A; display: block; margin-top: 4px; font-size: 0.75rem;">
                            <i class="bi bi-info-circle" style="color: #C6A15B;"></i>
                            Los usuarios con rol ADMIN tienen acceso al panel administrativo
                        </small>
                    </div>
                </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: "Guardar Cambios",
            confirmButtonColor: "#C6A15B",
            cancelButtonColor: "#1A2A3A",
            background: "#FFFFFF",
            preConfirm: () => {
                const nombre = document.getElementById("nombre").value.trim();
                const correo = document.getElementById("correo").value.trim();
                const rol = document.getElementById("rol").value;
                
                if (!nombre || !correo) {
                    Swal.showValidationMessage("Nombre y correo son obligatorios");
                    return false;
                }
                
                return { nombre, correo, rol };
            }
        });

        if (!formValues) return;

        try {
            await usuarioService.actualizar(
                usuario.id,
                formValues
            );

            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'Usuario actualizado correctamente.',
                confirmButtonColor: '#C6A15B'
            });

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
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            confirmButtonColor: "#F44336",
            cancelButtonColor: "#1A2A3A"
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

    const obtenerRolBadge = (rol) => {
        const roles = {
            'ADMIN': { color: '#C6A15B', bg: 'rgba(198, 161, 91, 0.12)' },
            'USUARIO': { color: '#1A2A3A', bg: 'rgba(26, 42, 58, 0.06)' }
        };
        return roles[rol] || { color: '#5A6A7A', bg: 'rgba(90, 106, 122, 0.06)' };
    };

    return (
        <>
            <Navbar />

            <div className="container py-4">
                {/* Header */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex align-items-center gap-3 flex-wrap">
                            <div 
                                className="d-flex align-items-center justify-content-center rounded-3"
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    background: 'rgba(198, 161, 91, 0.12)',
                                    color: '#C6A15B',
                                    fontSize: '1.8rem'
                                }}
                            >
                                <i className="bi bi-people-fill"></i>
                            </div>
                            <div>
                                <h1 
                                    className="fw-bold mb-1"
                                    style={{
                                        color: '#1A2A3A',
                                        fontFamily: 'Playfair Display, serif',
                                        fontSize: '2.2rem'
                                    }}
                                >
                                    Administración de Usuarios
                                </h1>
                                <p style={{ color: '#5A6A7A', margin: 0 }}>
                                    <i className="bi bi-person-gear me-1"></i>
                                    Gestiona los usuarios de la plataforma
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabla de Usuarios */}
                <div className="row">
                    <div className="col-12">
                        <div 
                            className="card border-0"
                            style={{
                                borderRadius: '16px',
                                background: '#FFFFFF',
                                boxShadow: '0 4px 20px rgba(26, 42, 58, 0.06)',
                                overflow: 'hidden'
                            }}
                        >
                            <div 
                                className="d-flex justify-content-between align-items-center p-4"
                                style={{
                                    borderBottom: '1px solid #F0F2F5'
                                }}
                            >
                                <h5 
                                    className="fw-bold mb-0"
                                    style={{
                                        color: '#1A2A3A',
                                        fontFamily: 'Playfair Display, serif'
                                    }}
                                >
                                    <i className="bi bi-list-ul me-2" style={{ color: '#C6A15B' }}></i>
                                    Lista de Usuarios
                                </h5>
                                <span 
                                    className="px-3 py-1 rounded-pill"
                                    style={{
                                        background: 'rgba(26, 42, 58, 0.06)',
                                        color: '#1A2A3A',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {usuarios.length} usuarios
                                </span>
                            </div>

                            <div className="table-responsive">
                                {cargando ? (
                                    <div className="p-5 text-center">
                                        <div 
                                            className="spinner-border mb-3"
                                            style={{ 
                                                color: '#C6A15B',
                                                width: '2.5rem',
                                                height: '2.5rem'
                                            }}
                                            role="status"
                                        />
                                        <p style={{ color: '#5A6A7A' }}>
                                            Cargando usuarios...
                                        </p>
                                    </div>
                                ) : usuarios.length === 0 ? (
                                    <div className="p-5 text-center">
                                        <i 
                                            className="bi bi-people-fill" 
                                            style={{ 
                                                fontSize: '3rem', 
                                                color: '#C6A15B',
                                                opacity: '0.3'
                                            }}
                                        />
                                        <h5 className="mt-3" style={{ color: '#1A2A3A' }}>
                                            No hay usuarios registrados
                                        </h5>
                                        <p style={{ color: '#5A6A7A' }}>
                                            Los usuarios aparecerán aquí cuando se registren
                                        </p>
                                    </div>
                                ) : (
                                    <table className="table table-hover align-middle mb-0">
                                        <thead style={{ background: '#F9F6F0' }}>
                                            <tr>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    ID
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Usuario
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Correo
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Rol
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem' }}>
                                                    Estado
                                                </th>
                                                <th style={{ padding: '14px 16px', color: '#1A2A3A', fontWeight: '600', fontSize: '0.85rem', textAlign: 'center' }}>
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuarios.map((usuario) => {
                                                const rolStyle = obtenerRolBadge(usuario.rol);
                                                return (
                                                    <tr 
                                                        key={usuario.id}
                                                        style={{
                                                            transition: 'all 0.2s ease',
                                                            borderBottom: '1px solid #F0F2F5'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = '#F9F6F0';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'transparent';
                                                        }}
                                                    >
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span 
                                                                className="fw-bold"
                                                                style={{ 
                                                                    color: '#1A2A3A',
                                                                    fontFamily: 'monospace',
                                                                    fontSize: '0.9rem'
                                                                }}
                                                            >
                                                                #{usuario.id}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <div 
                                                                    className="d-flex align-items-center justify-content-center rounded-circle"
                                                                    style={{
                                                                        width: '32px',
                                                                        height: '32px',
                                                                        background: 'rgba(198, 161, 91, 0.12)',
                                                                        color: '#C6A15B',
                                                                        fontSize: '0.8rem'
                                                                    }}
                                                                >
                                                                    <i className="bi bi-person-fill"></i>
                                                                </div>
                                                                <span className="fw-semibold" style={{ color: '#1A2A3A' }}>
                                                                    {usuario.nombre}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span style={{ color: '#5A6A7A' }}>
                                                                {usuario.correo}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span 
                                                                className="px-3 py-1 rounded-pill"
                                                                style={{
                                                                    background: rolStyle.bg,
                                                                    color: rolStyle.color,
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600'
                                                                }}
                                                            >
                                                                {usuario.rol}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <span 
                                                                className={`px-3 py-1 rounded-pill d-inline-flex align-items-center gap-1 ${
                                                                    usuario.estado 
                                                                        ? 'bg-success bg-opacity-10 text-success' 
                                                                        : 'bg-danger bg-opacity-10 text-danger'
                                                                }`}
                                                                style={{
                                                                    fontSize: '0.75rem',
                                                                    fontWeight: '600'
                                                                }}
                                                            >
                                                                <i className={`bi ${usuario.estado ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} style={{ fontSize: '0.6rem' }}></i>
                                                                {usuario.estado ? "Activo" : "Inactivo"}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '14px 16px' }}>
                                                            <div className="d-flex gap-2 justify-content-center">
                                                                <button
                                                                    className="btn btn-sm"
                                                                    onClick={() => editarUsuario(usuario)}
                                                                    style={{
                                                                        background: 'rgba(198, 161, 91, 0.12)',
                                                                        color: '#C6A15B',
                                                                        border: 'none',
                                                                        padding: '6px 12px',
                                                                        borderRadius: '8px',
                                                                        fontWeight: '500',
                                                                        fontSize: '0.8rem',
                                                                        transition: 'all 0.2s ease'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = 'rgba(198, 161, 91, 0.25)';
                                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = 'rgba(198, 161, 91, 0.12)';
                                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                                    }}
                                                                >
                                                                    <i className="bi bi-pencil me-1"></i>
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    className="btn btn-sm"
                                                                    onClick={() => eliminarUsuario(usuario.id)}
                                                                    style={{
                                                                        background: 'rgba(244, 67, 54, 0.08)',
                                                                        color: '#F44336',
                                                                        border: 'none',
                                                                        padding: '6px 12px',
                                                                        borderRadius: '8px',
                                                                        fontWeight: '500',
                                                                        fontSize: '0.8rem',
                                                                        transition: 'all 0.2s ease'
                                                                    }}
                                                                    onMouseEnter={(e) => {
                                                                        e.currentTarget.style.background = 'rgba(244, 67, 54, 0.18)';
                                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.currentTarget.style.background = 'rgba(244, 67, 54, 0.08)';
                                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                                    }}
                                                                >
                                                                    <i className="bi bi-trash me-1"></i>
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}