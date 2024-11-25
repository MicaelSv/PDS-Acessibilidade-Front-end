import React, { useState, useEffect } from 'react';
import '../../scss/candidato-scss/minhaAreaCandidato.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MinhaAreaCandidato() {
  const navigate = useNavigate();
  const [pesquisasRecentes, setPesquisasRecentes] = useState([]);
  const [usuarioNome, setUsuarioNome] = useState('');
  const [estatisticas, setEstatisticas] = useState({
    curriculosEnviados: 0,
    candidaturasSelecionadas: 0,
  });
  const [profileStrength, setProfileStrength] = useState(0);

  useEffect(() => {
    document.title = "Minha área";

    const nome = localStorage.getItem('nomeUsuario');
    if (nome) {
      setUsuarioNome(nome);
    }

    const fetchEstatisticas = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api-accessable.vercel.app/user/estatisticas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Response:', response);
        setEstatisticas({
          curriculosEnviados: response.data.curriculos_enviados,
          candidaturasSelecionadas: response.data.candidaturas_selecionadas,
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas', error);
      }
    };

    const fetchCurriculumStrength = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api-accessable.vercel.app/user/curriculum-strength', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileStrength(response.data.curriculum_strength);
      } catch (error) {
        console.error('Erro ao buscar força do currículo', error);
      }
    };

    fetchEstatisticas();
    fetchCurriculumStrength(); // Chama a função para buscar a força do currículo
  }, []);
   

  useEffect(() => {
    const fetchPesquisasRecentes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://api-accessable.vercel.app/pesquisas-recentes', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPesquisasRecentes(response.data);
      } catch (error) {
        console.error('Erro ao buscar pesquisas recentes:', error);
      }
    };

    fetchPesquisasRecentes();
  }, []);  


  const handleVerMaisVagas = () => {
    navigate('/buscarVagas');
  }
  
  return (
    <div className='AreaCandidato'>
      <h3 className='msg-inicial'>Seja bem vindo, {usuarioNome || 'Usuário'}!</h3>

      <div className='contentArea'>
        <div className='esquerda'>
          <p>Suas estatísticas</p>

          <div className="stats-container">
            <div className="stat-box">
              <p className="stat-number">{estatisticas.curriculosEnviados}</p>
              <p className="stat-description">Currículos enviados</p>
            </div>

            <div className="stat-box">
              <p className="stat-number-2">{estatisticas.candidaturasSelecionadas}</p>
              <p className="stat-description">Candidaturas selecionadas</p>
            </div>
          </div>

          <p>Seu perfil</p>

          <div className="profile-strength">
            <p>Força do currículo</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${profileStrength}%` }}>
                <span className="progress-text">{profileStrength}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className='meio'>
          <h3>Vagas que podem ser de seu interesse</h3>

          <div className="vaga-lista">
            <div className="vaga-item">
              <h4 className="vaga-titulo">Desenvolvedor Front-End</h4>
              <p className="vaga-empresa">Empresa ABC</p>
              <p className="vaga-localidade">São Paulo, SP</p>
              <hr className="vaga-divisor" />
            </div>

            <div className="vaga-item">
              <h4 className="vaga-titulo">Designer Gráfico</h4>
              <p className="vaga-empresa">Empresa XYZ</p>
              <p className="vaga-localidade">Rio de Janeiro, RJ</p>
              <hr className="vaga-divisor" />
            </div>

            <div className="vaga-item">
              <h4 className="vaga-titulo">Analista de Dados</h4>
              <p className="vaga-empresa">Empresa DataCorp</p>
              <p className="vaga-localidade">Belo Horizonte, MG</p>
              <hr className="vaga-divisor" />
            </div>

            <div className="vaga-item">
              <h4 className ="vaga-titulo">Desenvolvedor Back-End</h4>
              <p className="vaga-empresa">Empresa ABC</p>
              <p className="vaga-localidade">São Paulo, SP</p>
              <hr className="vaga-divisor" />
            </div>
          </div>

          <button className="ver-mais-btn" onClick={handleVerMaisVagas}>
            Ver mais vagas
          </button>
        </div>

        <div className='direita'>
  <h3>Suas pesquisas recentes</h3>
  {pesquisasRecentes.length > 0 ? (
    pesquisasRecentes.map((pesquisa) => (
      <div className="pesquisa-recente" key={pesquisa.id}>
        <img className="lupa-icon" src="/lupa-pesquisa.png" alt="Ícone de lupa" />
        <div className="pesquisa-info">
          <p>{pesquisa.termo}</p>
        </div>
      </div>
    ))
  ) : (
    <p className="sem-pesquisas">Você ainda não fez nenhuma pesquisa</p>
  )}
</div>
      </div>
  </div>
  );
}

export default MinhaAreaCandidato;