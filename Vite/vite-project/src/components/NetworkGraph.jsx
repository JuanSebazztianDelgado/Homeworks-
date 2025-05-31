import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { useEmployee } from '../context/EmployeeContext';
import './NetworkGraph.css';

function NetworkGraph() {
  const { employees, connections } = useEmployee();
  const networkRef = useRef(null);
  const networkInstance = useRef(null);

  useEffect(() => {
    if (!networkRef.current || employees.length === 0) return;

    // Preparar nodos
    const nodes = employees.map(emp => ({
      id: emp.id,
      label: `${emp.name}\n${emp.title}`,
      color: {
        background: '#4a90e2',
        border: '#2c5282',
        highlight: {
          background: '#63b3ed',
          border: '#2c5282'
        }
      },
      font: {
        color: 'white',
        size: 12,
        multi: true
      },
      shape: 'circle',
      size: 25,
      borderWidth: 2
    }));

    // Preparar aristas
    const edges = connections.map((conn, index) => ({
      id: index,
      from: conn.from,
      to: conn.to,
      color: {
        color: '#718096',
        highlight: '#2d3748'
      },
      width: 2,
      arrows: {
        to: {
          enabled: true,
          scaleFactor: 0.8
        }
      },
      smooth: {
        type: 'continuous',
        roundness: 0.2
      }
    }));

    const data = { nodes, edges };

    const options = {
      layout: {
        improvedLayout: true,
        hierarchical: {
          enabled: false
        }
      },
      physics: {
        enabled: true,
        stabilization: {
          enabled: true,
          iterations: 100
        },
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.1,
          springLength: 150,
          springConstant: 0.05,
          damping: 0.09
        }
      },
      interaction: {
        dragNodes: true,
        dragView: true,
        zoomView: true,
        hover: true,
        selectConnectedEdges: true
      },
      nodes: {
        borderWidth: 2,
        shadow: true,
        font: {
          multi: 'html'
        }
      },
      edges: {
        shadow: true,
        smooth: true
      }
    };

    // Destruir instancia anterior si existe
    if (networkInstance.current) {
      networkInstance.current.destroy();
    }

    // Crear nueva instancia
    networkInstance.current = new Network(networkRef.current, data, options);

    // Event listeners
    networkInstance.current.on('selectNode', (params) => {
      const nodeId = params.nodes[0];
      const employee = employees.find(emp => emp.id === nodeId);
      
      if (employee) {
        const connectionsCount = connections.filter(
          conn => conn.from === nodeId || conn.to === nodeId
        ).length;
        
        alert(`
          Empleado: ${employee.name}
          Cargo: ${employee.title}
          Conexiones de comunicación: ${connectionsCount}
          Subordinados directos: ${employee.subordinates.length}
        `);
      }
    });

    return () => {
      if (networkInstance.current) {
        networkInstance.current.destroy();
        networkInstance.current = null;
      }
    };
  }, [employees, connections]);

  if (employees.length === 0) {
    return (
      <div className="network-container">
        <div className="no-data">
          <h2>No hay datos para mostrar</h2>
          <p>Agrega empleados y conexiones para ver la red</p>
        </div>
      </div>
    );
  }

  return (
    <div className="network-container">
      <div className="network-header">
        <h2>Red de Comunicación (Grafo)</h2>
        <p>Arrastra los nodos para reorganizar. Haz clic en un nodo para ver detalles.</p>
      </div>
      
      <div className="network-stats">
        <div className="stat-card">
          <h3>Nodos</h3>
          <span>{employees.length}</span>
        </div>
        <div className="stat-card">
          <h3>Conexiones</h3>
          <span>{connections.length}</span>
        </div>
        <div className="stat-card">
          <h3>Densidad</h3>
          <span>
            {employees.length > 1 
              ? ((connections.length / (employees.length * (employees.length - 1))) * 100).toFixed(1)
              : 0
            }%
          </span>
        </div>
      </div>

      <div ref={networkRef} className="network-graph"></div>
      
      <div className="network-legend">
        <div className="legend-item">
          <div className="legend-node"></div>
          <span>Empleado (nodo)</span>
        </div>
        <div className="legend-item">
          <div className="legend-edge"></div>
          <span>Conexión de comunicación (arista)</span>
        </div>
        <div className="legend-item">
          <span>💡 Las flechas indican la dirección de la comunicación</span>
        </div>
      </div>
    </div>
  );
}

export default NetworkGraph;