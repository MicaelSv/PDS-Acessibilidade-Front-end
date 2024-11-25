import { useState, useEffect } from 'react';
import '../../scss/empresa-scss/buscaCurriculos.scss';

function BuscaCurriculos() {
  const [keyword, setKeyword] = useState('');
  const [resultados, setResultados] = useState([]); // Estado para armazenar resultados
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false);

  useEffect(() => {
    document.title = "Buscar currículos"; // Altere para o título desejado
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api-accessable.vercel.app/busca-curriculos?cargo=${encodeURIComponent(keyword)}`);
      if (!response.ok) {
        throw new Error('Erro na busca');
      }
      const data = await response.json();
      setResultados(data);
      setPesquisaRealizada(true);
    } catch (error) {
      console.error("Erro ao buscar currículos:", error);
      // Você pode adicionar um estado para mostrar mensagens de erro
      // setError('Não foi possível realizar a busca. Tente novamente.');
    }
  };

  const handleVerCurriculo = (id) => {
    window.open(`/CurriculoCandidato/${id}`, '_blank');
  };

  return (
    <div className='buscaCurriculos'>
      <h3>Encontre novos currículos</h3>
      <p>Temos uma vasta seleção de currículos disponíveis para você!</p>
      
      <form onSubmit={handleSearch} className="searchForm">
        <input 
          type="text" 
          placeholder="Digite o cargo" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="inputField"
        />
        <button type="submit" className="searchButton">Buscar</button>
      </form>

      {!pesquisaRealizada ? (
        <img 
          src='/busca.png' 
          height={300} 
          width={345} 
          alt="busca" 
          className='img-busca'
        />
      ) : (
        <div className="resultados-list">
          {resultados.length === 0 ? (
            <p>Nenhum resultado encontrado.</p>
          ) : (
            resultados.map((candidato, index) => (
              <div key={index} className="candidato-item">
                <div className="candidato-info">
                  <h4>{candidato.nome}</h4>
                  <p className="cargo">{candidato.cargo}</p>
                  <p className="cidade">{candidato.cidade}</p>
                </div>
                <div className="buttons-container">
                  <button 
                    className="ver-curriculo"
                    onClick={() => handleVerCurriculo(candidato.id)}
                  >
                    Ver Currículo
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default BuscaCurriculos;