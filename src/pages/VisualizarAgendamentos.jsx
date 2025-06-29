import { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';

export default function AgendamentoPage() {
  return (
    <>
      <Navbar />
      {/* Resto da página... */}
    </>
  );
}

export default function VisualizarAgendamentos() {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/agendamentos')
      .then(res => res.json())
      .then(data => setAgendamentos(data))
      .catch(err => console.error('Erro ao carregar agendamentos:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-primary fw-bold mb-4">Agendamentos Realizados</h2>

      {agendamentos.length === 0 ? (
        <p className="text-muted">Nenhum agendamento encontrado.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Data</th>
              <th>Horário</th>
              <th>Familiar</th>
              <th>Interna</th>
              <th>Unidade</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map((ag, idx) => (
              <tr key={idx}>
                <td>{new Date(ag.data).toLocaleDateString('pt-BR')}</td>
                <td>{ag.horario}</td>
                <td>{ag.nome_familiar}</td>
                <td>{ag.nome_interna}</td>
                <td>{ag.unidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
