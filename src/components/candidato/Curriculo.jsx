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
    endereco: 'Rua dos Pinheiros, 123 - São Paulo, SP',
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

  const [idiomas, setIdiomas] = useState(['Português - Nativo', 'Inglês - Intermediário']);

  const [habilidades, setHabilidades] = useState([
    'HTML, CSS, JavaScript',
    'React.js, Redux',
    'Git, GitHub, GitLab',
  ]);

  const [newCurso, setNewCurso] = useState('');
  const [newExperiencia, setNewExperiencia] = useState('');
  const [newIdioma, setNewIdioma] = useState('');
  const [newHabilidade, setNewHabilidade] = useState('');

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

  const addIdioma = () => {
    if (newIdioma.trim() !== '') {
      setIdiomas((prev) => [...prev, newIdioma]);
      setNewIdioma('');
    }
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
                Idade: <input type="text" name="idade" value={usuario.idade} onChange={handleChange} />
              </p>
              <p>
                Sexo: <input type="text" name="sexo" value={usuario.sexo} onChange={handleChange} />
              </p>
              <p>
                Endereço: <input type="text" name="endereco" value={usuario.endereco} onChange={handleChange} />
              </p>
              <p>
                Celular: <input type="text" name="celular" value={usuario.celular} onChange={handleChange} />
              </p>
              <button onClick={() => handleEdit('dadosPessoais')}>Salvar</button>
            </>
          ) : (
            <>
              <p>Idade: {usuario.idade} anos</p>
              <p>Sexo: {usuario.sexo}</p>
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
            <p>
              Inserir aqui o resumo das experiências e qualificações do usuário...
            </p>
            <button onClick={() => handleEdit('resumoCurriculo')}>Salvar</button>
          </>
        ) : (
          <>
            <p>Inserir aqui o resumo das experiências e qualificações do usuário...</p>
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
                  {idioma} <button className="remove-button" onClick={() => removeIdioma(index)}>Remover</button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newIdioma}
              onChange={handleIdiomaChange}
              placeholder="Adicionar novo idioma"
            />
            <button onClick={addIdioma}>Adicionar Idioma</button>
            <button onClick={() => handleEdit('idiomas')}>Salvar</button>
          </>
        ) : (
          <>
            <ul>
              {idiomas.map((idioma, index) => (
                <li key={index}>{idioma}</li>
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

