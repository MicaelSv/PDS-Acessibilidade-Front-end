import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../scss/candidato-scss/candidaturas.scss';

function Candidaturas() {
  const [filtro, setFiltro] = useState('');
  const [candidaturas, setCandidaturas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const etapasMap = {
    'enviado': 'Enviado',
    'em-revisao': 'Em revisão',
    'selecionado': 'Selecionado',
    'recusado': 'Recusado'
  };

  const etapas = Object.keys(etapasMap);

  useEffect(() => {
    async function fetchCandidaturas() {
      try {
        const response = await axios.get('https://api-accessable.vercel.app/candidaturas', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCandidaturas(response.data);
      } catch (error) {
        console.error('Erro ao buscar candidaturas:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCandidaturas();
  }, []);

  const candidaturasFiltradas = filtro === '' 
    ? candidaturas 
    : candidaturas.filter(candidatura => candidatura.etapa === filtro);

  return (
    <div className="candidaturas-container">
      <h2>Minhas Candidaturas</h2>
      <div className="filtro-container">
        <label htmlFor="filtro">Filtrar por status: </label>
        <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="">Todos</option>
          {etapas.map((etapa, index) => (
            <option key={index} value={etapa}>{etapasMap[etapa]}</option>
          ))}
        </select>
      </div>
      <div className="candidaturas-lista">
        {isLoading ? (
          <p>Carregando candidaturas...</p>
        ) : (
          candidaturasFiltradas.length > 0 ? (
            candidaturasFiltradas.map((candidatura, index) => (
              <div key={index} className="candidatura-item">
                <div className="candidatura-info">
                  <h3 className="vaga-titulo">{candidatura.vaga}</h3>
                  <p className="empresa-nome">
                    <img src={"icon-empresa.png"} alt="Ícone de Empresa" className="icone-empresa" />
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
                      className={`etapa ${candidatura.etapa === e ? 'ativa' : 'inativa'}`}
                    >
                      {etapasMap[e]}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="sem-candidaturas">Você não tem candidaturas ativas</p>
          )
        )}
      </div>
    </div>
  );
}

export default Candidaturas;