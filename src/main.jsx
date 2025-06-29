import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CadastroPage from './pages/CadastroPage.jsx';
import AgendamentoPage from './pages/AgendamentoPage.jsx';
import FamiliaresPage from './pages/FamiliaresPage';
import VisualizarAgendamentos from './pages/VisualizarAgendamentos';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/agendamento" element={<AgendamentoPage />} />
      <Route path="/familiares" element={<FamiliaresPage />} />
      <Route path="/visualizar-agendamentos" element={<VisualizarAgendamentos />} />
    </Routes>
  </BrowserRouter>
);
