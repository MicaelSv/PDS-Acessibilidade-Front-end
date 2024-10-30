import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../scss/empresa-scss/curriculoCandidato.scss';

function CurriculoCandidato() {
  const { id } = useParams();
  const [dadosUsuario, setDadosUsuario] = useState(null);

  // Função para decodificar caracteres especiais
  function decodeSpecialChars(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/\\u[\dA-F]{4}/gi, match =>
      String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16))
    );
  }

  useEffect(() => {
    const fetchDadosUsuario = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://api-accessable.vercel.app/usuario/${id}/curriculo`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Parse dos campos que são strings JSON
        const dados = response.data;
        dados.cursos = typeof dados.cursos === 'string' ? JSON.parse(dados.cursos) : dados.cursos;
        dados.experiencias_profissionais = typeof dados.experiencias_profissionais === 'string' 
          ? JSON.parse(dados.experiencias_profissionais) 
          : dados.experiencias_profissionais;
        dados.idiomas = typeof dados.idiomas === 'string' ? JSON.parse(dados.idiomas) : dados.idiomas;
        dados.habilidades_qualificacoes = typeof dados.habilidades_qualificacoes === 'string' 
          ? JSON.parse(dados.habilidades_qualificacoes) 
          : dados.habilidades_qualificacoes;

        setDadosUsuario(dados);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    if (id) {
      fetchDadosUsuario();
    }
  }, [id]);

  if (!dadosUsuario) {
    return <div>Carregando...</div>;
  }

  const isEmptyField = (field) => {
    if (!field) return true;
    if (field === "[]") return true;
    if (Array.isArray(field) && field.length === 0) return true;
    if (typeof field === 'string' && field.trim() === '') return true;
    return false;
  };

  return (
    <div className='curriculo-candidato'>
      <div className='headerCand'>
        <img src="/logo.png" height={40} width={40} style={{ borderRadius: '15%' }} alt='Logotipo' className='imgLogo' />
        <p>AccessAble</p>
      </div>

      <div className="curriculo-container">
        <div className="header">
          <h1 className="nomeUsuario">{decodeSpecialChars(dadosUsuario.nome) || 'Campo não preenchido'}</h1>
          <p>{dadosUsuario.email || 'Campo não preenchido'}</p>
          <p>LinkedIn: {dadosUsuario.linkedin || 'Campo não preenchido'}</p>
          <p>Possui deficiência: {decodeSpecialChars(dadosUsuario.tipo_deficiencia) || 'Campo não preenchido'}</p>
        </div>

        <div className="sections">
          <div className="section dados-pessoais">
            <h2>Dados Pessoais</h2>
            <p>Idade: {dadosUsuario.idade || 'Campo não preenchido'}</p>
            <p>Gênero: {decodeSpecialChars(dadosUsuario.sexo) || 'Campo não preenchido'}</p>
            <p>Endereço: {decodeSpecialChars(dadosUsuario.cidade) || 'Campo não preenchido'}</p>
            <p>Celular: {dadosUsuario.telefone || 'Campo não preenchido'}</p>
          </div>

          <div className="section objetivos-profissionais">
            <h2>Objetivos Profissionais</h2>
            <p>Cargo: {decodeSpecialChars(dadosUsuario.cargo_desejado) || 'Campo não preenchido'}</p>
            <p>Salário Desejado: R$ {dadosUsuario.salario_desejado || 'Campo não preenchido'}</p>
          </div>
        </div>

        <div className="divider" />

        <div className="section resumo-curriculo">
          <h2>Resumo do Currículo</h2>
          <p>{decodeSpecialChars(dadosUsuario.resumo_curriculo) || 'Campo não preenchido'}</p>
        </div>

        <div className="divider" />

        <div className="section escolaridade">
          <h2>Escolaridade</h2>
          <p>Instituição: {decodeSpecialChars(dadosUsuario.instituicao) || 'Campo não preenchido'}</p>
          <p>Formação: {decodeSpecialChars(dadosUsuario.formacao) || 'Campo não preenchido'}</p>
        </div>

        <div className="divider" />

        <div className="section cursos-importantes">
  <h2>Cursos Importantes</h2>
  {!isEmptyField(dadosUsuario.cursos) ? (
    <ul>
      {dadosUsuario.cursos.map((curso, index) => (
        <li key={index}>
          {typeof curso === 'object' 
            ? `${decodeSpecialChars(curso.nome)} - ${decodeSpecialChars(curso.instituicao)}`
            : decodeSpecialChars(curso)
          }
        </li>
      ))}
    </ul>
  ) : (
    <p>Campo não preenchido</p>
  )}
</div>

        <div className="divider" />

        <div className="section experiencias-profissionais">
          <h2>Experiências Profissionais</h2>
          {!isEmptyField(dadosUsuario.experiencias_profissionais) ? (
            <ul>
              {dadosUsuario.experiencias_profissionais.map((exp, index) => (
                <li key={index} className="experiencia-item">
                  <strong>{decodeSpecialChars(exp.empresa)}</strong>
                  <p>Cargo: {decodeSpecialChars(exp.cargo)}</p>
                  <p>Período: {exp.periodo}</p>
                  <p>Descrição: {decodeSpecialChars(exp.descricao)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Campo não preenchido</p>
          )}
        </div>

        <div className="divider" />

        <div className="section idiomas">
  <h2>Idiomas</h2>
  {!isEmptyField(dadosUsuario.idiomas) ? (
    <ul>
      {Array.isArray(dadosUsuario.idiomas) 
        ? dadosUsuario.idiomas.map((item, index) => (
            <li key={index}>
              {typeof item === 'object' && item.idioma && item.nivel
                ? `${decodeSpecialChars(item.idioma)} - ${decodeSpecialChars(item.nivel)}`
                : typeof item === 'string'
                  ? decodeSpecialChars(item)
                  : JSON.stringify(item) // fallback para outros casos
              }
            </li>
          ))
        : typeof dadosUsuario.idiomas === 'object'
          ? Object.entries(dadosUsuario.idiomas).map(([key, value], index) => (
              <li key={index}>{`${decodeSpecialChars(key)}: ${decodeSpecialChars(value)}`}</li>
            ))
          : <li>{decodeSpecialChars(dadosUsuario.idiomas)}</li>
      }
    </ul>
  ) : (
    <p>Campo não preenchido</p>
  )}
</div>

        <div className="divider" /> 

        <div className="section habilidades-qualificacoes">
          <h2>Habilidades e Qualificações</h2>
          {!isEmptyField(dadosUsuario.habilidades_qualificacoes) ? (
            <ul>
              {dadosUsuario.habilidades_qualificacoes.map((habilidade, index) => (
                <li key={index}>{decodeSpecialChars(habilidade)}</li>
              ))}
            </ul>
          ) : (
             <p>Campo não preenchido</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CurriculoCandidato;