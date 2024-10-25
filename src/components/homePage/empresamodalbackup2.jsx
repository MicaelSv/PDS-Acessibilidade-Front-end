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

  // Estado para erros
  const [errors, setErrors] = useState({
    nomeEmpresa: '',
    cnpj: '',
    numeroFuncionarios: '',
    cidade: '',
    email: '',
    senha: '',
    telefoneFixo: ''
  });

  const formatCnpj = (value) => {
    // Remove tudo que não é dígito
    const cnpjValue = value.replace(/\D/g, '');

    // Formatação para CNPJ: XX.XXX.XXX/XXXX-XX
    if (cnpjValue.length <= 14) {
      const formattedCnpj = cnpjValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
      return formattedCnpj;
    }

    return value;
  };

  const validateCnpj = (cnpj) => {
    return cnpj.length === 18; // Verifique se o CNPJ tem 14 dígitos
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/; // Formato: (XX) XXXXX-XXXX ou XXXXXXXXXXX
    return phoneRegex.test(phone);
  };

  const formatPhone = (value) => {
    let phone = value.replace(/\D/g, '');
    
    if (phone.length <= 11) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    
    return phone;
};

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    // Validação do Nome da Empresa
    if (!nomeEmpresa.trim()) {
      newErrors.nomeEmpresa = 'Nome da empresa é obrigatório';
      isValid = false;
    }

    // Validação do CNPJ
    if (!validateCnpj(cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
      isValid = false;
    }

    // Validação do Número de Funcionários
    if (!numeroFuncionarios || numeroFuncionarios <= 0) {
      newErrors.numeroFuncionarios = 'Número de funcionários deve ser maior que zero';
      isValid = false;
    }

    // Validação da Cidade
    if (!cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
      isValid = false;
    }

    // Validação do Email
    if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Validação da Senha
    if (!senha) {
      newErrors.senha = 'Senha é obrigatória';
      isValid = false;
    }

    // Validação do Telefone Fixo
    if (!validatePhone(telefoneFixo)) {
      newErrors.telefoneFixo = 'Telefone fixo inválido';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se o formulário for inválido, mostre os erros e retorne
    if (!isFormValid) {
      return;
    }

    if (validateForm()) {
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
              />
              {errors.nomeEmpresa && <span className="error-message">{errors.nomeEmpresa}</span>}

              <label>CNPJ</label>
              <input 
                type="text" 
                placeholder="Digite com base nesse exemplo - 58.396.475/0001-29" 
                required 
                value={cnpj}
                onChange={(e) => setCnpj(formatCnpj(e.target.value))} 
                maxLength="18"
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
                onChange={(e) => setTelefoneFixo(formatPhone(e.target.value))}
                maxLength="15" 
              />
              {errors.telefoneFixo && <span className="error-message">{errors.telefoneFixo}</span>}

              <label>Sobre a Empresa</label>
              <input 
                placeholder="Descreva a empresa" 
                required 
                value={sobreEmpresa}
                onChange={(e) => setSobreEmpresa(e.target.value)} 
              />

              <button type="submit" className="empresa-submit-button">Registrar Empresa</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpresaModal;