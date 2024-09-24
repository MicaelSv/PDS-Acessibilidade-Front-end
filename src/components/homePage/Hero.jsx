import "../../scss/homePage-scss/hero.scss";

function Hero() {
  return (
    <div className="container">
      
      <div className="content">

        <div className="left">

          <h1 className="h1-hero">
            Empoderando talentos,
            <br /> conectando
            <br /> oportunidades inclusivas
          </h1>
          
          <div>
            <p className="hero-paragraph">
              Combinamos pessoas talentosas com deficiência com empresas que
              realmente se importam com isso. Venha explorar um mundo de
              oportunidades inclusivas e acessíveis, onde todas as habilidades
              são valorizadas e respeitadas.
            </p>
          </div>

          <button className="button-hero">Explorar vagas</button>
        </div>

        <div className="right">
          <div className="img-hero">
            <img src="/img-hero.png" height={400} width={400}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
