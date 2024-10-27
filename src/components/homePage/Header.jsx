// src/components/Header.js
import '../../scss/homePage-scss/header.scss';
import '../../scss/patterns.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import EmpresaModal from './EmpresaModal';
import LoginModal from './LoginModal';

function Header({ servicosRef, sobreNosRef  }) {
  const [showHoverCard, setShowHoverCard] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEmpresaModal, setShowEmpresaModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const scrollToServicos = () => {
    if (servicosRef.current) {
      servicosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSobreNos = () => {
    if (sobreNosRef.current) {
      sobreNosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header>
      <div className='buttons'>
        <div className='flex gap-20 logo' onClick={() => navigate('/')}>
          <img src='/logo.png' height={40} width={40} style={{ borderRadius: '15%' }} alt="logo"></img>
          <p>AccessAble</p>
        </div>
        <p className='sbnos' onClick={scrollToSobreNos}>Sobre nós </p>
        <p className='serv' onClick={scrollToServicos}>Serviços</p>
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
              <p onClick={() => setShowModal(true)}>Candidato</p>
              <p onClick={() => setShowEmpresaModal(true)}>Empresa</p>
            </div>
          )}
        </div>
        <button className='entrar' onClick={() => setShowLoginModal(true)}>Entrar</button>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)} />
      )}

      {showEmpresaModal && (
        <EmpresaModal onClose={() => setShowEmpresaModal(false)} />
      )}

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </header>
  );
}

export default Header;
