import React, { useState, useEffect  } from 'react';
import '../../scss/candidato-scss/buscarVagas.scss';
import axios from 'axios';

function BuscarVagas() {
  const [buscaFeita, setBuscaFeita] = useState(false);
  const [query, setQuery] = useState('');
  const [termoBuscado, setTermoBuscado] = useState('');
  const [filtroDeficiencia, setFiltroDeficiencia] = useState('todas');
  const [modalAberto, setModalAberto] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('vaga');
  const [vagasFiltradas, setVagasFiltradas] = useState([]);
  const [candidaturaStatus, setCandidaturaStatus] = useState('');
  const [notificacao, setNotificacao] = useState({ 
    visivel: false, 
    mensagem: '', 
    tipo: '' 
  });

  useEffect(() => {
    document.title = "Buscar Vagas"; // Altere para o título desejado
  }, []);

  const handleBuscarVagas = async () => {
    if (query.trim() !== '') {
      try {
        // Busca as vagas
        const response = await axios.get('https://api-accessable.vercel.app/buscar-vagas', {
          params: {
            query: query,
            filtroDeficiencia: filtroDeficiencia
          }
        });
  
        // Salva a pesquisa
        const token = localStorage.getItem('token');
        await axios.post('https://api-accessable.vercel.app/pesquisas-recentes', 
          { termo: query },
          { headers: { Authorization: `Bearer ${token}` }}
        );
  
        setVagasFiltradas(response.data);
        setBuscaFeita(true);
        setTermoBuscado(query);
      } catch (error) {
        console.error("Erro:", error);
      }
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
    setCandidaturaStatus('');
  };

  const handleCandidatura = async () => {
    if (!vagaSelecionada || !vagaSelecionada.id) {
      console.error('ID da vaga não encontrado');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setNotificacao({
          visivel: true,
          mensagem: 'Você precisa estar logado para se candidatar!',
          tipo: 'erro'
        });
        return;
      }
      //https://api-accessable.vercel.app/candidatar
      const response = await axios.post('https://api-accessable.vercel.app/candidatar', {
        vaga_id: vagaSelecionada.id
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        fecharModal();
        setNotificacao({
          visivel: true,
          mensagem: 'Candidatura realizada com sucesso!',
          tipo: 'sucesso'
        });
        
        // Fechar a notificação automaticamente após 3 segundos
        setTimeout(() => {
          setNotificacao({ ...notificacao, visivel: false });
        }, 3000);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setNotificacao({
          visivel: true,
          mensagem: 'Você já se candidatou para esta vaga!',
          tipo: 'erro'
        });
      } else {
        setNotificacao({
          visivel: true,
          mensagem: 'Erro ao realizar candidatura. Tente novamente.',
          tipo: 'erro'
        });
      }
      console.error('Erro na candidatura:', error);
    }
  };

  return (
    <div className='bv-container'>

      {/* Componente de notificação */}
      {notificacao.visivel && (
        <div className={`notificacao-popup ${notificacao.tipo}`}>
          <div className="notificacao-conteudo">
            <span>{notificacao.mensagem}</span>
            <button onClick={() => setNotificacao({ ...notificacao, visivel: false })}>
              ×
            </button>
          </div>
        </div>
      )}

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
    <h2 className="bv-modal-titulo">
      <img src="/mala-branca.png" alt="Ícone da vaga" className="bv-icon" />
      <span>{vagaSelecionada.titulo}</span>
    </h2>
    <h3 className="bv-modal-empresa">
      <img src="/predio-branco.png" alt="Ícone da empresa" className="bv-icon" />
      <span>{vagaSelecionada.empresa}</span>
    </h3>
    <p className="bv-modal-localidade">
      <img src="/ping-branco.png" alt="Ícone da localidade" className="bv-icon" />
      <span>{vagaSelecionada.localidade}</span>
    </p>
    <p className="bv-salario">{vagaSelecionada.salario}</p>
    <button 
      className="bv-btn-candidatar"
      onClick={handleCandidatura}
    >
      Candidatar-me
    </button>
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
                      <strong className="bv-text-laranja">Porte da empresa (funcionários):</strong>
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
