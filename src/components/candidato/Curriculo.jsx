import React, { useState } from 'react';
import '../../scss/candidato-scss/curriculo.scss';

function Curriculo() {
  const [isEditing, setIsEditing] = useState({
    dadosPessoais: false,
    objetivosProfissionais: false,
    resumoCurriculo: false,
    escolaridade: false,
    cursosImportantes: false,
    experienciasProfissionais: false,
    idiomas: false,
    habilidadesQualificacoes: false,
  });

  const [usuario, setUsuario] = useState({
    nome: 'João da Silva',
    email: 'joao.silva@example.com',
    cargo: 'Desenvolvedor Front-end',
    idade: 35,
    sexo: 'Masculino',
    endereco: 'São Paulo, SP',
    celular: '(11) 98765-4321',
    salarioDesejado: 'R$ 5.000,00',
  });

  const [escolaridade, setEscolaridade] = useState({
    instituicao: 'IFAL',
    formacao: 'Ensino Fundamental Completo',
  });

  const [cursos, setCursos] = useState([
    'Curso de React.js - Alura',
    'Curso de UX/UI - Udemy',
  ]);

  const [experiencias, setExperiencias] = useState([
    'Desenvolvedor Front-end na TechCorp - 2018 até o presente',
    'Estagiário em Desenvolvimento Web na WebSolutions - 2016 a 2018',
  ]);

  const [idiomas, setIdiomas] = useState([
    { nome: 'Português', nivel: 'Nativo' },
    { nome: 'Inglês', nivel: 'Intermediário' },
  ]);
  

  const [habilidades, setHabilidades] = useState([
    'HTML, CSS, JavaScript',
    'React.js, Redux',
    'Git, GitHub, GitLab',
  ]);

  const [resumo, setResumo] = useState('Inserir aqui o resumo das experiências e qualificações do usuário...');
  const [newCurso, setNewCurso] = useState('');
  const [newExperiencia, setNewExperiencia] = useState('');
  const [newHabilidade, setNewHabilidade] = useState('');
  const [newIdioma, setNewIdioma] = useState({ nome: '', nivel: '' });

  const addIdioma = () => {
    if (newIdioma.nome.trim() !== '' && newIdioma.nivel.trim() !== '') {
      setIdiomas((prev) => [...prev, newIdioma]);
      setNewIdioma({ nome: '', nivel: '' });
    }
  };

  const handleResumoChange = (e) => {
    setResumo(e.target.value);
  };  

  const handleEdit = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleCursoChange = (e) => {
    setNewCurso(e.target.value);
  };

  const addCurso = () => {
    if (newCurso.trim() !== '') {
      setCursos((prev) => [...prev, newCurso]);
      setNewCurso('');
    }
  };

  const removeCurso = (index) => {
    setCursos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExperienciaChange = (e) => {
    setNewExperiencia(e.target.value);
  };

  const addExperiencia = () => {
    if (newExperiencia.trim() !== '') {
      setExperiencias((prev) => [...prev, newExperiencia]);
      setNewExperiencia('');
    }
  };

  const removeExperiencia = (index) => {
    setExperiencias((prev) => prev.filter((_, i) => i !== index));
  };

  const handleIdiomaChange = (e) => {
    setNewIdioma(e.target.value);
  };

  const removeIdioma = (index) => {
    setIdiomas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHabilidadeChange = (e) => {
    setNewHabilidade(e.target.value);
  };

  const addHabilidade = () => {
    if (newHabilidade.trim() !== '') {
      setHabilidades((prev) => [...prev, newHabilidade]);
      setNewHabilidade('');
    }
  };

  const removeHabilidade = (index) => {
    setHabilidades((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="curriculo-container">
      <div className="header">
        <h1>{usuario.nome}</h1>
        <p>{usuario.email}</p>
        <p>{usuario.cargo}</p>
      </div>

      <div className="sections">
      <div className="section dados-pessoais">
        <h2>Dados Pessoais</h2>
        {isEditing.dadosPessoais ? (
          <>
            <p>
              <label htmlFor="idade">Idade:</label>
              <input type="number" id="idade" name="idade" value={usuario.idade} onChange={handleChange} />
            </p>
            <p>
              <label htmlFor="sexo">Sexo:</label>
              <select id="sexo" name="sexo" value={usuario.sexo} onChange={handleChange}>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </p>
            <p>
              <label htmlFor="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" value={usuario.endereco} onChange={handleChange} />
            </p>
            <p>
              <label htmlFor="celular">Celular:</label>
              <input type="text" id="celular" name="celular" value={usuario.celular} onChange={handleChange} />
            </p>
            <button onClick={() => handleEdit('dadosPessoais')}>Salvar</button>
          </>
        ) : (
          <>
            <p>Idade: {usuario.idade} anos</p>
            <p>Gênero: {usuario.sexo}</p>
            <p>Endereço: {usuario.endereco}</p>
            <p>Celular: {usuario.celular}</p>
            <button onClick={() => handleEdit('dadosPessoais')}>Editar</button>
          </>
        )}
      </div>

        <div className="section objetivos-profissionais">
          <h2>Objetivos Profissionais</h2>
          {isEditing.objetivosProfissionais ? (
            <>
              <p>
                Cargo: <input type="text" name="cargo" value={usuario.cargo} onChange={handleChange} />
              </p>
              <p>
                Salário Desejado: <input type="text" name="salarioDesejado" value={usuario.salarioDesejado} onChange={handleChange} />
              </p>
              <button onClick={() => handleEdit('objetivosProfissionais')}>Salvar</button>
            </>
          ) : (
            <>
              <p>Cargo: {usuario.cargo}</p>
              <p>Salário Desejado: {usuario.salarioDesejado}</p>
              <button onClick={() => handleEdit('objetivosProfissionais')}>Editar</button>
            </>
          )}
        </div>
      </div>

      <div className="divider" />

      <div className="section resumo-curriculo">
          <h2>Resumo do Currículo</h2>
          {isEditing.resumoCurriculo ? (
            <>
              <textarea
                value={resumo}
                onChange={handleResumoChange}
                rows="5"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button onClick={() => handleEdit('resumoCurriculo')}>Salvar</button>
            </>
          ) : (
            <>
              <p>{resumo}</p>
              <button onClick={() => handleEdit('resumoCurriculo')}>Editar</button>
            </>
          )}
      </div>


      <div className="divider" />

      <div className="section escolaridade">
        <h2>Escolaridade</h2>
        {isEditing.escolaridade ? (
          <>
            <p>
              Instituição: <input type="text" name="instituicao" value={escolaridade.institicao} onChange={(e) => setEscolaridade({ ...escolaridade, instituicao: e.target.value })} />
            </p>
            <p>
              Formação: <input type="text" name="formacao" value={escolaridade.formacao} onChange={(e) => setEscolaridade({ ...escolaridade, formacao: e.target.value })} />
            </p>
            <button onClick={() => handleEdit('escolaridade')}>Salvar</button>
          </>
        ) : (
          <>
            <p>Instituição: {escolaridade.instituicao}</p>
            <p>Formação: {escolaridade.formacao}</p>
            <button onClick={() => handleEdit('escolaridade')}>Editar</button>
          </>
        )}
      </div>

      <div className="divider" />

      <div className="section cursos-importantes">
        <h2>Cursos Importantes</h2>
        {isEditing.cursosImportantes ? (
          <>
            <ul>
              {cursos.map((curso, index) => (
                <li key={index}>
                  {curso} <button className="remove-button" onClick={() => removeCurso(index)}>Remover</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newCurso}               onChange={handleCursoChange}
              placeholder="Adicionar novo curso"
            />
            <button onClick={addCurso}>Adicionar Curso</button>
            <button onClick={() => handleEdit('cursosImportantes')}>Salvar</button>
          </>
        ) : (
          <>
            <ul>
              {cursos.map((curso, index) => (
                <li key={index}>{curso}</li>
              ))}
            </ul>
            <button onClick={() => handleEdit('cursosImportantes')}>Editar</button>
          </>
        )}
      </div>

      <div className="divider" />

      <div className="section experiencias-profissionais">
        <h2>Experiências Profissionais</h2>
        {isEditing.experienciasProfissionais ? (
          <>
            <ul>
              {experiencias.map((experiencia, index) => (
                <li key={index}>
                  {experiencia} <button className="remove-button" onClick={() => removeExperiencia(index)}>Remover</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newExperiencia}
              onChange={handleExperienciaChange}
              placeholder="Adicionar nova experiência"
            />
            <button onClick={addExperiencia}>Adicionar Experiência</button>
            <button onClick={() => handleEdit('experienciasProfissionais')}>Salvar</button>
          </>
        ) : (
          <>
            <ul>
              {experiencias.map((experiencia, index) => (
                <li key={index}>{experiencia}</li>
              ))}
            </ul>
            <button onClick={() => handleEdit('experienciasProfissionais')}>Editar</button>
          </>
        )}
      </div>

      <div className="divider" />

      <div className="section idiomas">
  <h2>Idiomas</h2>
  {isEditing.idiomas ? (
    <>
      <ul>
        {idiomas.map((idioma, index) => (
          <li key={index}>
            {idioma.nome} - {idioma.nivel} 
            <button className="remove-button" onClick={() => removeIdioma(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <select value={newIdioma.nome} onChange={(e) => setNewIdioma({...newIdioma, nome: e.target.value})}>
        <option value="">Selecione um idioma</option>
        <option value="Português">Português</option>
        <option value="Inglês">Inglês</option>
        <option value="Espanhol">Espanhol</option>
        <option value="Francês">Francês</option>
        <option value="Alemão">Alemão</option>
        {/* Adicione mais opções de idiomas conforme necessário */}
      </select>
      <select value={newIdioma.nivel} onChange={(e) => setNewIdioma({...newIdioma, nivel: e.target.value})}>
        <option value="">Selecione o nível de fluência</option>
        <option value="Nativo">Nativo</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Iniciante">Iniciante</option>
        {/* Adicione mais opções de níveis de fluência conforme necessário */}
      </select>
      <button onClick={addIdioma}>Adicionar Idioma</button>
      <button onClick={() => handleEdit('idiomas')}>Salvar</button>
    </>
  ) : (
    <>
      <ul>
        {idiomas.map((idioma, index) => (
          <li key={index}>{idioma.nome} - {idioma.nivel}</li>
        ))}
      </ul>
      <button onClick={() => handleEdit('idiomas')}>Editar</button>
    </>
  )}
</div>


      <div className="divider" />

      <div className="section habilidades-qualificacoes">
        <h2>Habilidades e Qualificações</h2>
        {isEditing.habilidadesQualificacoes ? (
          <>
            <ul>
              {habilidades.map((habilidade, index) => (
                <li key={index}>
                  {habilidade} <button className="remove-button" onClick={() => removeHabilidade(index)}>Remover</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newHabilidade}
              onChange={handleHabilidadeChange}
              placeholder="Adicionar nova habilidade"
            />
            <button onClick={addHabilidade}>Adicionar Habilidade</button>
            <button onClick={() => handleEdit('habilidadesQualificacoes')}>Salvar</button>
          </>
        ) : (
          <>
            <ul>
              {habilidades.map((habilidade, index) => (
                <li key={index}>{habilidade}</li>
              ))}
            </ul>
            <button onClick={() => handleEdit('habilidadesQualificacoes')}>Editar</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Curriculo;
