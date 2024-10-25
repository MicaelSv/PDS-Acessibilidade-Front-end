import { useState } from 'react';
import '../../scss/homePage-scss/empresaModal.scss';

function EmpresaModal({ onClose }) {
  // Estados para armazenar os dados do formulário
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [numeroFuncionarios, setNumeroFuncionarios] = useState('');
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefoneFixo, setTelefoneFixo] = useState('');
  const [sobreEmpresa, setSobreEmpresa] = useState('');

  // Estados para armazenar os erros
  const [errors, setErrors] = useState({
    nomeEmpresa: '',
    cnpj: '',
    numeroFuncionarios: '',
    cidade: '',
    email: '',
    senha: '',
    telefoneFixo: '',
    sobreEmpresa: ''
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validação do Nome da Empresa
    if (!nomeEmpresa.trim()) {
      newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
      isValid = false;
    } else if (nomeEmpresa.trim().length < 3) {
      newErrors.nomeEmpresa = 'Nome da empresa deve ter pelo menos 3 caracteres';
      isValid = false;
    }

    // Validação do CNPJ
    if (!cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
      isValid = false;
    } else if (cnpj.length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
      isValid = false;
    }

    // Validação do Número de Funcionários
    if (!numeroFuncionarios) {
      newErrors.numeroFuncionarios = 'Número de funcionários é obrigatório';
      isValid = false;
    } else if (isNaN(numeroFuncionarios) || numeroFuncionarios < 0) {
      newErrors.numeroFuncionarios = 'Número de funcionários inválido';
      isValid = false;
    }

    // Validação da Cidade
    if (!cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
      isValid = false;
    }

    // Validação do Email
    if (!email) {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Validação da Senha
    if (!senha) {
      newErrors.senha = 'Senha é obrigatória';
      isValid = false;
    } else if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[a-z]/.test(senha) || !/\d/.test(senha) || !/[@$!%*?&]/.test(senha)) {
      newErrors.senha = 'A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial';
      isValid = false;
    }

    // Validação do Telefone Fixo
    if (!telefoneFixo) {
      newErrors.telefoneFixo = 'Telefone fixo é obrigatório';
      isValid = false;
    } else if (!/^\(\d{2}\)\s?\d{5}-\d{4}$/.test(telefoneFixo)) {
      newErrors.telefoneFixo = 'Telefone fixo inválido';
      isValid = false;
    }

    // Validação do Campo "Sobre a Empresa"
    if (!sobreEmpresa.trim()) {
      newErrors.sobreEmpresa = 'Informações sobre a empresa são obrigatórias';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const empresaData = {
        nome_empresa: nomeEmpresa,
        cnpj,
        numero_funcionarios: numeroFuncionarios,
        cidade,
        email,
        senha,
        telefone_fixo: telefoneFixo,
        sobre_empresa: sobreEmpresa
      };

      try {
        const response = await fetch('/api/register/empresa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(empresaData)
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
                required 
                value={nomeEmpresa}
                onChange={(e) => setNomeEmpresa(e.target.value)} 
                className={errors.nomeEmpresa ? 'error' : ''}
              />
              {errors.nomeEmpresa && <span className="error-message">{errors.nomeEmpresa}</span>}

              <label>CNPJ</label>
              <input 
                type="text" 
                placeholder="Digite o CNPJ da empresa" 
                required 
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)} 
                className={errors.cnpj ? 'error' : ''}
              />
              {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}

              <div className="empresa-flex-group">
                <div>
                  <label>Número de Funcionários</label>
                  <input 
                    type="number" 
                    placeholder="Digite o nº de funcionários" 
                    className='empresa-number-funcionarios' 
                    required 
                    value={numeroFuncionarios}
                    onChange={(e) => setNumeroFuncionarios(e.target.value)} 
                    //className={errors.numeroFuncionarios ? 'error' : ''}
                  />
                  {errors.numeroFuncionarios && <span className="error-message">{errors.numeroFuncionarios}</span>}
                </div>
                <div>
                  <label>Cidade</label>
                  <input 
                    type="text" 
                    placeholder="Digite a cidade" 
                    className="empresa-cidade" 
                    required 
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)} 
                    //className={errors.cidade ? 'error' : ''}
                  />
                  {errors.cidade && <span className="error-message">{errors.cidade}</span>}
                </div>
              </div>

              <div className="empresa-flex-group">
                <div>
                  <label>Email Corporativo</label>
                  <input 
                    type="email" 
                    placeholder="Digite o email corporativo" 
                    className='empresa-email' 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    //className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div>
                  <label>Senha</label>
                  <input 
                    type="password" 
                    placeholder="Digite a senha" 
                    className="empresa-senha" 
                    required 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)} 
                    //className={errors.senha ? 'error' : ''}
                  />
                  {errors.senha && <span className="error-message">{errors.senha}</span>}
                </div>
              </div>

              <label>Telefone Fixo</label>
              <input 
                type="text" 
                placeholder="Digite o telefone fixo" 
                required 
                value={telefoneFixo}
                onChange={(e) => setTelefoneFixo(e.target.value)} 
                className={errors.telefoneFixo ? 'error' : ''}
              />
              {errors.telefoneFixo && <span className="error-message">{errors.telefoneFixo}</span>}

              <label>Sobre a Empresa</label>
              <input  
                placeholder="Descreva a empresa" 
                required 
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