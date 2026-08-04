import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        usuario,
        logout
    } = useAuth();

    const cerrarSesion = () => {

        logout();
        navigate("/login");

    };

    const esAdmin = usuario?.rol === "ADMIN";

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to={esAdmin ? "/admin/dashboard" : "/dashboard"}
                >
                    <i className="bi bi-houses-fill me-2"></i>
                    SmartRent
                </Link>

                <button
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto">

                        {esAdmin ? (

                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/dashboard"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/usuarios"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/usuarios"
                                    >
                                        Usuarios
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/solicitudes"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/solicitudes"
                                    >
                                        Solicitudes
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/validar-inmuebles"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/validar-inmuebles"
                                    >
                                        Inmuebles
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/contratos"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/contratos"
                                    >
                                        Contratos
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/admin/auditoria"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/admin/auditoria"
                                    >
                                        Blockchain
                                    </Link>
                                </li>

                            </>

                        ) : (

                            <>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/dashboard"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/explorar"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/explorar"
                                    >
                                        Explorar
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/mis-inmuebles"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/mis-inmuebles"
                                    >
                                        Mis Inmuebles
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/mis-contratos"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/mis-contratos"
                                    >
                                        Contratos
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/mis-pagos"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/mis-pagos"
                                    >
                                        Pagos
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            location.pathname === "/blockchain"
                                                ? "active fw-bold"
                                                : ""
                                        }`}
                                        to="/blockchain"
                                    >
                                        Blockchain
                                    </Link>
                                </li>

                            </>

                        )}

                        <li className="nav-item d-flex align-items-center mx-3">

                            <span className="text-white small">

                                {usuario?.nombre}

                            </span>

                        </li>

                        <li className="nav-item">

                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={cerrarSesion}
                            >
                                Salir
                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </nav>

    );

}