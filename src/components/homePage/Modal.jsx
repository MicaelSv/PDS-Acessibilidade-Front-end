import '../../scss/homePage-scss/modal.scss';

function Modal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <div className="modal-left">
            <img src="/img-register-candidato.jpg" alt="Registration" />
          </div>
          <div className="modal-right">
            <h2>Registro de Candidato</h2> 
            <form>
              <label>Nome e Sobrenome</label>
              <input type="text" placeholder="Seu nome completo" required />
              
              <label>Email</label>
              <input type="email" placeholder="Seu email" required />
              
              <label>Senha</label>
              <input type="password" placeholder="Sua senha" required />
              
              <label>Telefone</label>
              <input type="tel" placeholder="Seu telefone" required />
              
              <label>Cidade</label>
              <input type="text" placeholder="Sua cidade" required />
              
              <label>Cargo Desejado</label>
              <input type="text" placeholder="Cargo desejado" required />
              
              <button type="submit" className="submit-button">Registrar Candidato</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
