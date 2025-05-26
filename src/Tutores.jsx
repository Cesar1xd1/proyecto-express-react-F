import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SidebarLayout from "./SidebarLayout";

const Tutores = () => {
  const URL = 'https://proyecto-express-react-b.onrender.com';
  const [tutores, setTutores] = useState([]);
  const [tutorSeleccionado, setTutorSeleccionado] = useState({
    numControl: "",
    nombre: "",
    primerAp: "",
    segundoAp: "",
    semestre: "1",
    carrera: "ISC",
    fechaNac: "",
    numTel: "",
  });
  {
    /* varibles de Paginacion */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const rowsPerPage = 5;
  const esquema = {
    numControl: "",
    nombre: "",
    primerAp: "",
    segundoAp: "",
    semestre: "1",
    carrera: "ISC",
    fechaNac: "",
    numTel: "",
  };

  const [datos, setDatos] = useState(esquema);
  const cargarTutor = (tutor) => {
    setTutorSeleccionado(tutor);
  };

  const handleChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  {
    /* proxima pagina*/
  }
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  {
    /* anterior pagina */
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  {
    /* Calcular botones necesarios y su numeracion */
  }
  const getPaginationRange = () => {
    const rangeSize = 3;
    const start = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
    const end = Math.min(start + rangeSize - 1, totalPages);
    return [start, end];
  };
  {
    /* variables para usar en el dom */
  }
  const [startPage, endPage] = getPaginationRange();
  const tutoresDT = tutores.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  {
    /* Eliminar */
  }
  const eliminarTutor = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL}/tutores/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Tutor eliminado:", data);
            Swal.fire("Eliminado", "El tutor ha sido eliminado.", "success");
            fetchTutores();
          })
          .catch((err) => {
            console.error("Error al eliminar:", err);
            Swal.fire("Error", "No se pudo eliminar el tutor", "error");
          });
      }
    });
  };

  {
    /* Cargar/actualizar registro */
  }
  const fetchTutores = () => {
    fetch(`${URL}/tutores/`)
      .then((res) => res.json())
      .then((data) => {
        setTutores(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage)); // Establece el número total de páginas
      })
      .catch((err) => console.error("Error al obtener tutores:", err));
  };

  {
    /* registros Cargados */
  }
  useEffect(() => {
    fetchTutores();
  }, []);

  {
    /* Alta */
  }
  const enviarDatos = (e) => {
    e.preventDefault(); // evita que el formulario se envíe sin validar
    if (!e.target.checkValidity()) {
      // Esto fuerza al navegador a mostrar los errores de validación
      e.target.reportValidity();
      return;
    }

    fetch(`${URL}/tutores/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Tutor agregado:", data);
        Swal.fire("Éxito", "Tutor agregado correctamente", "success");
        fetchTutores();
        setDatos(esquema);
        document.getElementById("cerrarA").click();
      })
      .catch((err) => {
        console.error("Error al agregar:", err);
        Swal.fire("Error", "No se pudo agregar el tutor", "error");
      });
  };

  {
    /* Cambios */
  }
  const guardar = (e, id) => {
    e.preventDefault(); // Previene el cierre automático

    const form = e.target.closest("form"); // Ubica el form
    if (!form.checkValidity()) {
      form.reportValidity(); // Muestra los errores nativos del navegador
      return; // No continúa si el form no es válido
    }

    fetch(`${URL}/tutores/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tutorSeleccionado),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Tutor editado:", data);
        Swal.fire("Éxito", "Cambios guardados correctamente", "success");
        fetchTutores();
        setDatos(esquema);

        document.getElementById("cerrarEdit").click();
      })
      .catch((err) => {
        console.error("Error al editar:", err);
        Swal.fire("Error", "No se pudo realizar el cambio", "error");
      });
  };

  return (
    <SidebarLayout>
      <div className="container">
        <h1 className="text-center mb-5 mt-5 text-danger">
          <b>Servicios Escolares</b>
        </h1>
        <div className="card mb-5">
          <div className="card-header">
            <div className="row">
              <h3 className="col col-6">Tutores</h3>
              <div className="col col-6">
                <button
                  type="button"
                  className="btn btn-success btn-sm float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#modalA"
                >
                  AGREGAR
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="text-center">
                    <th>Numero de Control</th>
                    <th>Nombre</th>
                    <th colSpan={2} className="text-center">
                      Apellidos
                    </th>

                    <th>Semestre</th>
                    <th>Carrera</th>
                    <th>Fecha de nacimiento</th>
                    <th>Num. de Telefono</th>
                    <th colSpan={3} className="text-center">
                      Accion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Cargar registros de forma dinamica */}
                  {tutoresDT.length > 0 ? (
                    tutoresDT.map((row) => (
                      <tr key={row._id}>
                        <td>{row.numControl}</td>
                        <td>{row.nombre}</td>
                        <td>{row.primerAp}</td>
                        <td>{row.segundoAp}</td>
                        <td>{row.semestre}</td>
                        <td>{row.carrera}</td>
                        <td>{row.fechaNac}</td>
                        <td>{row.numTel}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-info btn-sm"
                            data-bs-target="#modalC"
                            data-bs-toggle="modal"
                            onClick={() => cargarTutor(row)}
                          >
                            Editar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarTutor(row._id)}
                          >
                            Eliminar
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning btn-sm"
                            data-bs-target="#modalD"
                            data-bs-toggle="modal"
                            onClick={() => cargarTutor(row)}
                          >
                            Detalle
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center">
                        No hay registros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Paginacion */}
            <nav aria-label="Paginación">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={handlePrevious}>
                    Anterior
                  </button>
                </li>
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                  <li
                    key={startPage + index}
                    className={`page-item ${
                      currentPage === startPage + index ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(startPage + index)}
                    >
                      {startPage + index}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button className="page-link" onClick={handleNext}>
                    Siguiente
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Modal Altas */}
        <form onSubmit={enviarDatos}>
          <div
            className="modal fade"
            id="modalA"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Agregar
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label>Numero de Control:</label>
                    <input
                      type="text"
                      name="numControl"
                      value={datos.numControl}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setDatos(prev => ({ ...prev, numControl: value}));
                      }}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      name="nombre"
                      value={datos.nombre}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setDatos(prev => ({ ...prev, nombre: value}));
                      }}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Primer Apellido:</label>
                    <input
                      type="text"
                      name="primerAp"
                      value={datos.primerAp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setDatos(prev => ({ ...prev, primerAp: value}));
                      }}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Segundo Apellido:</label>
                    <input
                      type="text"
                      name="segundoAp"
                      value={datos.segundoAp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
                        setDatos(prev => ({ ...prev, segundoAp: value}));
                      }}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Semestre:</label>
                    <select
                      name="semestre"
                      value={datos.semestre}
                      onChange={(e) => handleChange(e, setDatos)}
                      required
                      className="form-control"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Carrera:</label>
                    <select
                      name="carrera"
                      value={datos.carrera}
                      onChange={(e) => handleChange(e, setDatos)}
                      required
                      className="form-control"
                    >
                      <option value="ISC">ISC</option>
                      <option value="IM">IM</option>
                      <option value="CP">CP</option>
                      <option value="LA">LA</option>
                      <option value="IIA">IIA</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Fecha de Nacimiento:</label>
                    <input
                      type="date"
                      name="fechaNac"
                      value={datos.fechaNac}
                      onChange={(e) => handleChange(e, setDatos)}
                      onClick={(e) => e.target.showPicker()}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label>Num. de Teléfono:</label>
                    <input
                      type="text"
                      name="numTel"
                      value={datos.numTel}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        setDatos(prev => ({ ...prev, numTel: value}));
                      }}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="cerrarA"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-success">
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Modal Cambios */}

        <form onSubmit={(e) => guardar(e, tutorSeleccionado._id)}>
          <div
            className="modal fade"
            id="modalC"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Editar
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="modal-body">
                    <div className="mb-3">
                      <label>Numero de Control:</label>
                      <input
                        type="text"
                        name="numControl"
                        id="numControl"
                        value={tutorSeleccionado.numControl}
                        readOnly
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Nombre:</label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        value={tutorSeleccionado.nombre}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            nombre: e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''),
                          })
                        }
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Primer Apellido:</label>
                      <input
                        type="text"
                        name="primerAp"
                        id="primerAp"
                        value={tutorSeleccionado.primerAp}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            primerAp: e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''),
                          })
                        }
                        required
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Segundo Apellido:</label>
                      <input
                        type="text"
                        name="segundoAp"
                        id="segundoAp"
                        value={tutorSeleccionado.segundoAp}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            segundoAp: e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ''),
                          })
                        }
                        required
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Semestre</label>
                      <select
                        name="semestre"
                        id="semestre"
                        className="form-control"
                        value={tutorSeleccionado.semestre}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            semestre: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Carrera</label>
                      <select
                        name="carrera"
                        id="carrera"
                        className="form-control"
                        value={tutorSeleccionado.carrera}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            carrera: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="ISC">ISC</option>
                        <option value="IM">IM</option>
                        <option value="CP">CP</option>
                        <option value="LA">LA</option>
                        <option value="IIA">IIA</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label>Fecha de Nacimiento:</label>
                      <input
                        type="date"
                        name="fechaNac2"
                        id="fechaNac2"
                        value={tutorSeleccionado.fechaNac}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            fechaNac: e.target.value,
                          })
                        }
                        onClick={(e) => {
                          e.target.showPicker();
                        }}
                        required
                        className="form-control"
                      />
                      <script></script>
                    </div>
                    <div className="mb-3">
                      <label>Num. De Telefono</label>
                      <input
                        type="text"
                        name="numTel"
                        id="numTel"
                        value={tutorSeleccionado.numTel}
                        onChange={(e) =>
                          setTutorSeleccionado({
                            ...tutorSeleccionado,
                            numTel: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        required
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="cerrarEdit"
                    data-bs-dismiss="modal"
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div
          className="modal fade"
          id="modalD"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Detalles
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Numero de Control:</label>
                    <br />
                    <strong>{tutorSeleccionado.numControl}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Nombre:</label>
                    <br />
                    <strong>{tutorSeleccionado.nombre}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Primer Apellido:</label>
                    <br />
                    <strong>{tutorSeleccionado.primerAp}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Segundo Apellido:</label>
                    <br />
                    <strong>{tutorSeleccionado.segundoAp}</strong>
                  </div>

                  <div className="mb-3">
                    <label>Semestre</label>
                    <br />
                    <strong>{tutorSeleccionado.semestre}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Carrera</label>
                    <br />
                    <strong>{tutorSeleccionado.carrera}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Fecha de Nacimiento:</label>
                    <br />
                    <strong>{tutorSeleccionado.fechaNac}</strong>
                  </div>
                  <div className="mb-3">
                    <label>Num. De Telefono</label>
                    <br />
                    <strong>{tutorSeleccionado.numTel}</strong>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="cerrarEdit"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Tutores;
