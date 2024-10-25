import React from 'react';
import '../../scss/candidato-scss/minhaAreaCandidato.scss';
import { useNavigate } from 'react-router-dom';


function MinhaAreaCandidato() {

  const navigate = useNavigate(); // Hook para navegação

  const handleVerMaisVagas = () => {
    navigate('/buscarVagas');
  }
  
  return (
    <div className='AreaCandidato'>
      <h3 className='msg-inicial'>Seja bem vindo, Lucas!</h3>

      <div className='contentArea'>
        {/* Esquerda - Estatísticas */}
        <div className='esquerda'>
          <p>Suas estatísticas</p>

          <div className="stats-container">
            <div className="stat-box">
              <p className="stat-number">2</p>
              <p className="stat-description">Currículos enviados</p>
            </div>

            <div className="stat-box">
              <p className="stat-number">5</p>
              <p className="stat-description">Candidaturas aceitas</p>
            </div>
          </div>

          <p>Seu perfil</p>

          <div className="profile-strength">
            <p>Força do currículo</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: '45%' }}>
                <span className="progress-text">45%</span>
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
              <h4 className="vaga-titulo">Gerente de Projetos</h4>
              <p className="vaga-empresa">Empresa Gestão+</p>
              <p className="vaga-localidade">Curitiba, PR</p>
              <hr className="vaga-divisor" />
            </div>

            <div className="vaga-item">
              <h4 className="vaga-titulo">Engenheiro de Software</h4>
              <p className="vaga-empresa">Empresa TechSolution</p>
              <p className="vaga-localidade">Florianópolis, SC</p>
              <hr className="vaga-divisor" />
            </div>
          </div>

          <button className='ver-mais-btn' onClick={handleVerMaisVagas}>Ver mais vagas</button>

        </div>

        <div className='direita'>
          <h3>Suas pesquisas recentes</h3>
          <div className="pesquisa-recente">
            <img className="lupa-icon" src="/lupa-pesquisa.png" alt="Ícone de lupa" />
            <div className="pesquisa-info">
              <p>Gerente de operações</p>
              <p>10 novas vagas</p>
            </div>
          </div>

          <div className="pesquisa-recente">
            <img className="lupa-icon" src="/lupa-pesquisa.png" alt="Ícone de lupa" />
            <div className="pesquisa-info">
              <p>Consultor de negócios</p>
              <p>7 novas vagas</p>
            </div>
          </div>

          <div className="pesquisa-recente">
            <img className="lupa-icon" src="/lupa-pesquisa.png" alt="Ícone de lupa" />
            <div className="pesquisa-info">
              <p>Analista de dados</p>
              <p>3 novas vagas</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default MinhaAreaCandidato;