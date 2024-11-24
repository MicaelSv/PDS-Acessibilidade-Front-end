  import { useState, useEffect } from 'react'; // Importando useEffect
  import '../../scss/homePage-scss/empresaModal.scss';

  function EmpresaModal({ onClose }) {
    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [numeroFuncionarios, setNumeroFuncionarios] = useState('');
    const [selectedState, setSelectedState] = useState(''); // Adicionei selectedState
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefoneFixo, setTelefoneFixo] = useState('');
    const [sobreEmpresa, setSobreEmpresa] = useState('');
    const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState('');

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    const validateCNPJ = (cnpj) => {
      const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
      return cnpjRegex.test(cnpj);
    };

    const validatePhone = (phone) => {
      const phoneRegex = /^\(\d{2}\)\s\d{4}-\d{4}$/;
      return phoneRegex.test(phone);
    };

    // Fetch estados
    useEffect(() => {
      fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
        .then(response => response.json())
        .then(data => setStates(data))
        .catch(error => console.error('Erro ao buscar estados:', error));
    }, []);

    // Fetch cidades baseado no estado selecionado
    useEffect(() => {
      if (selectedState) {
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
          .then(response => response.json())
          .then(data => setCities(data))
          .catch(error => console.error('Erro ao buscar cidades:', error));
      } else {
        setCities([]);
      }
    }, [selectedState]);

    const checkEmail = async (email) => {
      try {
        const response = await fetch('/api/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email })
        });

        if (!response.ok) {
          
          const data = await response.json();
          return data.message;
        }
        return null;
      } catch (error) {
        console.error('Erro ao verificar email:', error);
        return 'Erro ao verificar email';
      }
    };

    const validateForm = async () => {
      let newErrors = {};
      let isValid = true;

      if (!nomeEmpresa.trim()) {
        newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
        isValid = false;
      }

      if (!cnpj.trim()) {
        newErrors.cnpj = 'CNPJ é obrigatório';
        isValid = false;
      } else if (!validateCNPJ(cnpj)) {
        newErrors.cnpj = 'CNPJ inválido';
        isValid = false;
      }

      if (!numeroFuncionarios || numeroFuncionarios <= 0) {
        newErrors.numeroFuncionarios = 'Número de funcionários deve ser maior que zero';
        isValid = false;
      }

      if (!cidade.trim()) {
        newErrors.cidade = 'Cidade é obrigatória';
        isValid = false;
      }

      if (!email.trim()) {
        newErrors.email = 'Email é obrigatório';
        isValid = false;
      } else if (!validateEmail(email)) {
        newErrors.email = 'Email inválido';
        isValid = false;
      } else {
        const emailErrorMessage = await checkEmail(email);
        if (emailErrorMessage) {
          newErrors.email = emailErrorMessage;
          isValid = false;
        }
      }

      if (!senha) {
        newErrors.senha = 'Senha é obrigatória';
        isValid = false;
      } else if (!validatePassword(senha)) {
        newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial';
        isValid = false;
      }

      if (!telefoneFixo.trim()) {
        newErrors.telefoneFixo = 'Telefone fixo é obrigatório';
        isValid = false;
      } else if (!validatePhone(telefoneFixo)) {
        newErrors.telefoneFixo = 'Telefone fixo inválido';
        isValid = false;
      }

      if (!sobreEmpresa.trim()) {
        newErrors.sobreEmpresa = 'Descrição da empresa é obrigatória';
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const isValid = await validateForm();
    
      if (isValid) {
        const empresaData = {
          nome_empresa: nomeEmpresa,
          cnpj,
          numero_funcionarios: numeroFuncionarios,
          cidade,
          email,
          senha,
          telefone_fixo: telefoneFixo,
          sobre_empresa: sobreEmpresa,
        };
    
        try {
          const response = await fetch('/api/register/empresa', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(empresaData),
          });
    
          if (response.ok) {
            const notification = document.createElement('div');
            notification.className = 'success-notification';
            notification.textContent = 'Empresa registrada com sucesso!';
            document.body.appendChild(notification);
            onClose();
            setTimeout(() => {
              document.body.removeChild(notification);
            }, 3000);
          } else {
            const errorData = await response.json();
            console.error('Erro no registro:', errorData);
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      }
    };

    const formatCNPJ = (value) => {
      return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substr(0, 18);
    };

    const formatPhone = (value) => {
      let phone = value.replace(/\D/g, '');
      phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
      phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');
      return phone;
    };

    return (
      <div className="empresa-modal-overlay">
        <div className="empresa-modal-content">
          <button className="empresa-close-button" onClick={onClose}>X</button>
          <div className="empresa-modal-body">
            <div className="empresa-modal-left">
              <img src="/img-empresa_modal.jpg" alt="Empresa" />
            </div>
            <div className="empresa-modal-right">
              <h2>Registro de Empresa</h2>
              <form onSubmit={handleSubmit}>
                <label>Nome da Empresa</label>
                <input 
                  type="text" 
                  placeholder="Digite o nome da empresa" 
                  value={nomeEmpresa}
                  onChange={(e) => setNomeEmpresa(e.target.value)} 
                  className={errors.nomeEmpresa ? 'error' : ''}
                />
                {errors.nomeEmpresa && <span className="error-message">{errors.nomeEmpresa}</span>}

                <label>CNPJ</label>
                <input 
                  type="text" 
                  placeholder="Digite o CNPJ da empresa" 
                  value={cnpj}
                  onChange={(e) => setCnpj(formatCNPJ(e.target.value))} 
                  className={errors.cnpj ? 'error' : ''}
                  maxLength="18"
                />
                {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}

                <div className="empresa-flex-group">
                  <div>
                    <label>Número de Funcionários</label>
                    <input 
                      type="number" 
                      placeholder="Digite o nº de funcionários" 
                      className={`empresa-number-funcionarios ${errors.numeroFuncionarios ? 'error' : ''}`}
                      value={numeroFuncionarios}
                      onChange={(e) => setNumeroFuncionarios(e.target.value)} 
                    />
                    {errors.numeroFuncionarios && <span className="error-message">{errors.numeroFuncionarios}</span>}
                  </div>
                </div>

                <div className="empresa-flex-group">
                  <div>
                    <label>Estado</label>
                    <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                      <option value="">Selecione um estado</option>
                      {states.map(state => (
                        <option key={state.id} value={state.sigla}>
                          {state.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Cidade</label>
                    <select 
                      value={cidade} 
                      onChange={(e) => setCidade(e.target.value)} 
                      disabled={!selectedState}
                    >
                      <option value="">Selecione uma cidade</option>
                      {cities.map(city => (
                        <option key={city.id} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="empresa-flex-group">
                  <div>
                    <label>Email Corporativo</label>
                    <input 
                      type="email" 
                      placeholder="Digite o email corporativo" 
                      className={`empresa-email ${errors.email ? 'error' : ''}`}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors(prev => ({ ...prev, email: '' }));
                      }}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                  <div>
                    <label>Senha</label>
                    <input 
                      type="password" 
                      placeholder="Digite a senha" 
                      className={`empresa-senha ${errors.senha ? 'error' : ''}`}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)} 
                    />
                    {errors.senha && <span className="error-message">{errors.senha}</span>}
                  </div>
                </div>

                <label>Telefone Fixo</label>
                <input 
                  type="text" 
                  placeholder="Digite o telefone fixo" 
                  value={telefoneFixo}
                  onChange={(e) => setTelefoneFixo(formatPhone(e.target.value))} 
                  className={errors.telefoneFixo ? 'error' : ''}
                  maxLength="14"
                />
                {errors.telefoneFixo && <span className="error-message">{errors.telefoneFixo}</span>}

                <label>Sobre a Empresa</label>
                <input 
                  placeholder="Descreva a empresa" 
                  value={sobreEmpresa}
                  onChange={(e) => setSobreEmpresa(e.target.value)} 
                  className={errors.sobreEmpresa ? 'error' : ''}
                />
                {errors.sobreEmpresa && <span className="error-message">{errors.sobreEmpresa}</span>}

                <button type="submit" className="empresa-submit-button">Registrar Empresa</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default EmpresaModal;