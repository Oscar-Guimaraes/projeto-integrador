import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export default function AgendamentoPage() {
  const navigate = useNavigate();
  const hoje = new Date();
  const [mesAtual, setMesAtual] = useState(hoje.getMonth());
  const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState(null);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [internaSelecionada, setInternaSelecionada] = useState('Laura Isabella Morales');

  const internas = [
    { nome: 'Laura Isabella Morales', rgi: '145236', parentesco: 'Esposa' },
    { nome: 'Ana Valentina Morales', rgi: '145236', parentesco: 'Cunhada' }
  ];

  const todosHorarios = [
    '08h00', '09h00', '10h00', '11h00', '13h00', '14h00', '15h00', '16h00'
  ];

  useEffect(() => {
    if (diaSelecionado) {
      setHorarioSelecionado(null);
      setHorariosDisponiveis(todosHorarios);
    }
  }, [diaSelecionado]);

  const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
  const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();

  const dias = [];
  for (let i = 0; i < primeiroDiaSemana; i++) dias.push(null);
  for (let i = 1; i <= diasNoMes; i++) dias.push(i);

  const mudarMes = (incremento) => {
    let novoMes = mesAtual + incremento;
    let novoAno = anoAtual;
    if (novoMes > 11) {
      novoMes = 0;
      novoAno++;
    } else if (novoMes < 0) {
      novoMes = 11;
      novoAno--;
    }
    setMesAtual(novoMes);
    setAnoAtual(novoAno);
    setDiaSelecionado(null);
  };

  const agendar = () => {
    if (!diaSelecionado || !horarioSelecionado) {
      alert('Selecione uma data e horário.');
      return;
    }
    const dataFormatada = `${diaSelecionado}/${mesAtual + 1}/${anoAtual}`;
    alert(`Agendamento confirmado para ${internaSelecionada} em ${dataFormatada} às ${horarioSelecionado}`);
  };

  const isFuturaOuHoje = (dia) => {
    const data = new Date(anoAtual, mesAtual, dia);
    return data >= new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
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
            <h4 className="fw-bold text-primary mb-3">Calendário</h4>
            <div className="border border-primary p-3 rounded">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button className="btn btn-sm btn-outline-secondary" onClick={() => mudarMes(-1)}>&lt;</button>
                <strong>{meses[mesAtual]} {anoAtual}</strong>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => mudarMes(1)}>&gt;</button>
              </div>
              <div className="d-grid" style={{ gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', fontSize: '1.3rem' }}>
                {diasDaSemana.map(dia => <div key={dia} className="text-center fw-bold">{dia}</div>)}
                {dias.map((dia, idx) => {
                  if (!dia) return <div key={idx}>&nbsp;</div>;
                  const isEnabled = isFuturaOuHoje(dia);
                  const isSelected = diaSelecionado === dia;
                  return (
                    <div key={idx} className="text-center">
                      <button
                        className={`btn btn-sm w-100 fw-bold ${isSelected ? 'btn-primary text-white' : isEnabled ? 'btn-outline-success' : 'btn-outline-secondary text-muted'}`}
                        onClick={() => isEnabled && setDiaSelecionado(dia)}
                        disabled={!isEnabled}
                      >
                        {dia}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <h4 className="fw-bold text-primary">Agendamento</h4>
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
                        <input type="radio" name="interna" checked={internaSelecionada === item.nome} onChange={() => setInternaSelecionada(item.nome)} className="me-2" />
                        {item.nome}
                      </td>
                      <td>{item.rgi}</td>
                      <td>{item.parentesco}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {diaSelecionado && (
                <>
                  <h5 className="fw-bold mt-3">Horários disponíveis</h5>
                  {horariosDisponiveis.map((hora) => (
                    <div
                      key={hora}
                      className="d-flex align-items-center justify-content-between px-3 py-2 border"
                      style={{ background: '#f8f9fa' }}
                    >
                      <div>
                        <i className="bi bi-clock me-2"></i>
                        <strong>{hora}</strong>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <span className="text-primary fw-bold">DISponível</span>
                        <input
                          type="radio"
                          checked={horarioSelecionado === hora}
                          onChange={() => setHorarioSelecionado(hora)}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}

              <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-outline-secondary px-4" onClick={() => navigate('/')}>CANCELAR</button>
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
