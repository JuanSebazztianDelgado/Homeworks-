import React from 'react';

const LibroItem = ({ libro, actions }) => {
    return (
      <div className="libro-item">
        <img src={libro.imagen} alt={libro.titulo} className="libro-imagen" />
        <div className="libro-info">
          <h3>{libro.titulo}</h3>
          <p>Autor: {libro.autor}</p>
          <p>Categoría: {libro.categoria}</p>
          
          {libro.usuario && (
            <p className="libro-prestado">
              Prestado a: <strong>{libro.usuario}</strong>
            </p>
          )}
          
          {libro.fechaDevolucion && (
            <p>Devuelto: {libro.fechaDevolucion.toLocaleDateString()}</p>
          )}
          
          <div className="libro-actions">
            {actions}
          </div>
        </div>
      </div>
    );
  };
  
  export default LibroItem;