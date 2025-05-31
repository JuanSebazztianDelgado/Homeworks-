import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import './ConnectionManager.css';

function ConnectionManager() {
  const { employees, connections, dispatch } = useEmployee();
  const [newConnection, setNewConnection] = useState({
    from: '',
    to: ''
  });

  const handleAddConnection = (e) => {
    e.preventDefault();
    
    if (!newConnection.from || !newConnection.to) {
      alert('Por favor selecciona ambos empleados');
      return;
    }

    if (newConnection.from === newConnection.to) {
      alert('Un empleado no puede conectarse consigo mismo');
      return;
    }

    dispatch({
      type: 'ADD_CONNECTION',
      payload: {
        from: parseInt(newConnection.from),
        to: parseInt(newConnection.to)
      }
    });

    setNewConnection({ from: '', to: '' });
  };

  const handleRemoveConnection = (from, to) => {
    if (window.confirm('¿Eliminar esta conexión de comunicación?')) {
      dispatch({
        type: 'REMOVE_CONNECTION',
        payload: { from, to }
      });
    }
  };

  const getEmployeeName = (id) => {
    const employee = employees.find(emp => emp.id === id);
    return employee ? `${employee.name} (${employee.title})` : 'Desconocido';
  };

  return (
    <div className="connection-manager">
      <div className="add-connection-section">
        <h2>Agregar Conexión de Comunicación</h2>
        <form onSubmit={handleAddConnection} className="connection-form">
          <div className="connection-inputs">
            <div className="form-group">
              <label>Desde:</label>
              <select
                value={newConnection.from}
                onChange={(e) => setNewConnection({ ...newConnection, from: e.target.value })}
              >
                <option value="">Seleccionar empleado...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.title})
                  </option>
                ))}
              </select>
            </div>

            <div className="arrow">→</div>

            <div className="form-group">
              <label>Hacia:</label>
              <select
                value={newConnection.to}
                onChange={(e) => setNewConnection({ ...newConnection, to: e.target.value })}
              >
                <option value="">Seleccionar empleado...</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name} ({emp.title})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="add-connection-btn">
            Agregar Conexión
          </button>
        </form>
      </div>

      <div className="connections-list">
        <h2>Conexiones Existentes ({connections.length})</h2>
        {connections.length === 0 ? (
          <p className="no-connections">No hay conexiones de comunicación establecidas</p>
        ) : (
          <div className="connection-items">
            {connections.map((connection, index) => (
              <div key={index} className="connection-item">
                <div className="connection-info">
                  <span className="from-employee">
                    {getEmployeeName(connection.from)}
                  </span>
                  <span className="connection-arrow">→</span>
                  <span className="to-employee">
                    {getEmployeeName(connection.to)}
                  </span>
                </div>
                <button
                  className="remove-connection-btn"
                  onClick={() => handleRemoveConnection(connection.from, connection.to)}
                  title="Eliminar conexión"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectionManager;