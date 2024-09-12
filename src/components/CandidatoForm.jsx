import React, { useState } from 'react';
import "../scss/candidatoForm.scss";

function CandidatoForm() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    cep: '',
    cargoDesejado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode processar os dados do formulário, enviar para uma API etc.
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h1>Cadastro de Candidato</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <label>Senha:</label>
        <input 
          type="password" 
          name="senha" 
          value={formData.senha} 
          onChange={handleChange} 
          required 
        />

        <label>CEP:</label>
        <input 
          type="text" 
          name="cep" 
          value={formData.cep} 
          onChange={handleChange} 
          required 
        />

        <label>Cargo Desejado:</label>
        <input 
          type="text" 
          name="cargoDesejado" 
          value={formData.cargoDesejado} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CandidatoForm;
