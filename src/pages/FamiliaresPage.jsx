// src/pages/FamiliaresPage.jsx
import { useEffect, useState } from 'react';

export default function FamiliaresPage() {
  const [familiares, setFamiliares] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/familiares')
      .then((res) => res.json())
      .then((data) => {
        setFamiliares(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar familiares:', err);
        setCarregando(false);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-primary fw-bold mb-4">Lista de Familiares</h2>

      {carregando ? (
        <p>Carregando dados...</p>
      ) : familiares.length === 0 ? (
        <p className="text-muted">Nenhum familiar encontrado.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CPF</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {familiares.map((f, index) => (
              <tr key={f.id || index}>
                <td>{index + 1}</td>
                <td>{f.nome}</td>
                <td>{f.cpf}</td>
                <td>{f.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
