import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/homePage-scss/loginModal.scss';

function LoginModal({ onClose }) {
  const [isCandidate, setIsCandidate] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch('https://api-accessable.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const responseText = await response.text(); // Captura a resposta como textsso
      console.log(responseText); // Mostra a resposta

      const data = await response.json();

      if (response.ok) {
        // Salva o token no localStorage
        localStorage.setItem('token', data.token);

        // Verifica o tipo de usuário e redireciona para a página correspondente
        if (data.role === 'candidato') {
          navigate('/homeCandidato');
        } else if (data.role === 'empresa') {
          navigate('/homeEmpresa');
        }

        onClose();
      } else {
        // Trate o erro de login (ex. senha incorreta ou email não registrado)
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
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
