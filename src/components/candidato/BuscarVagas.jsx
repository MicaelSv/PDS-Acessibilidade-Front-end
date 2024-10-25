import React, { useState } from 'react';
import '../../scss/candidato-scss/buscarVagas.scss';

function BuscarVagas() {
  const [buscaFeita, setBuscaFeita] = useState(false);
  const [query, setQuery] = useState('');
  const [termoBuscado, setTermoBuscado] = useState('');
  const [filtroDeficiencia, setFiltroDeficiencia] = useState('todas');
  const [modalAberto, setModalAberto] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('vaga');
  const [vagasFiltradas, setVagasFiltradas] = useState([]);

  const vagas = [
    {
      titulo: "Desenvolvedor Frontend",
      empresa: "Tech Solutions",
      localidade: "São Paulo - Presencial",
      inclusao: "Vaga destinada à todos os tipos de deficiência",
      salario: "R$ 5.000,00",
      quantidadeVagas: 2,
      tipoContrato: "CLT",
      descricaoVaga: "Desenvolvimento de interfaces utilizando React, participação em projetos inovadores...",
      descricaoEmpresa: "A Tech Solutions é uma empresa líder no mercado de desenvolvimento de software...",
      quantidadeFuncionarios: "50-100 funcionários"
    },
    {
      titulo: "Analista de Marketing",
      empresa: "Marketing Pro",
      localidade: "Rio de Janeiro - Híbrido",
      inclusao: "Vaga destinada à pessoas com deficiência auditiva",
      salario: "R$ 4.500,00",
      quantidadeVagas: 1,
      tipoContrato: "CLT",
      descricaoVaga: "Desenvolvimento de estratégias de marketing digital, gestão de campanhas...",
      descricaoEmpresa: "A Marketing Pro é uma agência especializada em marketing digital...",
      quantidadeFuncionarios: "20-50 funcionários"
    },
    {
      titulo: "Designer Gráfico",
      empresa: "Creative Minds",
      localidade: "Belo Horizonte - Home Office",
      inclusao: "Vaga destinada à pessoas com deficiência visual",
      salario: "A combinar",
      quantidadeVagas: 3,
      tipoContrato: "PJ",
      descricaoVaga: "Criação de peças gráficas, identidade visual, materiais para redes sociais...",
      descricaoEmpresa: "A Creative Minds é um estúdio de design reconhecido nacionalmente...",
      quantidadeFuncionarios: "10-20 funcionários"
    },
  ];

  const handleBuscarVagas = () => {
    if (query.trim() !== '') {
      const vagasFiltradas = vagas.filter(vaga => {
        const matchQuery = vaga.titulo.toLowerCase().includes(query.toLowerCase()) ||
                          vaga.empresa.toLowerCase().includes(query.toLowerCase());
        
        if (filtroDeficiencia === 'todas') {
          return matchQuery;
        }
        
        if (vaga.inclusao.toLowerCase().includes('todos os tipos')) {
          return matchQuery;
        }
        
        return matchQuery && vaga.inclusao.toLowerCase().includes(filtroDeficiencia);
      });

      setVagasFiltradas(vagasFiltradas);
      setBuscaFeita(true);
      setTermoBuscado(query);
    }
  };

  const abrirModal = (vaga) => {
    setVagaSelecionada(vaga);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setVagaSelecionada(null);
    setAbaAtiva('vaga');
  };

  return (
    <div className='bv-container'>
      <div className="bv-busca-container">
        <div className="bv-campo-busca">
          <img className="bv-lupa-icon" src="/lupa-buscarVagas.png" alt="Ícone de lupa" />
          <input
            type="text"
            placeholder="Digite o título da vaga ou a empresa..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select 
          className="bv-filtro-deficiencia"
          value={filtroDeficiencia}
          onChange={(e) => setFiltroDeficiencia(e.target.value)}
        >
          <option value="todas">Todas as deficiências</option>
          <option value="visual">Deficiência Visual</option>
          <option value="auditiva">Deficiência Auditiva</option>
          <option value="fisica">Deficiência Física</option>
          <option value="multipla">Deficiência Múltipla</option>
        </select>

        <button className="bv-buscar-btn" onClick={handleBuscarVagas}>
          Buscar Vagas
        </button>
      </div>

      {!buscaFeita && (
        <div className="bv-imagem-busca">
          <img src="/img-buscarVagas.png" alt="Imagem de busca" />
        </div>
      )}

      {buscaFeita && (
        <div className="bv-lista-vagas">
          <p>Mostrando resultados para: <strong>{termoBuscado}</strong></p>
          <div className="bv-vagas-container">
            {vagasFiltradas.map((vaga, index) => (
              <div className="bv-vaga-item" key={index} onClick={() => abrirModal(vaga)}>
                <h3>
                  <img src="/icone-vaga.png" alt="Ícone da vaga" className="bv-icon" />
                  {vaga.titulo}
                </h3>
                <h4>
                  <img src="/icone-empresa.png" alt="Ícone da empresa" className="bv-icon" />
                  {vaga.empresa}
                </h4>
                <p>
                  <img src="/icone-local.png" alt="Ícone da localidade" className="bv-icon" />
                  {vaga.localidade}
                </p>
                <p className='bv-vaga-inclusao'>{vaga.inclusao}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {modalAberto && vagaSelecionada && (
        <div className="bv-modal-overlay">
          <div className="bv-modal-content">
            <button className="bv-fechar-modal" onClick={fecharModal}>×</button>
            
            <div className="bv-modal-header">
              <div className="bv-header-info">
                <h2>{vagaSelecionada.titulo}</h2>
                <h3>{vagaSelecionada.empresa}</h3>
                <p className="bv-localidade">{vagaSelecionada.localidade}</p>
                <p className="bv-salario">{vagaSelecionada.salario}</p>
                <button className="bv-btn-candidatar">Candidatar-me</button>
              </div>
            </div>

            <div className="bv-modal-container">
              <div className="bv-modal-tabs">
                <button 
                  className={`bv-tab ${abaAtiva === 'vaga' ? 'ativa' : ''}`}
                  onClick={() => setAbaAtiva('vaga')}
                >
                  VAGA
                </button>
                <button 
                  className={`bv-tab ${abaAtiva === 'empresa' ? 'ativa' : ''}`}
                  onClick={() => setAbaAtiva('empresa')}
                >
                  EMPRESA
                </button>
              </div>

              <div className="bv-modal-body">
                {abaAtiva === 'vaga' ? (
                  <div className="bv-conteudo-vaga">
                    <div className="bv-info-item">
                      <strong className="bv-text-laranja">Quantidade de vagas:</strong>
                      <span>{vagaSelecionada.quantidadeVagas}</span>
                    </div>
                    <div className="bv-info-item">
                      <strong className="bv-text-laranja">Tipo de contrato:</strong>
                      <span>{vagaSelecionada.tipoContrato}</span>
                    </div>
                    <div className="bv-descricao-vaga">
                      <h4 className="bv-text-laranja">Descrição da vaga</h4>
                      <p>{vagaSelecionada.descricaoVaga}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bv-conteudo-empresa">
                    <div className="bv-info-item">
                      <strong className="bv-text-laranja">Porte da empresa:</strong>
                      <span>{vagaSelecionada.quantidadeFuncionarios}</span>
                    </div>
                    <div className="bv-descricao-empresa">
                      <h4 className="bv-text-laranja">Sobre a empresa</h4>
                      <p>{vagaSelecionada.descricaoEmpresa}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarVagas;