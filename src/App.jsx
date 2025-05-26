import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alumnos from './Alumnos';
import Usuario from './Registro';
import Login from './login';
import NotFound from './NotFound';
import SidebarLayout from './SidebarLayout';
import LandingPage from './LandingPage';
import Menu from './Menu';
import Grupos from './Grupos';
import Tutores from './Tutores';
import RutaPrivada from './RutaPrivada';


function App() {
  return (
    
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Usuario/>} />
        <Route path='/menu' element={<Menu/>}/>
        <Route path="*" element={<NotFound />} />


        <Route
          path="/dashboard"
          element={
            <RutaPrivada>
              <SidebarLayout />
            </RutaPrivada>
          }
        />
        <Route
            path="/alumnos"
            element={
              <RutaPrivada>
                <Alumnos />
              </RutaPrivada>
            }
          />
        <Route
          path="/tutores"
          element={
            <RutaPrivada>
              <Tutores />
            </RutaPrivada>
          }
        />
        <Route
          path="/grupos"
          element={
            <RutaPrivada>
              <Grupos />
            </RutaPrivada>
          }
        />
      </Routes>
    </Router>
    
    
    
    
    
  );
}

export default App;
