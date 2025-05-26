import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Menu from "./Menu";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const URL = 'https://proyecto-express-react-b.onrender.com';
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("alumno");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [captchaValido, setCaptchaValido] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!captchaValido) {
      Swal.fire(
        "Verificacion requerida",
        "Por favor verifica que no eres un robot",
        "warning"
      );
      return;
    }

    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña, tipoUsuario }),
      });

      const data = await res.json();

      if (res.ok) {
        const duracionSesion = 60000;
        const expiracionSesion = new Date().getTime() + duracionSesion;

        localStorage.setItem(
          "usuario",
          JSON.stringify({ usuario, tipoUsuario })
        );
        localStorage.setItem("sesionExpira", expiracionSesion);
        navigate("/dashboard");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error del servidor");
    }
  };

  return (
    <Menu>
      <div className="container d-flex justify-content-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="p-4 border rounded shadow-sm bg-light"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Iniciar Sesión</h2>

          <div className="mb-3">
            <label className="form-label">Tipo de usuario:</label>
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="form-select"
            >
              <option value="admin">Administrador</option>
              <option value="tutor">Tutor</option>
              <option value="alumno">Alumno</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              className="form-control"
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <ReCAPTCHA
            sitekey="6LcaR0krAAAAAPu5Ld9BkJCLhQ_hX-oJLy467LTc"
            onChange={() => setCaptchaValido(true)}
            onExpired={() => setCaptchaValido(false)}
            className="mb-3"
          />

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </Menu>
  );
};

export default Login;
