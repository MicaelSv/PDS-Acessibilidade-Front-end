import { useState } from 'react';
import '../../scss/empresa-scss/minhasVagas.scss';

function MinhasVagas() {
  const [activeTab, setActiveTab] = useState('abertas'); // Estado para controlar a aba ativa

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Atualiza o estado com a aba clicada
  };

  // Dados fictícios de vagas
  const vagasAbertas = [
    { id: 1, titulo: 'Desenvolvedor Front-end', local: 'São Paulo', tipo: 'Remota' },
    { id: 2, titulo: 'Designer UX/UI', local: 'Rio de Janeiro', tipo: 'Híbrida' }
  ];
  const vagasFechadas = [
    { id: 3, titulo: 'Analista de Dados', local: 'Belo Horizonte', tipo: 'Presencial' }
  ];

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
                  src='/noVagas.png' 
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
              <div className='vagas-list'>
                {vagasAbertas.map((vaga) => (
                  <div key={vaga.id} className='vaga'>
                    <h4>{vaga.titulo}</h4>
                    <p>{vaga.local} - {vaga.tipo}</p>
                    <img 
                      src='/menuVagas.png' 
                      alt="menu" 
                      className='menu-icon' 
                    />
                  </div>
                ))}
              </div>
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
              <div className='vagas-list'>
                {vagasFechadas.map((vaga) => (
                  <div key={vaga.id} className='vaga'>
                    <h4>{vaga.titulo}</h4>
                    <p>{vaga.local} - {vaga.tipo}</p>
                    <img 
                      src='/menuVagas.png' 
                      alt="menu" 
                      className='menu-icon' 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinhasVagas;
