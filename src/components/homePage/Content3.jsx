import "../../scss/homePage-scss/content3.scss";

function Content3() {
  return (
    <div className="content-3">
      <div className="escolher-plataforma">
        <h2>Por que escolher nossa plataforma ?</h2>
        <p className="paragrafo1">
          Descubra como podemos transformar sua busca por emprego em uma
          experiência empolgante e rica.
        </p>

        <div className="min-textos">
          <h3>Acessibilidade total</h3>
          <p>
            Navegue por uma interface intuitiva que realmente entende suas
            necessidades e facilita sua busca.
          </p>

          <h3>Empresas comprometidas</h3>
          <p>
            Conecte-se com empresas que estão na vanguarda da inclusão e que
            abraçam a diversidade em todas as suas formas.
          </p>

          <h3>Apoio contínuo</h3>
          <p>
            Não está sozinho! Estamos aqui para fornecer apoio e orientação em
            cada passo do caminho.
          </p>
        </div>
      </div>

      <img
        src="/trabalhadores.png"
        className="img-trabalhador"
        height={420}
        width={420}
      ></img>
    </div>
  );
}

export default Content3;
