import { useState } from 'react';
import '../../scss/homePage-scss/modal.scss';

function Modal({ onClose }) {
  let newErrors = {};
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [desiredPosition, setDesiredPosition] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const [sex, setSex] = useState('');
  const [disability, setDisability] = useState('');
  const [emailError, setEmailError] = useState('');

  const [resumeSummary, setResumeSummary] = useState('');
  const [institution, setInstitution] = useState('');
  const [education, setEducation] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({ companyName: '', jobTitle: '', period: '' });
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({ language: '', fluency: '' });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const checkEmail = async (email) => {
    try {
      const response = await fetch('https://api-accessable.vercel.app/check-email', {
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

  // Estados para erros
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    city: '',
    desiredPosition: '',
    desiredSalary: '',
    sex: '',
    disability: ''
  });

  const addCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };

  const validateAge = (age) => {
    const ageNum = Number(age);
    return ageNum >= 16 && ageNum <= 100; // Permite idades entre 16 e 100 anos
  };

  const addExperience = () => {
    if (newExperience.companyName && newExperience.jobTitle && newExperience.period) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ companyName: '', jobTitle: '', period: '' });
    }
  };
  
  const addLanguage = () => {
    if (newLanguage.language && newLanguage.fluency) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage({ language: '', fluency: '' });
    }
  };

  const addSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeItem = (setState, items, index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setState(updatedItems);
  };

  const validateEmail = (email) => {
    // Regex para validar email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };
  

  const validatePassword = (password) => {
    // Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    // Formato: (XX) XXXXX-XXXX ou XXXXXXXXXXX
    const phoneRegex = /^(\(\d{2}\)\s?)?\d{5}-?\d{4}$/;
    return phoneRegex.test(phone);
  };

  const validateSalary = (salary) => {
    const numericSalary = Number(salary.replace(/[^\d,]/g, '').replace(',', '.'));
    return numericSalary > 0 && numericSalary <= 999999;
  };
  const validateForm = () => {
    //Reset dos erros
    //let newErrors = {};
    let isValid = true;

    // Validação do Nome
    if (!fullName.trim()) {
      newErrors.fullName = 'Nome é obrigatório';
      isValid = false;
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Nome deve ter pelo menos 3 caracteres';
      isValid = false;
    } else if (!/^[a-zA-ZÀ-ÿ\s]*$/.test(fullName)) {
      newErrors.fullName = 'Nome não pode conter números ou caracteres especiais';
      isValid = false;
    }

    // Validação do Email
    if (!email || email.trim() === '') {
      newErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }

    // Validação da Senha
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (!validatePassword(password)) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres, incluindo maiúscula, minúscula, número e caractere especial';
      isValid = false;
    }

    // Validação do Telefone
    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório';
      isValid = false;
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Telefone inválido';
      isValid = false;
    }

    // Validação da Idade
    if (!age) {
      newErrors.age = 'Idade é obrigatória';
      isValid = false;
    } else if (!validateAge(age)) {
      newErrors.age = 'Idade deve estar entre 16 e 100 anos';
      isValid = false;
    }

    // Validação da Cidade
    if (!city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
      isValid = false;
    }

    // Validação do Cargo Desejado
    if (!desiredPosition.trim()) {
      newErrors.desiredPosition = 'Cargo desejado é obrigatório';
      isValid = false;
    }

    // Validação do Salário
    if (!desiredSalary) {
      newErrors.desiredSalary = 'Salário desejado é obrigatório';
      isValid = false;
    } else if (!validateSalary(desiredSalary)) {
      newErrors.desiredSalary = 'Salário inválido';
      isValid = false;
    }

    // Validação do Sexo
    if (!sex) {
      newErrors.sex = 'Sexo é obrigatório';
      isValid = false;
    }

    // Validação da Deficiência
    if (!disability) {
      newErrors.disability = 'Tipo de deficiência é obrigatório';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isStepTwo) {
      if (validateForm()) {
        // Verificar email antes de prosseguir
        const emailErrorMessage = await checkEmail(email);
        if (emailErrorMessage) {
          setEmailError(emailErrorMessage);
          return;
        } else if (!email || email.trim() === '') {
          newErrors.email = 'Email é obrigatório';
          isValid = false;
        } else if (!validateEmail(email)) {
          newErrors.email = 'Email inválido';
          isValid = false;
        }
        setIsStepTwo(true);
      }
      return;
    }
    const numericSalary = Number(desiredSalary.replace(/[^\d,]/g, '').replace(',', '.'));

    const candidatoData = {
      nome: fullName,
      email: email,
      senha: password,
      telefone: phone,
      idade: age,
      cidade: city,
      cargo_desejado: desiredPosition,
      linkedin: linkedin, // Adicionando o LinkedIn
      salario_desejado: numericSalary,
      sexo: sex,
      tipo_deficiencia: disability,
      resumo_curriculo: resumeSummary,
      instituicao: institution,
      formacao: education,
      cursos: courses,
      experiencias_profissionais: experiences,
      idiomas: languages.map(lang => ({
        idioma: lang.language,
        fluencia: lang.fluency
      })),
      habilidades_qualificacoes: skills
    };

    try {
      const response = await fetch('https://api-accessable.vercel.app/register/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(candidatoData)
      });

      if (response.ok) {
        setShowNotification(true); 
        onClose();
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = 'Cadastro realizado com sucesso!';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      } else {
        const errorData = await response.json();
        console.error('Erro no registro:', errorData);
        // Mostrar mensagem de erro
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.textContent = errorData.message || 'Erro ao realizar cadastro';
        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 3000);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      // Mostrar mensagem de erro genérica
      const notification = document.createElement('div');
      notification.className = 'error-notification';
      notification.textContent = 'Erro ao realizar cadastro. Tente novamente.';
      document.body.appendChild(notification);
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 3000);
    }
};

const formatCurrency = (value) => {
  const numericValue = value.replace(/\D/g, '');
  if (numericValue === '') return '';
  return `R$ ${new Intl.NumberFormat('pt-BR').format(numericValue)}`;
};


const formatPhone = (value) => {
    let phone = value.replace(/\D/g, '');
    
    if (phone.length <= 11) {
      phone = phone.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    }
    
    return phone;
};

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <div className="modal-left-2">
            <img src="/img-register-candidato.jpg" alt="Registration" />
          </div>
          <div className="modal-right">
            {isStepTwo ? (
              <>
              <button className="back-button" type="button" onClick={() => setIsStepTwo(false)}>
                <img src="arrow.png" alt="Voltar" />
              </button>
                <h2>Preencha seu currículo</h2>
                <form onSubmit={handleSubmit}>
                  <label>Resumo do Currículo</label>
                  <textarea
                    placeholder="Resumo do currículo"
                    value={resumeSummary}
                    onChange={(e) => setResumeSummary(e.target.value)}
                    rows="4"
                  />
                  <label>Instituição</label>
                  <select value={institution} onChange={(e) => setInstitution(e.target.value)}>
                    <option value="IFAL">IFAL</option>
                    <option value="UFAL">UFAL</option>
                    <option value="Cesmac">Cesmac</option>
                  </select>
                  <label>Formação</label>
                  <select value={education} onChange={(e) => setEducation(e.target.value)}>
                    <option value="Ensino Fundamental">Ensino Fundamental</option>
                    <option value="Ensino Médio">Ensino Médio</option>
                    <option value="Ensino Superior">Ensino Superior</option>
                  </select>

                  <label>Cursos Importantes</label>
                  <div className="dynamic-input">
                    <input
                      type="text"
                      placeholder="Adicionar curso"
                      value={newCourse}
                      onChange={(e) => setNewCourse(e.target.value)}
                    />
                    <button type="button" onClick={addCourse}>Adicionar</button>
                  </div>
                  {courses.map((course, index) => (
                    <div key={index} className="item-list">
                      {course}
                      <button type="button" onClick={() => removeItem(setCourses, courses, index)}>Remover</button>
                    </div>
                  ))}

                  <label>Experiências Profissionais</label>
                  <div className="dynamic-input">
                    <input
                      type="text"
                      placeholder="Nome da Empresa"
                      value={newExperience.companyName}
                      onChange={(e) => setNewExperience({ ...newExperience, companyName: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Cargo"
                      value={newExperience.jobTitle}
                      onChange={(e) => setNewExperience({ ...newExperience, jobTitle: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Período"
                      value={newExperience.period}
                      onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                    />
                    <button type="button" onClick={addExperience}>Adicionar</button>
                  </div>
                  {experiences.map((experience, index) => (
                    <div key={index} className="item-list">
                      {experience.companyName} - {experience.jobTitle} - {experience.period}
                      <button type="button" onClick={() => removeItem(setExperiences, experiences, index)}>Remover</button>
                    </div>
                  ))}
                  <label>Idiomas</label>
                  <div className="dynamic-input">
                    <select
                      value={newLanguage.language}
                      onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })}
                    >
                      <option value="">Selecione o idioma</option>
                      <option value="Inglês">Inglês</option>
                      <option value="Espanhol">Espanhol</option>
                      <option value="Francês">Francês</option>
                      <option value="Alemão">Alemão</option>
                      <option value="Italiano">Italiano</option>
                      <option value="Português">Português</option>
                    </select>
                    <select
                      value={newLanguage.fluency}
                      onChange={(e) => setNewLanguage({ ...newLanguage, fluency: e.target.value })}
                    >
                      <option value="">Selecione a fluência</option>
                      <option value="Básico">Básico</option>
                      <option value="Intermediário">Intermediário</option>
                      <option value="Avançado">Avançado</option>
                      <option value="Fluente">Fluente</option>
                      <option value="Nativo">Nativo</option>
                    </select>
                    <button type="button" onClick={addLanguage}>Adicionar</button>
                  </div>
                  {languages.map((lang, index) => (
                    <div key={index} className="item-list">
                      {lang.language} - {lang.fluency}
                      <button type="button" onClick={() => removeItem(setLanguages, languages, index)}>Remover</button>
                    </div>
                  ))}

                <label className="habilidades-label">Habilidades e Qualificações</label>

                  <div className="dynamic-input">
                    <input
                      type="text"
                      placeholder="Adicionar habilidade"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button type="button" onClick={addSkill}>Adicionar</button>
                  </div>
                  {skills.map((skill, index) => (
                    <div key={index} className="item-list">
                      {skill}
                      <button type="button" onClick={() => removeItem(setSkills, skills, index)}>Remover</button>
                    </div>
                  ))}

                  <button className="submit-button" type="submit">Finalizar Registro</button>
                </form>
              </>
            ) : (
              <>
                <h2>Registro de Candidato</h2>
                <form onSubmit={handleSubmit}>
                  <label>Nome Completo</label>
                  <input
                    placeholder='Nome do candidato'
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={errors.fullName ? 'error' : ''}
                  />
                  {errors.fullName && <span className="error-message">{errors.fullName}</span>}

                  <label>Email</label>
                  <input
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
  placeholder="Email"
/>
                  {emailError && <span className="error-message">{emailError}</span>}
                  {errors.email && <span className="error-message">{errors.email}</span>}

                  <label>Senha</label>
                  <input
                    placeholder='Senha do candidato'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? 'error' : ''}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}

                  <label>Telefone</label>
                  <input
                    placeholder='(XX) XXXX-XXXX ou XXXXXXXXXXX'
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    className={errors.phone ? 'error' : ''}
                    maxLength="15"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}

                  <label>Idade</label>
                  <input
                    placeholder='Digite sua idade'
                    type="number"
                    min="16"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={errors.age ? 'error' : ''}
                  />
                  {errors.age && <span className="error-message">{errors.age}</span>}

                  <label>Cidade</label>
                  <input
                    placeholder='Digite sua cidade'
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}

                  <label>Cargo Desejado</label>
                  <input
                    placeholder='Digite o seu cargo'
                    type="text"
                    value={desiredPosition}
                    onChange={(e) => setDesiredPosition(e.target.value)}
                    className={errors.desiredPosition ? 'error' : ''}
                  />
                  {errors.desiredPosition && <span className="error-message">{errors.desiredPosition}</span>}

                  <label>LinkedIn (Opcional)</label>
                    <input
                      placeholder='Cole aqui o link do seu perfil no LinkedIn'
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />

<label>Salário Desejado</label>
<input
  placeholder='R$ 0,00'
  type="text"
  value={desiredSalary}
  onChange={(e) => {
    const formatted = formatCurrency(e.target.value);
    setDesiredSalary(formatted);
  }}
  className={errors.desiredSalary ? 'error' : ''}
/>
                  {errors.desiredSalary && <span className="error-message">{errors.desiredSalary}</span>}

                  <label>Gênero</label>
                  <select 
                    value={sex} 
                    onChange={(e) => setSex(e.target.value)}
                    className={errors.sex ? 'error' : ''}
                  >
                    <option value="">Selecione o gênero</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errors.sex && <span className="error-message">{errors.sex}</span>}

                  <label>Tipo de Deficiência</label>
                  <select 
                    value={disability} 
                    onChange={(e) => setDisability(e.target.value)}
                    className={errors.disability ? 'error' : ''}
                  >
                    <option value="">Selecione a deficiência</option>
                    <option value="VISUAL">Visual</option>
                    <option value="AUDITIVA">Auditiva</option>
                    <option value="FISICA">Física</option>
                    <option value="MULTIPLA">Múltipla</option>
                  </select>
                  {errors.disability && <span className="error-message">{errors.disability}</span>}

                  <button className="submit-button" type="submit">Próxima Etapa</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;