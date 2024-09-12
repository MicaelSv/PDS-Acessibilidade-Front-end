import '../../scss/index.scss';
import '../../scss/patterns.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header(){
  const [showHoverCard, setShowHoverCard] = useState(false);
  const navigate = useNavigate(); // Hook para navegar entre páginas

  return (
    <header>
      <div className='buttons'>
        <div className='flex gap-20 logo' onClick={() => navigate('/')}>
          <img src='src/assets/logo.png' height={40} width={40} style={{ borderRadius: '15%' }} alt="logo"></img>
          <p>AccessAble</p>
        </div>
        <p>Sobre nós</p>
        <p>Serviços</p>
      </div>
      <div className='login-group'>
        <div 
          className='cadastro-container'
          onMouseEnter={() => setShowHoverCard(true)}
          onMouseLeave={() => setShowHoverCard(false)}
        >
          <button className='cadastro'>Cadastre-se</button>
          {showHoverCard && (
            <div className='hovercard'>
              <p onClick={() => navigate('/candidato')}>Candidato</p>
              <p>Empresa</p>
            </div>
          )}
        </div>
        <button className='entrar'>Entrar</button>
      </div>
    </header>
  );
}

export default Header;
