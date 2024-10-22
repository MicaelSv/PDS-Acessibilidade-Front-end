import { useState } from 'react';
import '../../scss/homePage-scss/modal.scss';

{/* usar biblioteca de validacao yup*/}
function Modal({ onClose }) {
  const [isStepTwo, setIsStepTwo] = useState(false);
  const [resumeSummary, setResumeSummary] = useState('');
  const [institution, setInstitution] = useState('');
  const [education, setEducation] = useState('');
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState('');
  const [languages, setLanguages] = useState([]);
  const [newLanguage, setNewLanguage] = useState({ language: '', fluency: '' });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [sex, setSex] = useState('');
  const [disability, setDisability] = useState('');

  const addCourse = () => {
    if (newCourse) {
      setCourses([...courses, newCourse]);
      setNewCourse('');
    }
  };

  const addExperience = () => {
    if (newExperience) {
      setExperiences([...experiences, newExperience]);
      setNewExperience('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isStepTwo) {
      // Lógica de submissão final
      onClose();
    } else {
      setIsStepTwo(true);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <div className="modal-left">
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
                      placeholder="Adicionar experiência"
                      value={newExperience}
                      onChange={(e) => setNewExperience(e.target.value)}
                    />
                    <button type="button" onClick={addExperience}>Adicionar</button>
                  </div>
                  {experiences.map((experience, index) => (
                    <div key={index} className="item-list">
                      {experience}
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
                      {/* Adicione mais opções se necessário */}
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

                  <button type="submit" className="submit-button">Finalizar Cadastro</button>
                </form>
              </>
            ) : (
              <>
    <h2>Registro de Candidato</h2>
    <form onSubmit={handleSubmit}>
      <label>Nome e Sobrenome</label>
      <input type="text" placeholder="Seu nome completo" required />
      
      <label>Email</label>
      <input type="email" placeholder="Seu email" required />
      
      <label>Senha</label>
      <input type="password" placeholder="Sua senha" required />
      
      <label>Telefone</label>
      <input type="tel" placeholder="Seu telefone" required />
      
      <label>Cidade</label>
      <input type="text" placeholder="Sua cidade" required />
      
      <label>Cargo Desejado</label>
      <input type="text" placeholder="Cargo desejado" required />
      
      <label>Sexo</label> 
      <select value={sex} onChange={(e) => setSex(e.target.value)} required>
        <option value="">Selecione o sexo</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
        <option value="outro">Outro</option>
      </select>
      
      <label>Tipo de Deficiência</label>
      <select value={disability} onChange={(e) => setDisability(e.target.value)} required>
        <option value="">Selecione o tipo de deficiência</option>
        <option value="VISUAL">Visual</option>
        <option value="AUDITIVA">Auditiva</option>
        <option value="MOTORA">Motora</option>
       </select>
      
      <button type="submit" className="submit-button">Avançar</button>
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