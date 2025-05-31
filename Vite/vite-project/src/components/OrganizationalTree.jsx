import React, { useMemo } from 'react';
import Tree from 'react-d3-tree';
import { useEmployee } from '../context/EmployeeContext';
import './OrganizationalTree.css';

function OrganizationalTree() {
  const { buildTreeData, getTotalSubordinates } = useEmployee();

  const treeData = useMemo(() => buildTreeData(), [buildTreeData]);

  const renderCustomNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r="25"
        fill="#4a90e2"
        stroke="#2c5282"
        strokeWidth="2"
        onClick={toggleNode}
        style={{ cursor: 'pointer' }}
      />
      <text
        textAnchor="middle"
        fill="white"
        fontSize="10"
        fontWeight="bold"
        dy="0.3em"
        onClick={toggleNode}
        style={{ cursor: 'pointer', pointerEvents: 'none' }}
      >
        {nodeDatum.attributes?.id}
      </text>
      
      {/* Nombre del empleado */}
      <text
        textAnchor="middle"
        fill="#2d3748"
        fontSize="12"
        fontWeight="bold"
        dy="45"
        style={{ pointerEvents: 'none' }}
      >
        {nodeDatum.name}
      </text>
      
      {/* Título del empleado */}
      <text
        textAnchor="middle"
        fill="#4a5568"
        fontSize="10"
        dy="60"
        style={{ pointerEvents: 'none' }}
      >
        {nodeDatum.attributes?.title}
      </text>
      
      {/* Total de subordinados */}
      <text
        textAnchor="middle"
        fill="#e53e3e"
        fontSize="9"
        fontWeight="bold"
        dy="75"
        style={{ pointerEvents: 'none' }}
      >
        Total subordinados: {nodeDatum.attributes?.totalSubordinates || 0}
      </text>
    </g>
  );

  if (!treeData) {
    return (
      <div className="tree-container">
        <div className="no-data">
          <h2>No hay datos para mostrar</h2>
          <p>Agrega empleados para ver el organigrama</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tree-container">
      <div className="tree-header">
        <h2>Estructura Organizacional (Árbol Jerárquico)</h2>
        <p>Haz clic en los nodos para expandir/contraer ramas</p>
      </div>
      
      <div className="tree-wrapper">
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="elbow"
          translate={{ x: 400, y: 100 }}
          nodeSize={{ x: 200, y: 150 }}
          renderCustomNodeElement={renderCustomNode}
          separation={{ siblings: 1.5, nonSiblings: 2 }}
          zoom={0.8}
          collapsible={true}
          initialDepth={3}
        />
      </div>
      
      <div className="tree-legend">
        <div className="legend-item">
          <div className="legend-circle"></div>
          <span>Cada círculo representa un empleado</span>
        </div>
        <div className="legend-item">
          <div className="legend-line"></div>
          <span>Las líneas muestran relaciones jerárquicas</span>
        </div>
        <div className="legend-item">
          <span className="legend-text">El número rojo indica subordinados totales (directos + indirectos)</span>
        </div>
      </div>
    </div>
  );
}

export default OrganizationalTree;