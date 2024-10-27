import '../../scss/homePage-scss/content5.scss';
import { forwardRef } from 'react';

const Content5 = forwardRef((props, ref) => {
  return (
    <div ref={ref} className='container-content5'>
      <div className='container-in'>
        <h2>Pronto para dar o próximo passo?</h2>
        <p>Junte-se a nós e faça parte de uma comunidade que valoriza a inclusão e a diversidade. Vamos transformar sua carreira juntos!</p>
      </div>
    </div>
  );
});

export default Content5;
