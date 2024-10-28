import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../scss/empresa-scss/minhasVagas.scss';
import '../../scss/empresa-scss/candidatoModal.scss';

function MinhasVagas() {
  const [activeTab, setActiveTab] = useState('abertas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVaga, setSelectedVaga] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [vagasAbertas, setVagasAbertas] = useState([]);
  const [vagasFechadas, setVagasFechadas] = useState([]);
  const [candidatos, setCandidatos] = useState([]); // Novo estado para candidatos


  const statusOptions = {
    'enviado': 'Enviado',
    'em-revisao': 'Em revisão',
    'selecionado': 'Selecionado',
    'recusado': 'Recusado'
  };

  const atualizarStatusCandidatura = async (candidaturaId, novoStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://api-accessable.vercel.app/candidatura/${candidaturaId}/status`, 
        { status: novoStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Atualiza a lista de candidatos localmente
      setCandidatos(candidatos.map(candidato => {
        if (candidato.candidatura_id === candidaturaId) {
          return { ...candidato, status: novoStatus };
        }
        return candidato;
      }));
      
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleStatusChange = async (candidaturaId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://api-accessable.vercel.app/candidaturas/${candidaturaId}/atualizar-status`, // Use o candidaturaId aqui
        { status: newStatus }, // Envie o novo status no corpo da requisição
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );
      console.log('Status atualizado com sucesso');
      
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };
  

  const fetchVagas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://api-accessable.vercel.app/empresa-busca/vagas', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data); 
      const { abertas, fechadas } = response.data;
      setVagasAbertas(abertas);
      setVagasFechadas(fechadas);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    }
  };

  useEffect(() => {
    fetchVagas(); // Carrega as vagas ao montar o componente
  }, []);

  const handleStatusClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDropdown = (vagaId) => {
    setDropdownOpen(dropdownOpen === vagaId ? null : vagaId);
  };

  const handleFecharVaga = async (vagaId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://api-accessable.vercel.app/empresa/vagas/${vagaId}/fechar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVagas(); // Atualiza a lista após fechar a vaga
    } catch (error) {
      console.error("Erro ao fechar a vaga:", error);
    }
    setDropdownOpen(null);
  };

  const handleReabrirVaga = async (vagaId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/empresa/vagas/${vagaId}/abrir`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchVagas(); // Atualiza a lista após reabrir a vaga
    } catch (error) {
      console.error("Erro ao reabrir a vaga:", error);
    }
    setDropdownOpen(null);
  };

  const fetchCandidatos = async (vagaId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://api-accessable.vercel.app/vaga/${vagaId}/candidatos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCandidatos(response.data); // Armazena os candidatos no estado
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
    }
  };

  const handleVerCandidatos = async (vaga) => {
    setSelectedVaga(vaga);
    await fetchCandidatos(vaga.id); // Busca candidatos ao abrir o modal
    setIsModalOpen(true);
    setDropdownOpen(null);
  };

  return (
    <div className='minhasVagas'>
      <h3>Minhas Vagas</h3>
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
              </div>
            ) : (
              <div className='vagas-list'>
                {vagasAbertas.map((vaga) => (
                <div key={vaga.id} className='vaga'>
                  <h4>{vaga.titulo_anuncio}</h4> {/* Altere para titulo_anuncio */}
                  <p>{vaga.local_trabalho} - {vaga.tipo_vaga}</p> {/* Altere para local_trabalho e tipo_vaga */}
                  <img 
                    src='/menuVagas.png' 
                    alt="menu" 
                    className='menu-icon' 
                    onClick={() => toggleDropdown(vaga.id)} 
                  />
                  {dropdownOpen === vaga.id && (
                    <div className='dropdown'>
                      <button onClick={() => handleVerCandidatos(vaga)}>
                        Ver Candidatos Inscritos
                      </button>
                      <button onClick={() => handleFecharVaga(vaga.id)}>
                        Fechar vaga
                      </button>
                    </div>
                  )}
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
                </div>
              ) : (
                <div className='vagas-list'>
                  {vagasFechadas.map((vaga) => (
                    <div key={vaga.id} className='vaga'>
                      <h4>{vaga.titulo_anuncio}</h4> {/* Verifique o nome correto aqui */}
                      <p>{vaga.local_trabalho} - {vaga.tipo_vaga}</p> {/* Verifique o nome correto aqui */}
                      <img 
                        src='/menuVagas.png' 
                        alt="menu" 
                        className='menu-icon' 
                        onClick={() => toggleDropdown(vaga.id)} 
                      />
                      {dropdownOpen === vaga.id && (
                        <div className='dropdown'>
                          <button onClick={() => handleReabrirVaga(vaga.id)}>
                            Abrir Vaga
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-title">
              <h2>Candidatos Inscritos</h2>
              <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <div className="candidatos-list">
              {candidatos.length === 0 ? (
                <p>Nenhum candidato inscrito.</p>
              ) : (
                candidatos.map((candidato, index) => (
                  <div key={index} className="candidato-item">
                    <div className="candidato-info">
                      <h4>{candidato.nome}</h4>
                      <p className="cargo">{candidato.cargo}</p>
                      <p className="cidade">{candidato.cidade}</p>
                    </div>
                    <div className="buttons-container">
                      <button className="ver-curriculo">Ver Currículo</button>
                      <select 
  value={candidato.status} 
  onChange={(e) => atualizarStatusCandidatura(candidato.candidatura_id, e.target.value)}
>
  {Object.entries(statusOptions).map(([value, label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ))}
</select>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinhasVagas;