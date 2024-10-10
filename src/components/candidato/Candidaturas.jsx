import React, { useState } from 'react';
import '../../scss/candidato-scss/candidaturas.scss';

function Candidaturas() {
  const [filtro, setFiltro] = useState('');
  const etapas = ['Recebido', 'Pré-selecionado', 'Finalista'];

  const candidaturas = [
    { vaga: 'Desenvolvedor Front-end', empresa: 'TechCorp', estado: 'SP', etapa: 2 },
    { vaga: 'Analista de Dados', empresa: 'DataInc', estado: 'RJ', etapa: 1 },
    { vaga: 'Designer UX/UI', empresa: 'CreativeLab', estado: 'MG', etapa: 0 },
    { vaga: 'Gerente de Projetos', empresa: 'ProjectMaster', estado: 'BA', etapa: 2 },
    { vaga: 'Especialista em Marketing Digital', empresa: 'AdSolutions', estado: 'PR', etapa: 1 },
  ];

  const candidaturasFiltradas = filtro === '' ? candidaturas : candidaturas.filter(candidatura => etapas[candidatura.etapa] === filtro);

  return (
    <div className="candidaturas-container">
      <h2>Minhas Candidaturas</h2>
      <div className="filtro-container">
        <label htmlFor="filtro">Filtrar por status: </label>
        <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todos</option>
          {etapas.map((etapa, index) => (
            <option key={index} value={etapa}>{etapa}</option>
          ))}
        </select>
      </div>
      <div className="candidaturas-lista">
        {candidaturasFiltradas.map((candidatura, index) => (
          <div key={index} className="candidatura-item">
            <div className="candidatura-info">
              <h3 className="vaga-titulo">{candidatura.vaga}</h3>
              <p className="empresa-nome">
                <img src={"icon-empresa.png"} alt="Ícone de Empresa" className="icone-empresa" /> {/* Ícone da empresa */}
                {candidatura.empresa}
              </p>
              <p className="localizacao">
                <img src="locale.png" alt="Ícone de localização" className="icone-localizacao" />
                {candidatura.estado}
              </p>
            </div>
            <div className="etapas-candidatura">
              {etapas.map((e, i) => (
                <div
                  key={i}
                  className={`etapa ${candidatura.etapa === i ? 'ativa' : 'inativa'}`}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Candidaturas;
