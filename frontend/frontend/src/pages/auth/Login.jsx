import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Login() {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!correo || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Complete todos los campos"
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso",
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">

      <div
        className="card shadow-lg p-4"
        style={{
          width: "450px",
          borderRadius: "15px"
        }}
      >
        <div className="text-center mb-4">

          <i
            className="bi bi-house-lock-fill text-primary"
            style={{ fontSize: "3rem" }}
          ></i>

          <h2 className="fw-bold mt-3">
            SmartRentChain
          </h2>

          <p className="text-muted">
            Iniciar Sesión
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label className="form-label">
              Correo Electrónico
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                type="email"
                className="form-control"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />

            </div>
          </div>

          <div className="mb-4">

            <label className="form-label">
              Contraseña
            </label>

            <div className="input-group">

              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

          </div>

          <button
            className="btn btn-primary w-100 fw-bold"
            type="submit"
          >
            Ingresar
          </button>

        </form>

        <div className="text-center mt-3">

          <span className="text-muted">
            ¿No tienes cuenta?
          </span>

          <Link
            className="ms-2 fw-bold text-decoration-none"
            to="/register"
          >
            Registrarse
          </Link>

        </div>

      </div>
    </div>
  );
}