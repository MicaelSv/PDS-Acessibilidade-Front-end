import '../src/scss/index.scss';
import '../src/scss/patterns.scss';


function Header(){
    return(
        <header>
        <div className='buttons'>
          <div className='flex gap-20'>
            <img src='src\assets\temp.png' height={40} width={40}></img>
            <p>AccessAble</p>
          </div>
          <p>Sobre nós</p>
          <p>Serviços</p>
        </div>
        <div className='login-group'>
          <button className='cadastro'>Cadastre-se</button>
          <button className='entrar'>Entrar</button>
        </div>
      </header>
    )
}

export default Header