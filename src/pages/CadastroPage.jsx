import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroPage() {
  const navigate = useNavigate();

  const [familia, setFamilia] = useState({
    nome: '', cpf: '', rg: '', nascimento: '', cidade: '', estado: 'MS', telefone: '', email: '', senha: '', confirmarSenha: '',
    anexos: { rg: null, cpf: null, comprovante: null, antecedentes: null }
  });

  const [interna, setInterna] = useState({
    unidade: 'Estabelecimento Penal Feminino Irmã Irma Zorzi', nome: '', cpf: '', nascimento: '', cidade: '', estado: 'MS', parentesco: ''
  });

  const [listaInternas, setListaInternas] = useState([]);

  const handleAnexoChange = (e, tipo) => {
    const file = e.target.files[0];
    setFamilia({ ...familia, anexos: { ...familia.anexos, [tipo]: file } });
  };

  const removerAnexo = (tipo) => {
    setFamilia({ ...familia, anexos: { ...familia.anexos, [tipo]: null } });
  };

  const adicionarInterna = () => {
    if (interna.nome && interna.cpf && interna.parentesco) {
      setListaInternas([...listaInternas, interna]);
      setInterna({ ...interna, nome: '', cpf: '', nascimento: '', cidade: '', parentesco: '' });
    }
  };

  const removerInterna = (index) => {
    const novaLista = listaInternas.filter((_, i) => i !== index);
    setListaInternas(novaLista);
  };

  const salvar = () => {
    if (familia.senha !== familia.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }
    if (!familia.nome || !familia.cpf || !familia.telefone || !familia.email) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    alert('Dados enviados com sucesso!');
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <div className="d-inline-flex align-items-center gap-3">
          <img src="src/assets/Icone-visita-facil.png" alt="Logo" />
          <h1 className="fw-bold text-primary-emphasis">
            <span className="text-dark">Visita</span> <span className="text-warning">Fácil</span>
          </h1>
        </div>
      </div>

      <div className="card shadow p-4">
        <h2 className="text-center fw-bold mb-4">Cadastro de Visitante</h2>

        <fieldset className="border rounded p-3 mb-4">
          <legend className="float-none w-auto px-2">Dados do Familiar</legend>

          <div className="row g-3">
            <div className="col-md-4"><input type="text" className="form-control" placeholder="Nome" value={familia.nome} onChange={e => setFamilia({ ...familia, nome: e.target.value })} /></div>
            <div className="col-md-4"><input type="text" className="form-control" placeholder="CPF" value={familia.cpf} onChange={e => setFamilia({ ...familia, cpf: e.target.value })} /></div>
            <div className="col-md-4"><input type="number" className="form-control" placeholder="RG" value={familia.rg} onChange={e => setFamilia({ ...familia, rg: e.target.value })} /></div>

            <div className="col-md-4"><input type="date" className="form-control" value={familia.nascimento} onChange={e => setFamilia({ ...familia, nascimento: e.target.value })} /></div>
            <div className="col-md-4"><input type="text" className="form-control" placeholder="Cidade" value={familia.cidade} onChange={e => setFamilia({ ...familia, cidade: e.target.value })} /></div>
            <div className="col-md-4">
              <select className="form-select" value={familia.estado}>
                <option value="MS">MS</option>
              </select>
            </div>

            <div className="col-md-6"><input type="text" className="form-control" placeholder="Telefone" value={familia.telefone} onChange={e => setFamilia({ ...familia, telefone: e.target.value })} /></div>
            <div className="col-md-6"><input type="email" className="form-control" placeholder="E-mail" value={familia.email} onChange={e => setFamilia({ ...familia, email: e.target.value })} /></div>

            {['rg', 'cpf', 'comprovante', 'antecedentes'].map(tipo => (
              <div className="col-md-3" key={tipo}>
                <label className="form-label text-capitalize">{tipo}</label>
                {!familia.anexos[tipo] ? (
                  <input type="file" className="form-control" onChange={e => handleAnexoChange(e, tipo)} />
                ) : (
                  <div>
                    <p className="small">{familia.anexos[tipo].name}</p>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removerAnexo(tipo)}>Remover</button>
                  </div>
                )}
              </div>
            ))}

            <div className="col-md-6"><input type="password" className="form-control" placeholder="Senha" value={familia.senha} onChange={e => setFamilia({ ...familia, senha: e.target.value })} /></div>
            <div className="col-md-6"><input type="password" className="form-control" placeholder="Confirme a senha" value={familia.confirmarSenha} onChange={e => setFamilia({ ...familia, confirmarSenha: e.target.value })} /></div>
          </div>
        </fieldset>

        <fieldset className="border rounded p-3 mb-4">
          <legend className="float-none w-auto px-2">Dados da Interna</legend>

          <div className="row g-3">
            <div className="col-md-4">
              <select className="form-select" disabled>
                <option>Estabelecimento Penal Feminino Irmã Irma Zorzi</option>
              </select>
            </div>
            <div className="col-md-4"><input type="text" className="form-control" placeholder="Nome da Interna" value={interna.nome} onChange={e => setInterna({ ...interna, nome: e.target.value })} /></div>
            <div className="col-md-4"><input type="text" className="form-control" placeholder="CPF" value={interna.cpf} onChange={e => setInterna({ ...interna, cpf: e.target.value })} /></div>

            <div className="col-md-4"><input type="date" className="form-control" value={interna.nascimento} onChange={e => setInterna({ ...interna, nascimento: e.target.value })} /></div>
            <div className="col-md-4"><input type="text" className="form-control" placeholder="Cidade" value={interna.cidade} onChange={e => setInterna({ ...interna, cidade: e.target.value })} /></div>
            <div className="col-md-4">
              <select className="form-select" disabled>
                <option>MS</option>
              </select>
            </div>

            <div className="col-md-6">
              <select className="form-select" value={interna.parentesco} onChange={e => setInterna({ ...interna, parentesco: e.target.value })}>
                <option value="">Grau de Parentesco</option>
                <option value="Filha">Filha</option>
                <option value="Neta">Neta</option>
                <option value="Nora">Nora</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button className="btn btn-outline-primary w-100" onClick={adicionarInterna}>Adicionar</button>
            </div>

            {listaInternas.length > 0 && (
              <div className="col-12">
                <table className="table table-bordered mt-3">
                  <thead className="table-light">
                    <tr>
                      <th>Nome</th><th>CPF</th><th>Parentesco</th><th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaInternas.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.nome}</td>
                        <td>{item.cpf}</td>
                        <td>{item.parentesco}</td>
                        <td><button className="btn btn-sm btn-danger" onClick={() => removerInterna(idx)}>Remover</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </fieldset>

        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/')}>Cancelar / Voltar</button>
          <button className="btn btn-success" onClick={salvar}>Salvar / Enviar</button>
        </div>
      </div>

      <footer className="text-center mt-5 py-3">
        <div className="text-center mt-3 pt-3 border-top border-secondary">
          <p className="mb-1">Para Suporte:</p>
          <p className="mb-1">
            <i className="bi bi-envelope me-2"></i>
            <a href="mailto:suporte.visitafacil@epfiiz.ms.gov.br" className="text-black">suporte.visitafacil@epfiiz.ms.gov.br</a>
          </p>
          <p className="mb-1">
            © {new Date().getFullYear()} AGEPEN/MS - Todos os direitos reservados |
            Versão: 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}
