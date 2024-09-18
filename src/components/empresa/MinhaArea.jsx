import React, { useState } from 'react';
import '../../scss/empresa-scss/minhaArea.scss';

function MinhaArea() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [isSalarioHidden, setIsSalarioHidden] = useState(false); // Novo estado para o checkbox


  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleCheckboxChange = (e) => {
    setIsSalarioHidden(e.target.checked); // Atualiza o estado quando o checkbox é marcado/desmarcado
  };

  return (
    <div className='minhaArea'>
      <div className='mBloco1'>
        <div className='mContainer1'>
          <h2>Bom te ver, FinNova Soluções!</h2>
          <p>Comece a usar nossos recursos para encontrar os candidatos ideais</p>
        </div>
        
        <div className='mContainer2'>
          <button className='btnCurriculo'>Buscar novos currículos</button>
          <button className='btnVaga' onClick={() => setShowForm(true)}>Anunciar vaga</button>
        </div>
      </div>

      {showForm ? (
        <div className='formContainer'>
          <div className='progressBar'>
              {step > 1 && (
                <img
                  src='/arrow.png'
                  alt='Voltar'
                  className='arrow'
                  onClick={handlePrevStep}
                />
              )}
            <div className={`step ${step >= 1 ? 'completed' : ''}`}>
              <span>1</span>
              <p>Etapa 1</p>
            </div>
            <div className={`step ${step >= 2 ? 'completed' : ''}`}>
              <span>2</span>
              <p>Etapa 2</p>
            </div>
          </div>

          {step === 1 && (
            <div className='formStep'>
              <form>
                <label>
                  Título do anúncio:
                  <input type='text' name='titulo' placeholder='Digite o título do anúncio'/>
                </label>
                <label>
                  Tipo de vaga:
                  <select name='tipo'>
                    <option value='presencial'>Presencial</option>
                    <option value='hibrida'>Híbrida</option>
                    <option value='homeoffice'>Home Office</option>
                  </select>
                </label>
                <label>
                  Tipo de deficiência:
                  <select name='tipo-def'>
                    <option value='def-fisica'>Deficiência física</option>
                    <option value='def-visual'>Deficiência visual</option>
                    <option value='def-motora'>Deficiência motora</option>
                  </select>
                </label>

                <label>
                  Local de trabalho:
                  <input type='text' name='local' placeholder='Digite um endereço' />
                </label>
                <label>
                  Número de vagas:
                  <input type='number' name='numeroVagas' />
                </label>
                <label>
                  Descrição da vaga:
                  <textarea name='descricao' className='descricao' ></textarea>
                </label>
                <button type='button' onClick={handleNextStep}>Próxima Etapa</button>
              </form>
            </div>
          )}
          {step === 2 && (
  <div className='formStep'>
    <form>
      <label>
        Remuneração mínima:
        <input type='number' name='remuneracaoMinima' disabled={isSalarioHidden} />
      </label>
      <label>
        Remuneração máxima:
        <input type='number' name='remuneracaoMaxima' disabled={isSalarioHidden} />
      </label>

      <div className='checkboxContainer'>
        <input
          type='checkbox'
          id='naoExibirSalario'
          name='naoExibirSalario'
          onChange={handleCheckboxChange}
        />
        <label htmlFor='naoExibirSalario'>
          Não exibir salário (À combinar)
        </label>
      </div>

      <label>
        Nível de escolaridade:
        <select name='escolaridade'>
          <option value='fundamental'>Fundamental</option>
          <option value='medio'>Médio</option>
          <option value='superior'>Superior</option>
        </select>
      </label>
      <label>
        Sobre a empresa:
        <textarea name='sobreEmpresa' className='sobreEmpresa' placeholder='Dica: fale sobre o ramo de atuação da empresa, tempo de mercado, relação com os colaboradores, etc. Quanto mais informações, mais chances de atrair bons candidatos.'></textarea>
      </label>
      <button type='submit'>Enviar</button>
    </form>
  </div>
)}

        </div>
      ) : (
        <div className='mBloco2'>
          <div className='buscarCurriculos'>
            <h4>Faça sua busca de currículos!</h4>
            <div className='content'>
              <p>Comece agora mesmo e encontre os melhores currículos</p>
              <img src='/document.svg.png' width={20} height={20} alt='Ícone de documento' />
            </div>
          </div>

          <div className='anunciarVagas'>
            <h4>Anuncie uma vaga para receber candidaturas</h4>
            <div className='content'>
              <p>Você ainda não tem vagas ativas!</p>
              <img src='/mala.png' width={20} height={20} alt='Ícone de mala' />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinhaArea;
