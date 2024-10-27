import { useState, useEffect  } from 'react';
import '../../scss/candidato-scss/perfilCandidato.scss'; // Arquivo SCSS específico para o perfil de usuário

function PerfilCandidato() {
  // Estado para armazenar email e senha
  const [email, setEmail] = useState('user@example.com');
  const [senha, setSenha] = useState('********');
  const [nome, setNome] = useState('');

  // Estado para controlar se os campos são editáveis ou não
  const [isEditable, setIsEditable] = useState(false);

  // Função para habilitar a edição dos campos
  const handleEdit = () => {
    setIsEditable(true);
  };

  // Função para salvar as alterações e desabilitar a edição
  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar os campos
    console.log('Email salvo:', email);
    console.log('Senha salva:', senha);
    setIsEditable(false); // Desabilita a edição após salvar
  };  

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nomeUsuario'); // Obtém o nome do localStorage
    if (nomeUsuario) {
      setNome(nomeUsuario);
    }
  }, []);

  return (
    <div className="perfilUsuario">
      <div className="tabs">
        <button className="active">Perfil</button>
      </div>

      <div className="containerCentral">
      <h1 className="nomeUsuario">{nome || 'Usuário'}</h1> {/* Exibe o nome do usuário ou "Usuário" */}

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
            disabled={!isEditable} // Torna o campo não editável se isEditable for false
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={!isEditable} // Torna o campo não editável se isEditable for false
          />
        </div>

        <div className="botoes">
          <button className="salvarBtn" onClick={handleSave}>
            Salvar
          </button>
          <button className="alterarBtn" onClick={handleEdit}>
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilCandidato;
