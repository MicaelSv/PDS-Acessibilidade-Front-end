import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/candidato-scss/headerCandidato.scss';

function HeaderCandidato() {
  const [activePage, setActivePage] = useState('Minha área');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const [usuarioNome, setUsuarioNome] = useState(''); // Estado para armazenar o nome do usuário

  useEffect(() => {
    const nome = localStorage.getItem('nomeUsuario'); // Obtém o nome do localStorage
    if (nome) {
      setUsuarioNome(nome);
    }
  }, []);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handlePageClick = (page, path) => {
    setActivePage(page);
    navigate(path);
  };

  const handleProfileClick = () => {
    navigate('/perfilCandidato');
    setShowDropdown(false); // Fechar dropdown após o clique
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    setShowDropdown(false); // Fecha o dropdown
    navigate('/'); // Redireciona para a home
  };

  // Fechar o dropdown ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.dropdown-menu') || event.target.closest('.menubar')) {
        return;
      }
      closeDropdown();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='headerCandidato'>
      <div className='hbloco1'>
        <img src="/logo.png" height={40} width={40} style={{ borderRadius: '15%' }} alt='Logotipo' className='imgLogo' />
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
      <p>{usuarioNome || 'Usuário'}</p> 
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
            <p onClick={handleProfileClick}>Configurações</p>
            <p onClick={handleLogout}>Sair</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderCandidato;
