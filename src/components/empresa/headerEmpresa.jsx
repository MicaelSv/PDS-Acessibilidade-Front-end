import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar o hook useNavigate
import '../../scss/empresa-scss/headerEmpresa.scss';

function HeaderEmpresa() {
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
    <div className='headerEmpresa'>
      <div className='hbloco1'>
        <img src="src/assets/logo.png" height={40} width={40} style={{ borderRadius: '15%' }} alt='Logotipo' className='imgLogo'></img>
        <p>AccessAble</p>
      </div>

      <div className='hbloco2'>
        <p 
          className={activePage === 'Minha área' ? 'active' : ''} 
          onClick={() => handlePageClick('Minha área', '/homeEmpresa')}
        >
          Minha área
        </p>
        <p 
          className={activePage === 'Busca de currículos' ? 'active' : ''} 
          onClick={() => handlePageClick('Busca de currículos', '/buscaCurriculos')}
        >
          Busca de currículos
        </p>
        <p 
          className={activePage === 'Minhas vagas' ? 'active' : ''} 
          onClick={() => handlePageClick('Minhas vagas', '/minhasVagas')}
        >
          Minhas vagas
        </p>
      </div>

      <div className='hbloco3'>
        <p>FinNova Soluções</p>
        <img 
          src="src/assets/menubar.png" 
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

export default HeaderEmpresa;
