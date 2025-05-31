import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import './EmployeeForm.css';

function EmployeeForm() {
  const { employees, dispatch } = useEmployee();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    managerId: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.title.trim()) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const newEmployee = {
      id: Math.max(...employees.map(emp => emp.id), 0) + 1,
      name: formData.name.trim(),
      title: formData.title.trim(),
      subordinates: []
    };

    // Agregar empleado
    dispatch({ type: 'ADD_EMPLOYEE', payload: newEmployee });

    // Si tiene un manager, agregarlo como subordinado
    if (formData.managerId) {
      const manager = employees.find(emp => emp.id === parseInt(formData.managerId));
      if (manager) {
        const updatedManager = {
          ...manager,
          subordinates: [...manager.subordinates, newEmployee.id]
        };
        dispatch({ type: 'UPDATE_EMPLOYEE', payload: updatedManager });
      }
    }

    // Limpiar formulario
    setFormData({ name: '', title: '', managerId: '' });
  };

  const handleDelete = (employeeId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      dispatch({ type: 'DELETE_EMPLOYEE', payload: employeeId });
    }
  };

  return (
    <div className="employee-form-container">
      <div className="form-section">
        <h2>Agregar Nuevo Empleado</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ingresa el nombre completo"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Cargo *</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Desarrollador Senior"
            />
          </div>

          <div className="form-group">
            <label htmlFor="manager">Jefe Directo (Opcional)</label>
            <select
              id="manager"
              value={formData.managerId}
              onChange={(e) => setFormData({ ...formData, managerId: e.target.value })}
            >
              <option value="">Seleccionar jefe...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.title})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Agregar Empleado
          </button>
        </form>
      </div>

      <div className="employees-list">
        <h2>Lista de Empleados</h2>
        <div className="employee-cards">
          {employees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="employee-info">
                <h3>{employee.name}</h3>
                <p className="employee-title">{employee.title}</p>
                <p className="employee-stats">
                  Subordinados directos: {employee.subordinates.length}
                </p>
              </div>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(employee.id)}
                title="Eliminar empleado"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmployeeForm;