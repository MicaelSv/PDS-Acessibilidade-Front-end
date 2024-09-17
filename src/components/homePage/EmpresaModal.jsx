import '../../scss/empresaModal.scss';

function EmpresaModal({ onClose }) {
  return (
    <div className="empresa-modal-overlay">
      <div className="empresa-modal-content">
        <button className="empresa-close-button" onClick={onClose}>X</button>
        <div className="empresa-modal-body">
          <div className="empresa-modal-left">
            <img src="src/assets/img-empresa_modal.jpg" alt="Empresa" />
          </div>
          <div className="empresa-modal-right">
            <h2>Registro de Empresa</h2>
            <form>
              <label>Nome da Empresa</label>
              <input type="text" placeholder="Digite o nome da empresa" required />

              <label>CNPJ</label>
              <input type="text" placeholder="Digite o CNPJ da empresa" required />

              <div className="empresa-flex-group">
                <div>
                  <label>Número de Funcionários</label>
                  <input type="number" placeholder="Digite o nº de funcionários" required />
                </div>
                <div>
                  <label>Cidade</label>
                  <input type="text" placeholder="Digite a cidade" className="empresa-cidade" required />
                </div>
              </div>

              <div className="empresa-flex-group">
                <div>
                  <label>Email Corporativo</label>
                  <input type="email" placeholder="Digite o email corporativo" required />
                </div>
                <div>
                  <label>Senha</label>
                  <input type="password" placeholder="Digite a senha" className="empresa-senha" required />
                </div>
              </div>

              <label>Telefone Fixo</label>
              <input type="text" placeholder="Digite o telefone fixo" required />

              <button className="empresa-submit-button">Registrar Empresa</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpresaModal;
