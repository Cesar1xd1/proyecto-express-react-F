export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h1 className="display-1 text-secondary">404</h1>
      <p className="fs-4">Página no encontrada</p>
      <a href="/" className="btn btn-primary">Volver al inicio</a>
    </div>
  );
}
