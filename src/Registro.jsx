import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Menu from "./Menu";

const Usuario = () => {
  const URL = 'https://proyecto-express-react-b.onrender.com';
  const [tipoUsuario, setTipoUsuario] = useState("alumno");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const enviarDatos = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    const datos = {
      tipoUsuario,
      usuario,
      contraseña,
    };

    fetch(`${URL}/usuario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en el servidor");
        return res.json();
      })
      .then((data) => {
        console.log("Usuario agregado: ", data);
        Swal.fire("Éxito", "Usuario registrado correctamente", "success");
        setUsuario("");
        setContraseña("");
        setMensaje("Usuario registrado con éxito");
        setError("");
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        Swal.fire("Error", "No se pudo agregar el usuario", "error");
        setError("No se pudo registrar el usuario");
      });
  };

  return (
    <Menu>
      <div className="container d-flex justify-content-center mt-5">
        <form
          onSubmit={enviarDatos}
          className="p-4 border rounded shadow-sm bg-light"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Registrar Usuario</h2>

          <div className="mb-3">
            <label className="form-label">Tipo de usuario:</label>
            <select
              className="form-select"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
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
              className="form-control"
              value={usuario}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[a-zA-Z0-9]*$/.test(val)) {
                  setUsuario(val);
                }
              }}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={contraseña}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[\w!@#$%^&*()\-+=]*$/.test(val)) {
                  setContraseña(val);
                }
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Registrar
          </button>
        </form>
      </div>
    </Menu>
  );
};

export default Usuario;
