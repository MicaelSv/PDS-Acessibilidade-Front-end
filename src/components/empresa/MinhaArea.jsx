import React, { useState } from 'react';
import '../../scss/empresa-scss/minhaArea.scss';

function MinhaArea() {
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [isSalarioHidden, setIsSalarioHidden] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    salario: 0,
    tipoDeficiencia: '',
    endereco: '',
    remota: false,
    informacoesAdicionais: '',
    cargo: '',
    tipoContrato: '',
    quantidadeVagas: ''
  });

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleCheckboxChange = (e) => {
    setIsSalarioHidden(e.target.checked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se o salário deve ser ocultado
    const salario = isSalarioHidden ? 0 : parseFloat(formData.salario);

    // Monta o objeto a ser enviado
    const dataToSend = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      salario: salario,
      tipoDeficiencia: formData.tipoDeficiencia,
      endereco: formData.endereco,
      remota: formData.remota === 'homeoffice', // Ajuste para o valor correto (true/false)
      informacoesAdicionais: formData.informacoesAdicionais,
      cargo: formData.cargo,
      tipoContrato: formData.tipoContrato,
      quantidadeVagas: formData.quantidadeVagas
    };

    // Log para verificar o JSON que está sendo enviado
    console.log('JSON que está sendo enviado:', JSON.stringify(dataToSend));

    try {
      const response = await fetch('/api/vagas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
        mode: 'cors', // Corrigido de 'no-cors' para 'cors'
      });

      if (response.ok) {
        console.log('Vaga criada com sucesso');
        setShowForm(false);
      } else {
        console.log('Erro ao criar vaga:', dataToSend);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
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
              <img src='/arrow.png' alt='Voltar' className='arrow' onClick={handlePrevStep} />
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
                  <input type='text' name='titulo' placeholder='Digite o título do anúncio' onChange={handleInputChange} />
                </label>
                <label>
                  Tipo de vaga:
                  <select name='remota' onChange={handleInputChange}>
                    <option value='presencial'>Presencial</option>
                    <option value='hibrida'>Híbrida</option>
                    <option value='homeoffice'>Home Office</option>
                  </select>
                </label>
                <label>
                  Tipo de contrato:
                  <select name='tipoContrato' onChange={handleInputChange}>
                    <option value='clt'>CLT</option>
                    <option value='pj'>PJ</option>
                    <option value='estagio'>Estágio</option>
                  </select>
                </label>

                <label>
                  Quantidade de vagas:
                  <input
                    type='number'
                    name='quantidadeVagas'
                    onChange={handleInputChange}
                    min='1'
                    placeholder='Informe a quantidade de vagas'
                  />
                </label>

                <label>
                  Tipo de deficiência:
                  <select name='tipoDeficiencia' onChange={handleInputChange}>
                    <option value='FISICA'>Deficiência física</option>
                    <option value='VISUAL'>Deficiência visual</option>
                    <option value='MOTORA'>Deficiência motora</option>
                    <option value='AUDITIVA'>Deficiência auditiva</option>
                    <option value='MULTIPLA'>Deficiência multipla</option>
                  </select>
                </label>

                <label>
                  Local de trabalho:
                  <input type='text' name='endereco' placeholder='Digite um endereço' onChange={handleInputChange} />
                </label>
                <label>
                  Descrição da vaga:
                  <textarea name='descricao' className='descricao' onChange={handleInputChange}></textarea>
                </label>
                <button type='button' onClick={handleNextStep}>Próxima Etapa</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className='formStep'>
              <form onSubmit={handleSubmit}>
                <label>
                  Remuneração:
                  <input type='number' name='salario' disabled={isSalarioHidden} onChange={handleInputChange} />
                </label>

                <div className='checkboxContainer'>
                  <input type='checkbox' id='naoExibirSalario' onChange={handleCheckboxChange} />
                  <label htmlFor='naoExibirSalario'>Não exibir salário (À combinar)</label>
                </div>

                <label>
                  Cargo desejado:
                  <input type='text' name='cargo' onChange={handleInputChange} />
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