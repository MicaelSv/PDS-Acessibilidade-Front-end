import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importe useLocation
import '../../scss/empresa-scss/headerEmpresa.scss';

function HeaderEmpresa() {
  const [activePage, setActivePage] = useState('Minha área');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Obtenha a localização atual
  const dropdownRef = useRef(null);

  const [nomeUsuario, setNomeEmpresa] = useState('');

  useEffect(() => {
    const nomeEmpresaStorage = localStorage.getItem('nomeUsuario'); // Obtém o nome do localStorage
    if (nomeEmpresaStorage) {
      setNomeEmpresa(nomeEmpresaStorage);
    }
  }, []);

  useEffect(() => {
    // Atualiza o activePage com base na localização
    switch (location.pathname) {
      case '/homeEmpresa':
        setActivePage('Minha área');
        break;
      case '/buscaCurriculos':
        setActivePage('Busca de currículos');
        break;
      case '/minhasVagas':
        setActivePage('Minhas vagas');
        break;
      default:
        setActivePage('Minha área');
    }
  }, [location]); // Dependência na localização

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
    localStorage.removeItem('token');
    setShowDropdown(false);
    navigate('/');
  };

  const handleDropdownItemClick = (item) => {
    if (item === 'Perfil') {
      navigate('/perfilEmpresa');
    } else if (item === 'Ajuda') {
      navigate('/ajuda');
    } else if (item === 'Sair') {
      handleLogout();
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
      <p>{nomeUsuario || 'Empresa'}</p>
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
          <p onClick={() => handleDropdownItemClick('Sair')}>Sair</p>
        </div>
      )}
    </div>
  </div>
  );
}

export default HeaderEmpresa;