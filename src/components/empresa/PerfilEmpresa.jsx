import { useState, useEffect } from 'react';
import '../../scss/empresa-scss/perfilEmpresa.scss';

function PerfilEmpresa() { 

  // Estados para armazenar os campos
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [nomeTemporario, setNomeTemporario] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [localTrabalho, setLocalTrabalho] = useState('');
  const [sobreEmpresa, setSobreEmpresa] = useState('');

  const [abaAtiva, setAbaAtiva] = useState('perfil');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const nomeEmpresaStorage = localStorage.getItem('nomeUsuario');
    if (nomeEmpresaStorage) {
      setNomeEmpresa(nomeEmpresaStorage);
      setNomeTemporario(nomeEmpresaStorage);
    }
  }, []);


  useEffect(() => {
    const fetchEmpresaData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const response = await fetch('https://api-accessable.vercel.app/dados_empresa', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                throw new Error('Sessão expirada. Por favor, faça login novamente.');
            }

            const data = await response.json();

            if (response.ok) {
                setNomeEmpresa(data.nome_empresa);
                setNomeTemporario(data.nome_empresa);
                setTelefone(data.telefone_fixo || '');
                setCnpj(data.cnpj || '');
                setEmail(data.email || '');
                setSobreEmpresa(data.sobre_empresa || '');
            } else {
                throw new Error(data.erro || 'Erro ao carregar dados da empresa');
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert(error.message || 'Erro ao carregar dados da empresa');
        }
    };

    fetchEmpresaData();
}, []);

  const formatCNPJ = (value) => {
  // Remove tudo que não é número
  let cnpj = value.replace(/\D/g, '');
  
  // Coloca a formatação enquanto o usuário digita
  if (cnpj.length <= 14) {
      cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
      cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
      cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
  }
  
  return cnpj;
};

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const formatPhone = (value) => {
    let phone = value.replace(/\D/g, '');
    
    if (phone.length <= 11) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    
    return phone;
  };

  const handleSave = async () => {
    if (!validateEmail(email)) {
        setEmailError('Por favor, insira um email válido');
        return;
    }

    try {
        const token = localStorage.getItem('token'); // Assume que você armazena o token no localStorage
        if (!token) {
            throw new Error('Token não encontrado');
        }

        const response = await fetch('https://api-accessable.vercel.app/atualizar_empresa', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho
            },
            body: JSON.stringify({
                nome_empresa: nomeTemporario,
                email: email,
                telefone_fixo: telefone,
                cnpj: cnpj,
                sobre_empresa: sobreEmpresa
            })
        });

        if (response.status === 401) {
            // Token expirado ou inválido
            throw new Error('Sessão expirada. Por favor, faça login novamente.');
        }

        const data = await response.json();

        if (response.ok) {
            setNomeEmpresa(nomeTemporario);
            setEditMode(false);
            setEmailError('');
            alert('Dados atualizados com sucesso!');
        } else {
            alert(data.erro || 'Erro ao atualizar dados');
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        alert(error.message || 'Erro ao conectar com o servidor');
    }
};

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
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
              />
            </div>

            <div className="campo">
              <label htmlFor="telefone">Telefone:</label>
              <input
                id="telefone"
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(formatPhone(e.target.value))}
                disabled={!editMode}
                className={editMode ? 'editable' : 'disabled'}
                maxLength="15"
              />
            </div>

            <div className="campo">
    <label htmlFor="cnpj">CNPJ:</label>
    <input
        id="cnpj"
        type="text"
        value={cnpj}
        onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
        disabled={!editMode}
        className={editMode ? 'editable' : 'disabled'}
        maxLength="18" // XX.XXX.XXX/XXXX-XX (18 caracteres)
    />
</div>

            <div className="campo">
              <label htmlFor="email">Email:</label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!validateEmail(e.target.value) && e.target.value !== '') {
                      setEmailError('Por favor, insira um email válido');
                    } else {
                      setEmailError('');
                    }
                  }}
                  disabled={!editMode}
                  className={editMode ? 'editable' : 'disabled'}
                />
                {emailError && <span className="error-message-email">{emailError}</span>}
              </div>
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
          <button 
            className="salvarBtn" 
            onClick={handleSave} 
            disabled={!editMode || emailError}
          >
            Salvar
          </button>
          <button 
            className="alterarBtn" 
            onClick={handleEdit} 
            disabled={editMode}
          >
            Alterar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerfilEmpresa;