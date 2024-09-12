import "../../scss/content2.scss";

function Content2() {
  return (
    <div className="container2">
      <div className="content">
      <div className="bloco1">
        <div className="conex">
          <img
            src="src\assets\grafico.png"
            className="img-grafic"
            height={55}
            width={55}
          ></img>
          <p className="titulo-grafico">
            Conexões significativas
            <br />
            <span className="conex-text">
              Atraímos empresas que não só falam sobre inclusão, mas que
              realmente a implementam no dia a dia.
            </span>
          </p>
        </div>
      </div>

      <div className="bloco2">
        <div className="suporte">
          <img
            src="src\assets\suporte.png"
            className="img-suporte"
            height={55}
            width={55}
          ></img>
          <p className="titulo-suporte">
            Suporte personalizado
            <br />
            <span className="suporte-text">
              Oferecemos assistente dedicado para ajudar na sua jornada de busca
              por trabalho acessível e inclusivo.
            </span>
          </p>
        </div>
      </div>

      <div className="bloco3">
        <div className="oportunidade">
          <img
            src="src\assets\oportunidade.png"
            className="img-oportunidade"
            height={55}
            width={55}
          ></img>
          <p className="titulo-oportunidade">
            Oportunidades Verdadeiras
            <br />
            <span className="oportunidade-text">
              Aqui, você encontra mais do que apenas empregos; você encontra um
              lugar onde suas habilidades são apreciadas de verdade.
            </span>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Content2;
