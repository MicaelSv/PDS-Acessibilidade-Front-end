import '../../scss/minhaArea.scss';

function MinhaArea() {
  return (
    <div className='minhaArea'>
        <div className='mBloco1'>
            <div className='mContainer1'>
                <h2>Bom te ver, FinNova Soluções!</h2>
                <p>Comece a usar nossos recursos para encontrar os candidatos ideais</p>
            </div>
            
            <div className='mContainer2'>
                <button className='btnCurriculo'>Buscar novos currículos</button>
                <button className='btnVaga'>Anunciar vaga</button>
            </div>
        </div>

        <div className='mBloco2'>
            <div className='buscarCurriculos'>
                <h4>Faça sua busca de currículos!</h4>
                <div className='content'>
                    <p>Comece agora mesmo e encontre os melhores currículos</p>
                    <img src='src\assets\document.svg.png' width={20} height={20} alt='Ícone de documento'></img>
                </div>
            </div>

            <div className='anunciarVagas'>
                <h4>Anuncie uma vaga para receber candidaturas</h4>
                <div className='content'>
                    <p>Você ainda não tem vagas ativas!</p>
                    <img src='src\assets\mala.png' width={20} height={20} alt='Ícone de mala'></img>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MinhaArea;
