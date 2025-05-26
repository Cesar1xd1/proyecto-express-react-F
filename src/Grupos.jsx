import React, { useEffect, useState } from 'react';
import SidebarLayout from './SidebarLayout';
import { useNavigate } from 'react-router-dom';

const Grupos = () => {
  const URL = 'https://proyecto-express-react-b.onrender.com';
  const [alumnos, setAlumnos] = useState([]);
  const [semestreFiltro, setSemestreFiltro] = useState('1');
  const [carreraFiltro, setCarreraFiltro] = useState('ISC');
  const [tutor, setTutor] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [rowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [busquedaHecha, setBusquedaHecha] = useState(false); // <-- Nuevo estado
  const navigate = useNavigate();

  const buscarGrupo = () => {
    setBusquedaHecha(false); // Reinicia la bandera al iniciar búsqueda

    // Obtener alumnos
    fetch(`${URL}/alumnos/${semestreFiltro}/${carreraFiltro}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener alumnos');
        return res.json();
      })
      .then(data => {
        setAlumnos(data);
        setTotalPages(Math.ceil(data.length / rowsPerPage));
        setPaginaActual(1);
      })
      .catch(err => console.error('Error al obtener alumnos:', err));

    // Obtener tutor
    fetch(`${URL}/tutor/${semestreFiltro}/${carreraFiltro}`)
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener tutor');
        return res.json();
      })
      .then(data => {
        setTutor(data);
        setBusquedaHecha(true); // Marca que ya se hizo la búsqueda
      })
      .catch(err => {
        console.error('Error al obtener tutor:', err);
        setTutor(null);
        setBusquedaHecha(true); // También marcar búsqueda hecha en caso de error
      });
  };

  const alumnosPaginados = alumnos.slice(
    (paginaActual - 1) * rowsPerPage,
    paginaActual * rowsPerPage
  );

  return (
    <SidebarLayout>
      <div className="container mt-4">
        <h2>Grupos</h2>

        <div className="mb-3 row">
          <div className="col-md-3">
            <label>Semestre:</label>
            <select
              className="form-select"
              value={semestreFiltro}
              onChange={(e) => setSemestreFiltro(e.target.value)}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <label>Carrera:</label>
            <select
              className="form-select"
              value={carreraFiltro}
              onChange={(e) => setCarreraFiltro(e.target.value)}
            >
              <option value="ISC">ISC</option>
              <option value="IM">IM</option>
              <option value="CP">CP</option>
              <option value="LA">LA</option>
              <option value="IIA">IIA</option>
            </select>
          </div>

          <div className="col-md-3 align-self-end">
            <button className="btn btn-info" onClick={buscarGrupo}>
              Buscar Grupo
            </button>
          </div>
        </div>

        {/* Mostrar tutor o botón para agregar tutor solo después de buscar */}
        {busquedaHecha && (!tutor || !tutor.nombre) ? (
          <div><strong>No hay tutor para este grupo, Agregalo </strong><button 
            className="btn btn-success btn-sm" 
            onClick={() => navigate('/tutores')}
          >
            Agregar tutor
          </button><br /><br /></div>
          
        ) : (
          tutor && tutor.nombre && (
            <div>
              <strong>Tutor: </strong> {tutor.nombre} {tutor.primerAp} {tutor.segundoAp}
              <br /><br />
            </div>
          )
        )}
    
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th colSpan={2} className='text-center'>Apellidos</th>
              <th>Fecha de Nacimiento</th>
              <th>Num. Telefono</th>
              {/* Agrega más columnas si es necesario */}
            </tr>
          </thead>
          <tbody>
            {alumnosPaginados.map((alumno, index) => (
              <tr key={index}>
                <td>{alumno.nombre}</td>
                <td>{alumno.primerAp}</td>
                <td>{alumno.segundoAp}</td>
                <td>{alumno.fechaNac}</td>
                <td>{alumno.numTel}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i}
                    className={`page-item ${paginaActual === i + 1 ? 'active' : ''}`}
                  >
                    <button className="page-link" onClick={() => setPaginaActual(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
};

export default Grupos;
