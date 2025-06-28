import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgendamentoPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [internaSelecionada, setInternaSelecionada] = useState('Laura Isabella Morales');
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);

  const internas = [
    { nome: 'Laura Isabella Morales', rgi: '145236', parentesco: 'Esposa' },
    { nome: 'Ana Valentina Morales', rgi: '145236', parentesco: 'Cunhada' }
  ];

  const horarios = [
    { hora: '08h00', status: 'DISponível' },
    { hora: '09h00', status: 'DISponível' },
    { hora: '10h00', status: 'INdisponível' },
    { hora: '11h00', status: 'INdisponível' },
    { hora: '13h00', status: 'DISponível' },
    { hora: '14h00', status: 'INdisponível' },
    { hora: '15h00', status: 'INdisponível' },
    { hora: '16h00', status: 'DISponível' }
  ];

  const agendar = () => {
    if (!selectedDate || !horarioSelecionado) {
      alert('Selecione uma data e horário.');
      return;
    }
    alert(`Agendamento confirmado para ${internaSelecionada} no dia ${selectedDate} às ${horarioSelecionado}`);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center gap-3">
          <img src="src/assets/Icone-visita-facil.png" alt="Logo" />
          <h1 className="fw-bold text-primary-emphasis">
            <span className="text-dark">Visita</span> <span className="text-warning">Fácil</span>
          </h1>
        </div>
      </div>

      <div className="card p-4 shadow">
        <div className="row">
          <div className="col-md-6">
            <h4 className="fw-bold text-primary">Calendário</h4>
            <div className="border border-primary p-3 rounded">
              <input
                type="date"
                className="form-control"
                value={selectedDate || ''}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <h4 className="fw-bold text-primary">Dados do agendamento</h4>
            <div className="border border-primary p-3 rounded">
              <select className="form-select mb-2" disabled>
                <option>Estabelecimento Penal Feminino Irmã Irma Zorzi - EPFIIZ (Campo Grande)</option>
              </select>

              <table className="table table-bordered small">
                <thead className="table-light">
                  <tr><th>NOME</th><th>RGI</th><th>PARENTESCO</th></tr>
                </thead>
                <tbody>
                  {internas.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="radio"
                          name="interna"
                          checked={internaSelecionada === item.nome}
                          onChange={() => setInternaSelecionada(item.nome)}
                          className="me-2"
                        />
                        {item.nome}
                      </td>
                      <td>{item.rgi}</td>
                      <td>{item.parentesco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {horarios.map(({ hora, status }) => (
                <div
                  key={hora}
                  className={`d-flex align-items-center justify-content-between px-3 py-2 border ${status.includes('IN') ? 'text-muted' : ''}`}
                  style={{ background: '#f8f9fa' }}
                >
                  <div>
                    <i className="bi bi-clock me-2"></i>
                    <strong>{hora}</strong>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className={status.includes('IN') ? 'text-secondary' : 'text-primary fw-bold'}>{status}</span>
                    <input
                      type="radio"
                      disabled={status.includes('IN')}
                      checked={horarioSelecionado === hora}
                      onChange={() => setHorarioSelecionado(hora)}
                    />
                  </div>
                </div>
              ))}

              <div className="text-center mt-3">
                <button className="btn btn-primary px-4" onClick={agendar}>AGENDAR</button>
              </div>
            </div>
          </div>
        </div>

        <footer className="text-center mt-4 border-top pt-3">
          <p className="mb-1">Para Suporte:</p>
          <p className="mb-1">
            <i className="bi bi-envelope me-2"></i>
            <a href="mailto:suporte.visitafacil@epfiiz.ms.gov.br" className="text-black">suporte.visitafacil@epfiiz.ms.gov.br</a>
          </p>
          <p className="mb-1">
            {`© ${new Date().getFullYear()} AGEPEN/MS - Todos os direitos reservados | Versão: 1.0.0`}
          </p>
        </footer>
      </div>
    </div>
  );
}