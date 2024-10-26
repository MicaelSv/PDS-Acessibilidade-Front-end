import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/empresa-scss/headerEmpresa.scss';

function HeaderEmpresa() {
  const [activePage, setActivePage] = useState('Minha área');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handlePageClick = (page, path) => {
    setActivePage(page);
    navigate(path);
  };

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    setShowDropdown(false); // Fecha o dropdown
    navigate('/'); // Redireciona para a home
  };

  // Função para lidar com o clique no item do dropdown
  const handleDropdownItemClick = (item) => {
    if (item === 'Perfil') {
      navigate('/perfilEmpresa');  // Redireciona para a página de perfil da empresa
    } else if (item === 'Ajuda') {
      navigate('/ajuda');  // Exemplo: redireciona para a página de ajuda
    } else if (item === 'Sair') {
      // Lógica de logout, redirecionar ou limpar informações do usuário
      navigate('/login');  // Redireciona para a página de login, por exemplo
    }
  };

  return (
    <div className='headerEmpresa'>
      <div className='hbloco1'>
        <img src="/logo.png" height={40} width={40} style={{ borderRadius: '15%' }} alt='Logotipo' className='imgLogo' />
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

      <div className='hbloco3' ref={dropdownRef}>
        <p>FinNova Soluções</p>
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
            <p onClick={() => handleDropdownItemClick('Perfil')}>Perfil</p>
            <p onClick={() => handleDropdownItemClick('Ajuda')}>Ajuda</p>
            <p onClick={() => handleLogout('Sair')}>Sair</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderEmpresa;
