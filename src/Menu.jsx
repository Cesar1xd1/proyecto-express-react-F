import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const Menu = ({children}) => {
  return (
    <>
    <div>
      <Navbar expand="lg" className="shadow-sm" style={{backgroundColor: '#0f2852'}}>
        <Container>
          <Navbar.Brand href="#" className='text-white'>Tutorias TEC</Navbar.Brand>
          <Nav className="ms-auto">
            <a href="/login" className="btn btn-primary me-2">Iniciar Sesion</a>
            <a href="/registro" className="btn btn-primary me-2">Registrarse</a>

          </Nav>
        </Container>
      </Navbar>
    </div>
    <div className="flex-grow-1 p-4 bg-light">
        {children}
    </div>
    </>
  );
};

export default Menu;
