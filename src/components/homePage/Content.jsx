import '../../scss/homePage-scss/content.scss';
import { forwardRef } from 'react';

const Content = forwardRef((props, ref) => {
  return (
    <section ref={ref} className="section-1">
      <div className="left">
        <img src="/quem_somos.png" height={400} width={500} alt="Quem somos" />
      </div>
      <div className="right-text">
        <div className="text-content">
          <h2>Quem somos</h2>
          <p>
            Somos uma plataforma dedicada a fechar a lacuna entre pessoas com
            deficiência e empresas que priorizam a inclusão. Nossa missão é
            garantir que cada talento tenha uma chance justa no mercado de
            trabalho.
          </p>
          <p>Acreditamos que a diversidade é a chave para a inovação!</p>
        </div>
      </div>
    </section>
  );
});

export default Content;