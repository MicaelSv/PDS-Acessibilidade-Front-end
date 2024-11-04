import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../scss/candidato-scss/perfilCandidato.scss';

function PerfilCandidato() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');
  const [senhaError, setSenhaError] = useState('');

  useEffect(() => {
    fetchPerfilData();
  }, []);

  const fetchPerfilData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://api-accessable.vercel.app/user/perfil', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNome(response.data.nome);
      setEmail(response.data.email);
      setOriginalEmail(response.data.email);
    } catch (error) {
      console.error('Erro ao buscar dados do perfil:', error);
    }
  };

  const handleEdit = () => {
    setIsEditable(true);
    setSenhaError('');
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = {};

      if (email !== originalEmail) {
        updatedData.email = email;
      }

      if (senha) {
        if (validatePassword(senha)) {
          updatedData.senha = senha;
        } else {
          setSenhaError('A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, números e caracteres especiais.');
          return;
        }
      }

      if (Object.keys(updatedData).length > 0) {
        const response = await axios.put('https://api-accessable.vercel.app/user/perfil', 
          updatedData,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log(response.data.message);
        setIsEditable(false);
        setSenha('');
        setOriginalEmail(email);
        setSenhaError('');
      } else {
        setIsEditable(false);
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <div className="perfilUsuario">
      <div className="tabs">
        <button className="active">Perfil</button>
      </div>

      <div className="containerCentral">
        <h1 className="nomeUsuario">{nome || 'Usuário'}</h1>

        <div className="dadosPessoais">
          <h2>Dados Pessoais</h2>
        </div>

        <div className="campo">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditable}
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setSenhaError('');
            }}
            disabled={!isEditable}
            placeholder={isEditable ? "Digite a nova senha" : "********"}
          />
          {senhaError && <p className="erro-senha">{senhaError}</p>}
        </div>

        <div className="botoes">
          {isEditable ? (
            <button className="salvarBtn" onClick={handleSave}>
              Salvar
            </button>
          ) : (
            <button className="alterarBtn" onClick={handleEdit}>
              Alterar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PerfilCandidato;