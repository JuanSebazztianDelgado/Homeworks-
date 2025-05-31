import React from 'react';
import { useEmployee } from '../context/EmployeeContext';
import './Header.css';

function Header() {
  const { employees } = useEmployee();

  return (
    <header className="header">
      <div className="header-content">
        <h1>Sistema de Organización Empresarial</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">{employees.length}</span>
            <span className="stat-label">Empleados</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;