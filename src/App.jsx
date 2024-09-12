import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/homePage/Header';
import Hero from './components/homePage/Hero';
import Content from './components/homePage/Content';
import Content2 from './components/homePage/Content2';
import Content3 from './components/homePage/Content3';
import Content4 from './components/homePage/Content4';
import Content5 from './components/homePage/Content5';
import Footer from './components/homePage/Footer';

import CandidatoForm from './components/CandidatoForm';

import HeaderEmpresa from './components/empresa/headerEmpresa.jsx';
import MinhaArea from './components/empresa/MinhaArea.jsx';
import BuscaCurriculos from './components/empresa/BuscaCurriculos.jsx';
import MinhasVagas from './components/empresa/MinhasVagas.jsx';
import './scss/reset.scss';

function App() {  
  return (
    <Router>
      <div className="app-container"> {/* Classe principal que controla o layout */}
        <div className="content-wrap"> {/* Envolve o conteúdo */}
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Header />
                  <Hero />
                  <Content />
                  <Content2 />
                  <Content3 />
                  <Content4 />
                  <Content5 />
                </>
              } 
            />
            <Route path="/candidato" element={<CandidatoForm />} />
            <Route path="/homeEmpresa" 
              element={
                <>
                  <HeaderEmpresa/>
                  <MinhaArea/>
                </>
              } 
            />
            <Route path="/buscaCurriculos" 
              element={
                <>
                  <HeaderEmpresa/>
                  <BuscaCurriculos/>
                </>
              } 
            />
            <Route path="/minhasVagas" 
              element={
                <>
                  <HeaderEmpresa/>
                  <MinhasVagas/>
                </>
              } 
            />
          </Routes>
        </div>
        <Footer /> {/* Footer sempre no final */}
      </div>
    </Router>
  );
}

export default App;
