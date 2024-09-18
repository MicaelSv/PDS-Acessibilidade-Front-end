import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate
import '../../scss/candidato-scss/headerCandidato.scss'; // Criar um arquivo SCSS separado para o header do candidato

function HeaderCandidato() {
  const [activePage, setActivePage] = useState('Minha área');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePageClick = (page, path) => {
    setActivePage(page);
    navigate(path); // Navega para a rota correspondente
  };

  return (
    <div className='headerCandidato'>
      <div className='hbloco1'>
        <img src="/logo.png" height={40} width={40} style={{ borderRadius: '15%' }} alt='Logotipo' className='imgLogo'></img>
        <p>AccessAble</p>
      </div>

      <div className='hbloco2'>
        <p 
          className={activePage === 'Minha área' ? 'active' : ''} 
          onClick={() => handlePageClick('Minha área', '/homeCandidato')}
        >
          Minha área
        </p>
        <p 
          className={activePage === 'Candidaturas' ? 'active' : ''} 
          onClick={() => handlePageClick('Candidaturas', '/candidaturas')}
        >
          Candidaturas
        </p>
        <p 
          className={activePage === 'Currículo' ? 'active' : ''} 
          onClick={() => handlePageClick('Currículo', '/curriculo')}
        >
          Currículo
        </p>
      </div>

      <div className='hbloco3'>
        <p>Lucas</p>
        <img 
          src="/menubar.png" 
          height={18} 
          width={18} 
          className='menubar' 
          onClick={handleDropdownClick}
          alt='Menu'
        />
        {showDropdown && (
          <div className='dropdown-menu'>
            <p>Perfil</p>
            <p>Configurações</p>
            <p>Sair</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderCandidato;
