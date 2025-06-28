export default function LoginPage() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login efetuado com sucesso (simulação).');
  };

  const handleCadastro = () => {
    alert('Redirecionando para a página de cadastro...');
  };

  return (
    <div className="container mt-5">
      {/* Logo e título */}
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center gap-3">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
            <span role="img" aria-label="Câmera" style={{ fontSize: '1.5rem' }}>🎥</span>
          </div>
          <h1 className="fw-bold text-primary-emphasis">
            <span className="text-dark">Visita</span> <span className="text-warning">Fácil</span>
          </h1>
        </div>
      </div>

      {/* Cartões de Login/Cadastro */}
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow">
            <div className="row g-0">
              {/* Coluna de Cadastro */}
              <div className="col-md-6 border-end d-flex flex-column justify-content-center align-items-center p-4 bg-light">
                <h2 className="text-center fw-bold mb-3">Ainda não<br />tem cadastro?</h2>
                <button className="btn btn-primary" onClick={handleCadastro}>Cadastre-se ✎</button>
              </div>

              {/* Coluna de Login */}
              <div className="col-md-6 p-4">
                <h2 className="text-center fw-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Seu e-mail" required />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Sua senha" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 mb-2">Entrar</button>
                  <div className="text-center">
                    <a href="#" className="text-decoration-none">Recuperar senha ↪</a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="text-center mt-5 py-3 border-top">
        <div className="d-flex justify-content-center gap-4 align-items-center">
          <img src="/logos/agepen.png" alt="Logo AGEPEN/MS" height="40" />
          <img src="/logos/policia-penal.png" alt="Logo Polícia Penal/MS" height="40" />
        </div>
      </footer>
    </div>
  );
}
