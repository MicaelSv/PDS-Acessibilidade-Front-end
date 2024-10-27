import { useState, useEffect } from 'react';
import '../../scss/empresa-scss/perfilEmpresa.scss';

function PerfilEmpresa() { 

  // Estados para armazenar os campos
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [nomeTemporario, setNomeTemporario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [localTrabalho, setLocalTrabalho] = useState('');
  const [sobreEmpresa, setSobreEmpresa] = useState('');

  // Estado para controlar a aba ativa (perfil ou preferências)
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  // Estado para controlar se os campos são editáveis ou não
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const nomeEmpresaStorage = localStorage.getItem('nomeUsuario'); // Obtém o nome da empresa
    if (nomeEmpresaStorage) {
      setNomeEmpresa(nomeEmpresaStorage);
      setNomeTemporario(nomeEmpresaStorage); // Inicializa o campo temporário com o nome
    }

    // Dados fictícios, se necessário
    setTelefone('(11) 1234-5678');
    setCnpj('12.345.678/0001-99');
    setEmail('contato@finnova.com');
    setLocalTrabalho('Remoto');
    setSobreEmpresa('Soluções inovadoras para o mercado financeiro.');
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
      </div>

      <div className="containerCentral">
        {abaAtiva === 'perfil' && (
          <>
            <h1 className="nomeEmpresa">{nomeEmpresa || 'Empresa'}</h1>

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
