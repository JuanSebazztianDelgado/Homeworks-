import React, { createContext, useContext, useReducer, useEffect } from 'react';

const EmployeeContext = createContext();

// Datos iniciales de ejemplo
const initialEmployees = [
  {
    id: 1,
    name: "Ana García",
    title: "CEO",
    subordinates: [2, 3]
  },
  {
    id: 2,
    name: "Carlos López",
    title: "CTO",
    subordinates: [4, 5]
  },
  {
    id: 3,
    name: "María Rodríguez",
    title: "CFO",
    subordinates: [6]
  },
  {
    id: 4,
    name: "Pedro Martínez",
    title: "Lead Developer",
    subordinates: [7, 8]
  },
  {
    id: 5,
    name: "Laura González",
    title: "UX Designer",
    subordinates: []
  },
  {
    id: 6,
    name: "José Hernández",
    title: "Accountant",
    subordinates: []
  },
  {
    id: 7,
    name: "Sofia Díaz",
    title: "Frontend Developer",
    subordinates: []
  },
  {
    id: 8,
    name: "Miguel Torres",
    title: "Backend Developer",
    subordinates: []
  }
];

// Conexiones iniciales de comunicación
const initialConnections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 6 },
  { from: 4, to: 7 },
  { from: 4, to: 8 },
  { from: 5, to: 7 }, // Conexión lateral
  { from: 6, to: 3 }, // Conexión bidireccional
];

function employeeReducer(state, action) {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    
    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map(emp => 
          emp.id === action.payload.id ? action.payload : emp
        )
      };
    
    case 'DELETE_EMPLOYEE':
      const employeeToDelete = state.employees.find(emp => emp.id === action.payload);
      // Remover empleado de subordinados de otros
      const updatedEmployees = state.employees
        .filter(emp => emp.id !== action.payload)
        .map(emp => ({
          ...emp,
          subordinates: emp.subordinates.filter(subId => subId !== action.payload)
        }));
      
      // Remover conexiones relacionadas
      const updatedConnections = state.connections.filter(
        conn => conn.from !== action.payload && conn.to !== action.payload
      );
      
      return {
        ...state,
        employees: updatedEmployees,
        connections: updatedConnections
      };
    
    case 'ADD_CONNECTION':
      const connectionExists = state.connections.some(
        conn => conn.from === action.payload.from && conn.to === action.payload.to
      );
      if (!connectionExists) {
        return {
          ...state,
          connections: [...state.connections, action.payload]
        };
      }
      return state;
    
    case 'REMOVE_CONNECTION':
      return {
        ...state,
        connections: state.connections.filter(
          conn => !(conn.from === action.payload.from && conn.to === action.payload.to)
        )
      };
    
    default:
      return state;
  }
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(employeeReducer, {
    employees: initialEmployees,
    connections: initialConnections
  });

  // Funciones helper
  const getEmployeeById = (id) => {
    return state.employees.find(emp => emp.id === id);
  };

  const getTotalSubordinates = (employeeId) => {
    const employee = getEmployeeById(employeeId);
    if (!employee) return 0;
    
    let total = employee.subordinates.length;
    employee.subordinates.forEach(subId => {
      total += getTotalSubordinates(subId);
    });
    return total;
  };

  const buildTreeData = () => {
    // Encontrar el CEO (empleado sin jefe)
    const allSubordinateIds = new Set();
    state.employees.forEach(emp => {
      emp.subordinates.forEach(subId => allSubordinateIds.add(subId));
    });
    
    const ceo = state.employees.find(emp => !allSubordinateIds.has(emp.id));
    
    if (!ceo) return null;

    const buildNode = (employee) => {
      const subordinates = employee.subordinates
        .map(subId => getEmployeeById(subId))
        .filter(Boolean)
        .map(buildNode);
      
      return {
        name: employee.name,
        attributes: {
          title: employee.title,
          id: employee.id,
          totalSubordinates: getTotalSubordinates(employee.id)
        },
        children: subordinates.length > 0 ? subordinates : undefined
      };
    };

    return buildNode(ceo);
  };

  const value = {
    employees: state.employees,
    connections: state.connections,
    dispatch,
    getEmployeeById,
    getTotalSubordinates,
    buildTreeData
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployee() {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
}