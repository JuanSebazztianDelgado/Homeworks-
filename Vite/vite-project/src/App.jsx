import React, { useState } from 'react';
import Header from './components/Header';
import EmployeeForm from './components/EmployeeForm';
import OrganizationalTree from './components/OrganizationalTree';
import NetworkGraph from './components/NetworkGraph';
import ConnectionManager from './components/ConnectionManager';
import { EmployeeProvider } from './context/EmployeeContext';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('tree');

  return (
    <EmployeeProvider>
      <div className="app">
        <Header />
        
        <nav className="view-switcher">
          <button 
            className={activeView === 'tree' ? 'active' : ''}
            onClick={() => setActiveView('tree')}
          >
            Vista Jerárquica (Árbol)
          </button>
          <button 
            className={activeView === 'network' ? 'active' : ''}
            onClick={() => setActiveView('network')}
          >
            Red de Comunicación (Grafo)
          </button>
          <button 
            className={activeView === 'manage' ? 'active' : ''}
            onClick={() => setActiveView('manage')}
          >
            Gestionar Empleados
          </button>
        </nav>

        <main className="main-content">
          {activeView === 'tree' && <OrganizationalTree />}
          {activeView === 'network' && <NetworkGraph />}
          {activeView === 'manage' && (
            <div className="manage-view">
              <EmployeeForm />
              <ConnectionManager />
            </div>
          )}
        </main>
      </div>
    </EmployeeProvider>
  );
}

export default App;