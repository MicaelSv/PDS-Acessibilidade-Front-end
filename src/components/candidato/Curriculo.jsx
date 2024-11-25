import React, { useState, useEffect } from 'react';
import '../../scss/candidato-scss/curriculo.scss';

function Curriculo() {

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    cargo_desejado: '',
    linkedin: '',
    tipo_deficiencia: '',
    idade: '',
    sexo: '',
    cidade: '',
    telefone: '', 
    salario_desejado: '', 
  });

  const [isEditing, setIsEditing] = useState({
    dadosPessoais: false,
    objetivosProfissionais: false,
    resumoCurriculo: false,
    escolaridade: false,
    cursosImportantes: false,
    experienciasProfissionais: false,
    idiomas: false,
    habilidadesQualificacoes: false,
    linkedin: false,
  });

  const [escolaridade, setEscolaridade] = useState({
    instituicao: '',
    formacao: '',
  });

  const [linkedin, setLinkedin] = useState(usuario.linkedin || '');
  const [cursos, setCursos] = useState([]);
  const [newCurso, setNewCurso] = useState('');
  const [newHabilidade, setNewHabilidade] = useState('');
  const [habilidades, setHabilidades] = useState([]);
  const [resumo, setResumo] = useState('');
  const [experiencias, setExperiencias] = useState([]);
  const [newExperiencia, setNewExperiencia] = useState({ empresa: '', cargo: '', periodo: '' });
  const [idiomas, setIdiomas] = useState([]);
  const [newIdioma, setNewIdioma] = useState({
    idioma: '',
    fluencia: ''
  });

  useEffect(() => {
    document.title = "Visualizar Currículo";
    fetchUsuario();
  }, []);

  const safeParse = (data, fallback = []) => {
    if (Array.isArray(data)) return data;
    if (typeof data === 'object' && data !== null) return data;
    if (!data) return fallback;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Erro ao fazer parse:', e);
      return fallback;
    }
  };


  const fetchUsuario = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api-accessable.vercel.app/user/curriculo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setUsuario(data);
        setEscolaridade({
          instituicao: data.escolaridade?.instituicao || data.instituicao || '',
          formacao: data.escolaridade?.formacao || data.formacao || '',
        });
        setCursos(safeParse(data.cursos));
        setIdiomas(safeParse(data.idiomas));
        const experienciasProfissionais = data.experiencias_profissionais ? JSON.parse(data.experiencias_profissionais) : [];
        console.log('experiencias_profissionais:', data.experiencias_profissionais);
        setExperiencias(experienciasProfissionais);
        setHabilidades(safeParse(data.habilidades_qualificacoes));
        setResumo(data.resumo_curriculo || '');
      } else {
        console.error('Erro ao buscar dados do usuário');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const handleEdit = (section) => {
    if (section === 'cursosImportantes') {
      setCursos(usuario.cursos || []);
    }

    setIsEditing(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCursoChange = (e) => {
    setNewCurso(e.target.value);
  };

  const handleHabilidadeChange = (e) => {
    setNewHabilidade(e.target.value);
  };

  const addHabilidade = () => {
    if (newHabilidade.trim()) {
      const novasHabilidades = [...habilidades, newHabilidade.trim()];
      setHabilidades(novasHabilidades);
      setNewHabilidade('');
    }
  };

  const removeHabilidade = (index) => {
    const novasHabilidades = habilidades.filter((_, i) => i !== index);
    setHabilidades(novasHabilidades);
  };

  const addCurso = () => {
    if (newCurso.trim()) {
      setCursos([...cursos, newCurso.trim()]);
      setNewCurso('');
    }
  };

  const addIdioma = () => {
    if (newIdioma.idioma && newIdioma.fluencia) {
      setIdiomas([...idiomas, newIdioma]);
      setNewIdioma({ idioma: '', fluencia: '' });
    }
  };
  
  const removeIdioma = (index) => {
    setIdiomas(prevIdiomas => prevIdiomas.filter((_, i) => i !== index));
  };

  const addExperiencia = () => {
    if (newExperiencia.empresa && newExperiencia.cargo && newExperiencia.periodo) {
      const novaExperiencia = {
        companyName: newExperiencia.empresa,
        jobTitle: newExperiencia.cargo,
        period: newExperiencia.periodo
      };
      
      setExperiencias(prevExperiencias => [...prevExperiencias, novaExperiencia]);
      setNewExperiencia({ empresa: '', cargo: '', periodo: '' });
    }
  };

  const removeExperiencia = (index) => {
    setExperiencias(prevExperiencias => {
      const updatedExperiencias = prevExperiencias.filter((_, i) => i !== index);
      console.log('Experiências após remoção:', updatedExperiencias);
      return updatedExperiencias;
    });
  };
  
  const removeCurso = (index) => {
    setCursos(cursos.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (section) => {
  try {
    const token = localStorage.getItem('token');
    let dataToSend = {};

    if (section === 'dadosPessoais') {
      dataToSend = {
        dados_pessoais: {
          idade: usuario.idade,
          sexo: usuario.sexo,
          cidade: usuario.cidade,
          telefone: usuario.telefone
        }
      };
    } else if (section === 'objetivosProfissionais') {
      dataToSend = {
        objetivos_profissionais: {
          cargo_desejado: usuario.cargo_desejado,
          salario_desejado: usuario.salario_desejado
        }
      };
    } else if (section === 'resumoCurriculo') {
      dataToSend = {
        resumo_curriculo: resumo
      };
    } else if (section === 'escolaridade') {  // Adicione esta condição
      dataToSend = {
        escolaridade: {
          instituicao: escolaridade.instituicao,
          formacao: escolaridade.formacao
        }
      };  
    } else if (section === 'cursosImportantes') {
      dataToSend = {
        cursos: cursos
      };
    } else if (section === 'experienciasProfissionais'){
      dataToSend = {
        experiencias_profissionais: JSON.stringify(experiencias)
      };
    } else if (section === 'idiomas') {
        dataToSend = {
        idiomas: idiomas
      };
    } else if (section === 'habilidadesQualificacoes') {
      dataToSend = {
        habilidades_qualificacoes: JSON.stringify(habilidades) // Certifique-se de que isso está correto
      };
    } else if (section === 'linkedin') {
      dataToSend = {
        linkedin: linkedin 
      };
    }


    console.log("Dados enviados:", JSON.stringify(dataToSend));

    const response = await fetch('https://api-accessable.vercel.app/user/curriculo/atualizar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(dataToSend)
    });

    if (response.ok) {
      fetchUsuario();
      setIsEditing(prev => ({ ...prev, [section]: false }));
      setNewHabilidade(''); // Limpa o campo de nova habilidade
      if (section === 'experienciasProfissionais') {
        setExperiencias(updatedData.experiencias_profissionais);
      }
    } else {
      console.error('Erro ao atualizar usuário');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
};

  const handleResumoChange = (e) => {
    setResumo(e.target.value);
  };

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(usuario.estado || ''); // Estado inicial baseado no usuário
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(usuario.cidade || ''); // Cidade inicial baseada no usuário


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

  return (
    <div className="curriculo-container">
      <div className="header">
        <h1 className="nomeUsuario">{usuario.nome || 'Usuário'}</h1>
        <p>{usuario.email}</p>
        <p>
  LinkedIn: 
  {isEditing.linkedin ? (
    <span className="linkedin-edit">
      <input
        type="text"
        value={linkedin}
        onChange={(e) => setLinkedin(e.target.value)}
        placeholder="Digite a URL do LinkedIn"
      />
      <button onClick={() => handleSave('linkedin')}>Salvar</button>
    </span>
  ) : (
    <>
      {usuario.linkedin ? (
        <span>
          <a 
            href={usuario.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'blue', textDecoration: 'underline' }} // Estilo opcional
          >
            {usuario.linkedin}
          </a>
          <button className='addLinkedin' onClick={() => handleEdit('linkedin')}>Editar</button>
        </span>
      ) : (
        <button className='addLinkedin' onClick={() => handleEdit('linkedin')}>
          Adicionar
        </button>
      )}
    </>
  )}
</p>
  
        <p>Possui deficiência {usuario.tipo_deficiencia}</p>
      </div>
      <div className="sections">
      <div className="section dados-pessoais">
      <h2>Dados Pessoais</h2>
      {isEditing.dadosPessoais ? (
        <>
          <p>
            <label htmlFor="idade">Idade:</label>
            <input
              type="number"
              id="idade"
              name="idade"
              value={usuario.idade}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              value={usuario.sexo}
              onChange={handleChange}
            >
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </p>
          <p>
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity(''); // Limpa a cidade ao trocar o estado
              }}
            >
              <option value="">Selecione um estado</option>
              {states.map((state) => (
                <option key={state.id} value={state.sigla}>
                  {state.nome}
                </option>
              ))}
            </select>
          </p>
          <p>
            <label htmlFor="cidade">Cidade:</label>
            <select
  id="cidade"
  value={usuario.cidade} // Set the initial value to the user's cidade
  onChange={(e) => {
    setSelectedCity(e.target.value); // Update the selectedCity state
    setUsuario({ ...usuario, cidade: e.target.value }); // Update the usuario state
  }}
  disabled={!selectedState}
>
  <option value="">Selecione uma cidade</option>
  {cities.map(city => (
    <option key={city.id} value={city.nome}>
      {city.nome}
    </option>
  ))}
</select>
          </p>
          <p>
            <label htmlFor="telefone">Celular:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={usuario.telefone}
              onChange={handleChange}
            />
          </p>
          <button
            onClick={() => {
              handleChange({
                target: { name: 'estado', value: selectedState },
              });
              handleChange({
                target: { name: 'cidade', value: selectedCity },
              });
              handleSave('dadosPessoais');
            }}
          >
            Salvar
          </button>
        </>
      ) : (
        <>
          <p>Idade: {usuario.idade} anos</p>
          <p>Gênero: {usuario.sexo}</p>
          <p>Cidade: {usuario.cidade}</p>
          <p>Celular: {usuario.telefone}</p>
          <button onClick={() => handleEdit('dadosPessoais')}>Editar</button>
        </>
      )}
    </div>

        <div className="section objetivos-profissionais">
          <h2>Objetivos Profissionais</h2>
          {isEditing.objetivosProfissionais ? (
            <>
              <p>
                Cargo: <input type="text" name="cargo_desejado" value={usuario.cargo_desejado} onChange={handleChange} />
              </p>
              <p>
                Salário Desejado: <input type="text" name="salario_desejado" value={usuario.salario_desejado} onChange={handleChange} />
              </p>
              <button onClick={() => handleSave('objetivosProfissionais')}>Salvar</button>
            </>
          ) : (
            <>
              <p>Cargo: {usuario.cargo_desejado}</p>
              <p>Salário Desejado: {usuario.salario_desejado}</p>
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
      <button onClick={() => handleSave('resumoCurriculo')}>Salvar</button>
    </>
  ) : (
    <>
      {resumo && resumo.trim() !== '' ? (
        <p>{resumo}</p>
      ) : (
        <p>Resumo não foi adicionado</p>
      )}
      <button onClick={() => handleEdit('resumoCurriculo')}>Editar</button>
    </>
  )}
</div>

      <div className='divider'></div>

      <div className="section escolaridade">
  <h2>Escolaridade</h2>
  {isEditing.escolaridade ? (
    <>
      <p>
        Instituição: 
        <input 
          type="text" 
          name="instituicao" 
          value={escolaridade.instituicao} 
          onChange={(e) => setEscolaridade({ ...escolaridade, instituicao: e.target.value })} 
        />
      </p>
      <p>
        Formação: 
        <select 
          value={escolaridade.formacao} 
          onChange={(e) => setEscolaridade({ ...escolaridade, formacao: e.target.value })} 
        >
          <option value="">Selecione a formação</option>
          <option value="Ensino Fundamental">Ensino Fundamental</option>
          <option value="Ensino Médio">Ensino Médio</option>
          <option value="Ensino Superior">Ensino Superior</option>
        </select>
      </p>
      <button onClick={() => handleSave('escolaridade')}>Salvar</button>
    </>
  ) : (
    <>
      {escolaridade.instituicao || escolaridade.formacao ? (
        <>
          <p>Instituição: {escolaridade.instituicao}</p>
          <p>Formação: {escolaridade.formacao}</p>
        </>
      ) : (
        <p>Escolaridade não foi cadastrada</p>
      )}
      <button onClick={() => handleEdit('escolaridade')}>Editar</button>
    </>
  )}
</div>

      <div className='divider'></div>  

      <div className="section cursos-importantes">
        <h2>Cursos Importantes</h2>
        {isEditing.cursosImportantes ? (
          <>
            <ul>
              {Array.isArray(cursos) && cursos.map((curso, index) => (
                <li key={index}>
                  {curso} 
                  <button 
                    className="remove-button" 
                    onClick={() => removeCurso(index)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <input
              type="text"
              value={newCurso}
              onChange={handleCursoChange}
              placeholder="Adicionar novo curso"
            />
            <button onClick={addCurso}>Adicionar Curso</button>
            <button onClick={() => handleSave('cursosImportantes')}>Salvar</button>
          </>
        ) : (
          <>
            <ul>
  {Array.isArray(cursos) && cursos.length > 0 ? (
    cursos.map((curso, index) => (
      <li key={index}>{curso}</li>
    ))
  ) : (
    <li>Nenhum curso cadastrado</li>
  )}
</ul>
            <button onClick={() => setIsEditing(prev => ({
              ...prev,
              cursosImportantes: true
            }))}>
              Editar
            </button>
          </>
        )}
      </div>

      <div className="divider" />

      <div className="section experiencias-profissionais">
  <h2>Experiências Profissionais</h2>
  {isEditing.experienciasProfissionais ? (
    <div>
      <div className="experiencias-list">
      {Array.isArray(experiencias) && experiencias.length > 0 ? (
          experiencias.map((exp, index) => (
            <div key={index} className="experiencia-item">
              <p><strong>Empresa:</strong> {exp.companyName}</p>
              <p><strong>Cargo:</strong> {exp.jobTitle}</p>
              <p><strong>Período:</strong> {exp.period}</p>
              <button className='btnRemoverExp' onClick={() => removeExperiencia(index)}>Remover</button>
            </div>
          ))
        ) : (
          <p>Nenhuma experiência cadastrada</p>
        )}
      </div>

      <div className="add-experiencia-form">
        <input
          type="text"
          value={newExperiencia.empresa}
          onChange={(e) => setNewExperiencia({...newExperiencia, empresa: e.target.value})}
          placeholder="Nome da empresa"
        />
        <input
          type="text"
          value={newExperiencia.cargo}
          onChange={(e) => setNewExperiencia({...newExperiencia, cargo: e.target.value})}
          placeholder="Cargo"
        />
        <input
          type="text"
          value={newExperiencia.periodo}
          onChange={(e) => setNewExperiencia({...newExperiencia, periodo: e.target.value})}
          placeholder="Período"
        />
        <button onClick={addExperiencia}>Adicionar Experiência</button>
      </div>

      <div className="action-buttons">
        <button onClick={() => handleSave('experienciasProfissionais')}>Salvar</button>
        <button onClick={() => setIsEditing(prev => ({ ...prev, experienciasProfissionais: false }))}>Cancelar</button>
      </div>
    </div>
  ) : (
    <div>
      {Array.isArray(experiencias) && experiencias.length > 0 ? (
        experiencias.map((exp, index) => (
          <div key={index} className="experiencia-item">
            <p><strong>Empresa:</strong> {exp.companyName}</p>
            <p><strong>Cargo:</strong> {exp.jobTitle}</p>
            <p><strong>Período:</strong> {exp.period}</p>
          </div>
        ))
      ) : (
        <p>Nenhuma experiência cadastrada</p>
      )}
      <button onClick={() => handleEdit('experienciasProfissionais')}>Editar</button>
    </div>
  )}
</div>

       <div className="divider" />

       <div className="section idiomas">
  <h2>Idiomas</h2>
  {isEditing.idiomas ? (
    <div>
      <div className="idiomas-list">
        {Array.isArray(idiomas) && idiomas.length > 0 ? (
          idiomas.map((idioma, index) => (
            <div key={index} className="idioma-item">
              <span>{idioma.idioma} - {idioma.fluencia}</span>
              <button 
                className="remove-button" 
                onClick={() => removeIdioma(index)}
              >
                Remover
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum idioma cadastrado</p>
        )}
      </div>

      <div className="add-idioma-form">
        {/* Campo de texto para o idioma */}
        <input 
          type="text" 
          value={newIdioma.idioma} 
          onChange={(e) => setNewIdioma({ ...newIdioma, idioma: e.target.value })} 
          placeholder="Digite o idioma"
        />

        {/* Select para fluência */}
        <select 
          value={newIdioma.fluencia} 
          onChange={(e) => setNewIdioma({ ...newIdioma, fluencia: e.target.value })} 
        >
          <option value="">Selecione o nível</option>
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
          <option value="Fluente">Fluente</option>
          <option value="Nativo">Nativo</option>
        </select>

        <button 
          onClick={addIdioma} 
          disabled={!newIdioma.idioma || !newIdioma.fluencia}
        >
          Adicionar Idioma
        </button>
      </div>

      <div className="action-buttons">
        <button onClick={() => handleSave('idiomas')}>Salvar</button>
        <button onClick={() => setIsEditing(prev => ({ ...prev, idiomas: false }))}>Cancelar</button>
      </div>
    </div>
  ) : (
    <div>
      {Array.isArray(idiomas) && idiomas.length > 0 ? (
        <ul className="idiomas-list">
          {idiomas.map((idioma, index) => (
            <li key={index} className="idioma-item">
              {idioma.idioma} - {idioma.fluencia}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum idioma cadastrado</p>
      )}
      <button onClick={() => handleEdit('idiomas')}>Editar</button>
    </div>
  )}
</div>

<div className="divider" />

<div className="section habilidades">
  <h2>Habilidades e Qualificações</h2>
  {isEditing.habilidadesQualificacoes ? (
    <div>
      <ul className="habilidades-list">
        {Array.isArray(habilidades) && habilidades.length > 0 ? (
          habilidades.map((habilidade, index) => (
            <li key={index} className="habilidade-item">
              {habilidade}
              <button 
                className="remove-button" 
                onClick={() => removeHabilidade(index)}
              >
                Remover
              </button>
            </li>
          ))
        ) : (
          <li>Nenhuma habilidade cadastrada</li>
        )}
      </ul>

      <div className="add-habilidade-form">
        <input
          type="text"
          value={newHabilidade}
          onChange={(e) => setNewHabilidade(e.target.value)}
          placeholder="Nova habilidade"
        />
        <button 
          onClick={addHabilidade}
          disabled={!newHabilidade}
        >
          Adicionar Habilidade
        </button>
      </div>

      <div className="action-buttons">
        <button onClick={() => handleSave('habilidadesQualificacoes')}>Salvar</button>
        <button onClick={() => setIsEditing(prev => ({ ...prev, habilidades: false }))}>Cancelar</button>
      </div>
    </div>
  ) : (
    <div>
      {Array.isArray(habilidades) && habilidades.length > 0 ? (
        <ul className="habilidades-list">
          {habilidades.map((habilidade, index) => (
            <li key={index} className="habilidade-item">
              {habilidade}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma habilidade cadastrada</p>
      )}
      <button onClick={() => handleEdit('habilidadesQualificacoes')}>Editar</button>
    </div>
  )}
</div>


    </div>
  );
}

export default Curriculo;