import { useState } from 'react';
import '../../scss/empresa-scss/buscaCurriculos.scss';

function BuscaCurriculos() {
  const [keyword, setKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Lógica de busca aqui, por exemplo, redirecionar para uma página de resultados ou filtrar currículos
    console.log("Buscando por:", keyword);
  };

  return (
    <div className='buscaCurriculos'>
      <h3>Encontre novos currículos</h3>
      <p>Temos uma vasta seleção de currículos disponíveis para você!</p>
      {/* Formulário de busca */}
      <form onSubmit={handleSearch} className="searchForm">
        <input 
          type="text" 
          placeholder="Digite o cargo ou palavra-chave" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // Atualiza o valor do estado
          className="inputField"
        />
        <button type="submit" className="searchButton">Buscar</button>
      </form>
      <img src='src\assets\busca.png' height={300} width={345} style={{ borderRadius: '15%' }} alt="busca" className='img-busca'></img>
    </div>
  );
}

export default BuscaCurriculos;
