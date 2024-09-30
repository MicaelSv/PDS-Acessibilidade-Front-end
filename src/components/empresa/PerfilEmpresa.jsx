import { useState } from 'react';
import '../../scss/empresa-scss/perfilEmpresa.scss';

function PerfilEmpresa() {
  // Estado para armazenar o nome da empresa e o nome temporário durante a edição
  const [nomeEmpresa, setNomeEmpresa] = useState('FinNova Soluções');
  const [nomeTemporario, setNomeTemporario] = useState(nomeEmpresa);

  // Estados para os outros campos
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');

  // Estados para os campos da aba "Preferências"
  const [localTrabalho, setLocalTrabalho] = useState('');
  const [sobreEmpresa, setSobreEmpresa] = useState('');

  // Estado para controlar a aba ativa (perfil ou preferências)
  const [abaAtiva, setAbaAtiva] = useState('perfil');

  // Função para salvar as alterações
  const handleSave = () => {
    setNomeEmpresa(nomeTemporario);
    // Aqui você pode adicionar lógica para salvar os outros campos também
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
              />
            </div>

            <div className="campo">
              <label htmlFor="telefone">Telefone:</label>
              <input
                id="telefone"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="cnpj">CNPJ:</label>
              <input
                id="cnpj"
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="campo">
              <label htmlFor="linkedin">LinkedIn:</label>
              <input
                id="linkedin"
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
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
              />
            </div>

            <div className="campo">
              <label htmlFor="sobreEmpresa">Sobre a Empresa:</label>
              <textarea
                id="sobreEmpresa"
                value={sobreEmpresa}
                onChange={(e) => setSobreEmpresa(e.target.value)}
                rows="4"
              />
            </div>
          </>
        )}

        <button className="salvarBtn" onClick={handleSave}>
          Salvar
        </button>
      </div>
    </div>
  );
}

export default PerfilEmpresa;
