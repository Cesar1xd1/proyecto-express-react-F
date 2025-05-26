// SidebarLayout.js
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';


const SidebarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('');
  const navigate = useNavigate();

  useEffect(()=> {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if(usuarioGuardado?.tipoUsuario){
      setTipoUsuario(usuarioGuardado.tipoUsuario);
    }
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div
        className={`bg-dark text-white p-3 transition-all`}
        style={{
          width: collapsed ? '60px' : '250px',
          transition: 'width 0.3s',
          overflow: 'hidden',
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          {!collapsed && <h5 className="mb-0">Servicio Tutorias</h5>}
          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleSidebar}
            className="ms-auto"
          >
            {collapsed ? '☰' : '<'}
          </Button>
        </div>

        <ul className="nav flex-column">
          <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="/grupos">
              <i className="bi bi-people text-white me-2"></i>
              {!collapsed && 'Grupos'}
              </a>
          </li>

          {(tipoUsuario === 'admin' || tipoUsuario === 'tutor') && (
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="/alumnos">
              <i className="bi bi-backpack text-white me-2"></i>
              {!collapsed && 'Alumnos'}
              </a>
            </li>
          )}

          {(tipoUsuario === 'admin') && (
            <li className="nav-item">
              <a className="nav-link text-white d-flex align-items-center" href="/tutores">
              <i className="bi bi-duffle text-white me-2"></i>
              {!collapsed && 'Tutores'}
              </a>
          </li>
          )}
          
          
          
        </ul>

        <Button onClick={cerrarSesion} className="btn btn-outline-light w-100 mt-4">
          <i className="bi bi-box-arrow-right me-2"></i> {!collapsed && 'Cerrar sesión'}
        </Button>
      </div>

      {/* Contenido */}
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
