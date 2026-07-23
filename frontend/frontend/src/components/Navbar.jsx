import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/dashboard">
          <i className="bi bi-houses-fill me-2"></i>
          SmartRentChain
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/dashboard" ? "active fw-bold" : ""
                }`}
                to="/dashboard"
              >
                Dashboard
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

            <li className="nav-item ms-3">
              <Link
                className="btn btn-outline-light btn-sm"
                to="/login"
              >
                Salir
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}