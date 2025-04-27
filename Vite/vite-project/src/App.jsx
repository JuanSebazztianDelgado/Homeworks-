import React from 'react'
import { BibliotecaProvider } from './context/Biblioteca'
import Navegacion from './components/Navegacion'
import Catalogo from './components/catalogo'
import LibrosDevueltos from './components/LibrosDevueltos'
import ColaEspera from './components/ColaEspera'
import './App.css'


function App() {
  return (
    <BibliotecaProvider>
      <div className="app">
        <Navegacion />
        
        <main className="content">
          <div className="main-section">
            <Catalogo />
          </div>
          
          <div className="side-sections">
            <LibrosDevueltos />
            <ColaEspera />
          </div>
        </main>
      </div>
    </BibliotecaProvider>
  );
}

export default App;
