import { useState } from 'react';
import '../../scss/minhasVagas.scss';

function MinhasVagas() {
  const [activeTab, setActiveTab] = useState('abertas'); // Estado para controlar a aba ativa

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Atualiza o estado com a aba clicada
  };

  // Simulação de dados de vagas (você pode substituir por dados reais)
  const vagasAbertas = []; // Lista vazia para simular que não há vagas abertas
  const vagasFechadas = []; // Lista vazia para simular que não há vagas fechadas

  return (
    <div className='minhasVagas'>
      <h3>Minhas Vagas</h3>
      
      {/* Contêiner para os parágrafos Abertas e Fechadas */}
      <div className='tabs'>
        <p 
          className={activeTab === 'abertas' ? 'active' : ''} 
          onClick={() => handleTabClick('abertas')}
        >
          Abertas
        </p>
        <p 
          className={activeTab === 'fechadas' ? 'active' : ''} 
          onClick={() => handleTabClick('fechadas')}
        >
          Fechadas
        </p>
      </div>

      {/* Exibe o conteúdo com base na aba selecionada */}
      <div className='tabContent'>
        {activeTab === 'abertas' && (
          <div className='abertas'>
            {vagasAbertas.length === 0 ? (
              <div className='no-vagas'>
                <img 
                  src='src/assets/noVagas.png' 
                  height={170} 
                  width={200} 
                  style={{ borderRadius: '15%' }} 
                  alt="sem vagas" 
                  className='img-busca'
                />
                <h3>Você ainda não tem vagas abertas</h3>
                <p>Anuncie agora a sua vaga e comece a receber currículos</p>
                <button className='btn-anunciar'>Anunciar Vaga</button>
              </div>
            ) : (
              <p>Estas são suas vagas abertas:</p>
              // Aqui você pode listar as vagas abertas
            )}
          </div>
        )}

        {activeTab === 'fechadas' && (
          <div className='fechadas'>
            {vagasFechadas.length === 0 ? (
              <div className='no-vagas'>
                <h3 className='vagasFechadas'>Você ainda não tem vagas fechadas</h3>
                <p>Anuncie agora a sua vaga e comece a receber currículos</p>
                <button className='btn-anunciar'>Anunciar Vaga</button>
              </div>
            ) : (
              <p>Estas são suas vagas fechadas:</p>
              // Aqui você pode listar as vagas fechadas
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasVagas;
