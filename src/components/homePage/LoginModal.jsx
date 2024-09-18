import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/homePage-scss/loginModal.scss';

function LoginModal({ onClose }) {
  const [isCandidate, setIsCandidate] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você deve adicionar lógica para verificar credenciais e autenticar o usuário

    if (isCandidate) {
      navigate('/home-candidato');
    } else {
      navigate('/homeEmpresa');
    }

    onClose();
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="login-modal-body">
          <div className="login-modal-tabs">
            <button
              className={`login-tab ${isCandidate ? 'active' : ''}`}
              onClick={() => setIsCandidate(true)}
            >
              Candidato
            </button>
            <button
              className={`login-tab ${!isCandidate ? 'active' : ''}`}
              onClick={() => setIsCandidate(false)}
            >
              Empresa
            </button>
          </div>
          <div className="login-form">
            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Senha</label>
              <input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" className="login-button">
                Entrar como {isCandidate ? 'Candidato' : 'Empresa'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;