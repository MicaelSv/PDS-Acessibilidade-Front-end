import '../../scss/content4.scss';

function Content4(){
    return(
        <div className='container4'>
            <div className="content">
            <div className='emprego-ideal'>
                <h2>Encontre seu emprego ideal conosco</h2>
                <p>Oferecemos serviços como correspondência de empregos, criação de currículos e acesso a vagas remotas e acessíveis, focados em proporcionar oportunidades inclusivas que valorizam suas habilidades.</p>
            </div>

            <div className='blocos'>
                
                <div className='cubo1'>
                    <img src='src\assets\cubo.png' className='img-cubo' height={30} width={28}></img>
                    <h3>Vagas alinhadas ao seu perfil</h3>
                    <p>Nosso serviço de correspondência de empregos conecta você às oportunidades perfeitas que estão alinhadas com suas habilidades e interesses.</p>
                </div>

                <div className='cubo2'>
                    <img src='src\assets\cubo.png' className='img-cubo' height={30} width={28}></img>
                    <h3>Construa um ótimo currículo</h3>
                    <p>Nosso serviço de criação de currículos ajuda você a criar um currículo profissional que se destaca da concorrência.</p>
                </div>

                <div className='cubo3'>
                    <img src='src\assets\cubo.png' className='img-cubo' height={30} width={28}></img>
                    <h3>Vagas remotas e acessíveis</h3>
                    <p>Explore oportunidades de trabalho remoto que oferecem flexibilidade e acessibilidade, permitindo que você trabalhe de qualquer lugar.</p>
                </div>
                
            </div>
            </div>

        </div>
    )
}

export default Content4;
