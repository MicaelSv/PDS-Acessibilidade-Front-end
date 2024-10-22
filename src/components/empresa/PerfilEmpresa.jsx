import { useState, useEffect } from 'react';
import '../../scss/empresa-scss/perfilEmpresa.scss';

function PerfilEmpresa() { 
  // Dados fictícios carregados para teste
  const dadosFicticios = {
    nomeEmpresa: 'FinNova Soluções',
    telefone: '(11) 1234-5678',
    cnpj: '12.345.678/0001-99',
    email: 'contato@finnova.com',
    linkedin: 'linkedin.com/company/finnova',
    localTrabalho: 'Remoto',
    sobreEmpresa: 'Soluções inovadoras para o mercado financeiro.'
  };

  // Estados para armazenar os campos
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [nomeTemporario, setNomeTemporario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [localTrabalho, setLocalTrabalho] = useState('');
  const [sobreEmpresa, setSobreEmpresa] = useState('');

  // Estado para controlar a aba ativa (perfil ou preferências)
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  // Estado para controlar se os campos são editáveis ou não
  const [editMode, setEditMode] = useState(false);

  // Carregar os dados fictícios ao montar o componente
  useEffect(() => {
    setNomeEmpresa(dadosFicticios.nomeEmpresa);
    setNomeTemporario(dadosFicticios.nomeEmpresa); // Inicializar o campo temporário com o nome
    setTelefone(dadosFicticios.telefone);
    setCnpj(dadosFicticios.cnpj);
    setEmail(dadosFicticios.email);
    setLinkedin(dadosFicticios.linkedin);
    setLocalTrabalho(dadosFicticios.localTrabalho);
    setSobreEmpresa(dadosFicticios.sobreEmpresa);
  }, []);

  // Função para salvar as alterações
  const handleSave = () => {
    setNomeEmpresa(nomeTemporario);
    setEditMode(false); // Desabilitar a edição após salvar
    // Adicione aqui lógica para salvar os outros campos também
  };

  // Função para ativar o modo de edição
  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <div className="perfilEmpresa">
      <div className="tabs">
        <button
          className={abaAtiva === 'perfil' ? 'active' : ''}
          onClick={() => setAbaAtiva('perfil')}
        >
          Perfil
        </button>
        <button
          className={abaAtiva === 'preferencias' ? 'active' : ''}
          onClick={() => setAbaAtiva('preferencias')}
        >
          Preferências
        </button>
      </div>

      <div className="containerCentral">
        {abaAtiva === 'perfil' && (
          <>
            <h1 className="nomeEmpresa">{nomeEmpresa}</h1>

            <div className="dadosPessoais">
              <h2>Dados Pessoais</h2>
            </div>

            <div className="campo">
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                type="text"
                value={nomeTemporario}
                onChange={(e) => setNomeTemporario(e.target.value)}
                disabled={!editMode} // Desabilitar se não estiver no modo de edição
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="telefone">Telefone:</label>
              <input
                id="telefone"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="cnpj">CNPJ:</label>
              <input
                id="cnpj"
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="linkedin">LinkedIn:</label>
              <input
                id="linkedin"
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>
          </>
        )}

        {abaAtiva === 'preferencias' && (
          <>
            <h2 className='preferenciasName'>Preferências para o anúncio de vagas</h2>

            <div className="campo">
              <label htmlFor="localTrabalho">Local de Trabalho:</label>
              <input
                id="localTrabalho"
                type="text"
                value={localTrabalho}
                onChange={(e) => setLocalTrabalho(e.target.value)}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="sobreEmpresa">Sobre a Empresa:</label>
              <textarea
                id="sobreEmpresa"
                value={sobreEmpresa}
                onChange={(e) => setSobreEmpresa(e.target.value)}
                rows="4"
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>
          </>
        )}

        <div className="buttonContainer">
          <button className="salvarBtn" onClick={handleSave} disabled={!editMode}>
            Salvar
          </button>
          <button className="alterarBtn" onClick={handleEdit} disabled={editMode}>
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilEmpresa;
