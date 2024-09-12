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

import HeaderEmpresa from './components/headerEmpresa';
import MinhaArea from './components/MinhaArea.jsx';
import './scss/reset.scss';

function App() {
  return (
    <Router>
      <div>
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
                <Footer />
              </>
            } 
          />
          <Route path="/candidato" element={<CandidatoForm />} />
          <Route path="/homeEmpresa" 
            element={
            <>
            <HeaderEmpresa/>
            <MinhaArea/>
            <Footer/>
            </>
            } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
