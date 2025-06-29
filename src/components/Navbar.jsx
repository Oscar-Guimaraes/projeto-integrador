import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-primary">
          Visita<span className="text-warning">Fácil</span>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex gap-3">
            <li className="nav-item">
              <Link to="/agendamento" className="nav-link">Novo Agendamento</Link>
            </li>
            <li className="nav-item">
              <Link to="/visualizar-agendamentos" className="nav-link">Visualizar Agendamentos</Link>
            </li>
            {/* Você pode incluir mais páginas como "Meus Dados", "Sair", etc. */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
