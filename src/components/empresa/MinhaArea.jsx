import React, { useState, useEffect } from 'react';
import '../../scss/empresa-scss/minhaArea.scss';
import { useNavigate } from 'react-router-dom';

function MinhaArea() {
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [isSalarioHidden, setIsSalarioHidden] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    salario: 0,
    tipoDeficiencia: 'TODAS',
    endereco: '',
    remota: 'Presencial',
    cargo: '',
    tipoContrato: 'CLT',
    quantidadeVagas: 1
  });

  const [nomeUsuario, setNomeEmpresa] = useState('');
  const [vagasAbertas, setVagasAbertas] = useState(0);
  const [vagasFechadas, setVagasFechadas] = useState(0);
  const [candidaturasAtivas, setCandidaturasAtivas] = useState(0);
  const [temVagas, setTemVagas] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handleCheckboxChange = (e) => {
    setIsSalarioHidden(e.target.checked);
  };

  useEffect(() => {
    document.title = "Minha área";
    const nomeEmpresaStorage = localStorage.getItem('nomeUsuario');
    if (nomeEmpresaStorage) {
      setNomeEmpresa(nomeEmpresaStorage);
    }

    const fetchVagasInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://api-accessable.vercel.app/vagasEmpresa', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setVagasAbertas(data.vagasAbertas);
          setVagasFechadas(data.vagasFechadas);
          setCandidaturasAtivas(data.candidaturasAtivas);
          setTemVagas(data.vagasAbertas > 0 || data.vagasFechadas > 0);
        }
      } catch (error) {
        console.error('Erro ao buscar informações das vagas:', error);
      }
    };

    fetchVagasInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'quantidadeVagas' ? parseInt(value, 10) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const salario = isSalarioHidden ? 0 : parseFloat(formData.salario);

    const dataToSend = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      salario: salario,
      tipoDeficiencia: formData.tipoDeficiencia,
      endereco: formData.endereco,
      remota: formData.remota,
      cargo: formData.cargo,
      tipoContrato: formData.tipoContrato,
      quantidadeVagas: formData.quantidadeVagas
    };

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('https://api-accessable.vercel.app/addVaga', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`     
        },
        body: JSON.stringify(dataToSend),
        mode: 'cors',
      });

      if (response.ok) {
        console.log('Vaga criada com sucesso');
        setShowForm(false);
        setNotification({ show: true, message: 'Você criou uma vaga com sucesso!' });

        setTimeout(() => {
          setNotification({ show: false, message: '' });
        }, 3000);

      } else {
        console.log('Erro ao criar vaga:', dataToSend);
        setNotification({ show: true, message: 'Erro ao criar a vaga. Por favor, tente novamente.' });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setNotification({ show: true, message: 'Erro ao criar a vaga. Por favor, tente novamente.' });
    }
  };

  return (
    <div className='minhaArea'>
      {notification.show && (
        <div className='notification-sucesso'>
          {notification.message}
        </div>
      )}
      <div className='mBloco1'>
        <div className='mContainer1'>
          <h2>Bom te ver, {nomeUsuario || 'Empresa'}!</h2>
          <p>Comece a usar nossos recursos para encontrar os candidatos ideais</p>
        </div>

        <div className='mContainer2'>
          <button className='btnCurriculo' onClick={() => navigate('/buscaCurriculos')}>
            Buscar novos currículos
          </button>
          <button className='btnVaga' onClick={() => setShowForm(true)}>
            Anunciar vaga
          </button>
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
                    <option value='Presencial'>Presencial</option>
                    <option value='Híbrida'>Híbrida</option>
                    <option value='HomeOffice'>Home Office</option>
                  </select>
                </label>
                <label>
                  Tipo de contrato:
                  <select name='tipoContrato' onChange={handleInputChange}>
                    <option value='CLT'>CLT</option>
                    <option value='PJ'>PJ</option>
                    <option value='ESTÁGIO'>Estágio</option>
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
                    <option value='TODAS'>Todas</option>
                    <option value='FISICA'>Deficiência física</option>
                    <option value='VISUAL'>Deficiência visual</option>
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
                <button type='button' onClick={handleNextStep}>
                  Próxima Etapa
                </button>
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
          {!temVagas ? (
            <div className='vaga-info'>
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
          ) : (
            <div className='vaga-info'>
              <div className='statusVagas'>
                <h4>Vagas abertas</h4>
                <div className='content'>
                  <p>Você possui {vagasAbertas} {vagasAbertas === 1 ? 'vaga aberta' : 'vagas abertas'}</p>
                </div>
              </div>

              <div className='statusVagas'>
                <h4>Vagas Fechadas</h4>
                <div className='content'>
                  <p>Você possui {vagasFechadas} {vagasFechadas === 1 ? 'vaga fechada' : 'vagas fechadas'}</p>
                </div>
              </div>

              <div className='statusVagas'>
                <h4>Candidaturas Ativas</h4>
                <div className='content'>
                  <p>Atualmente, você possui {candidaturasAtivas} {candidaturasAtivas === 1 ? 'candidatura ativa' : 'candidaturas ativas'} para suas vagas</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MinhaArea;