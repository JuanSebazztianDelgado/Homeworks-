import React from 'react';
import { useBiblioteca } from '../hooks/useBiblioteca';

const ColaEspera = () => {
    const { colasEspera, catalogo } = useBiblioteca();
    
    const librosConCola = Object.keys(colasEspera)
      .filter(libroId => colasEspera[libroId].length > 0)
      .map(libroId => {
        const libroInfo = catalogo.find(libro => libro.id === parseInt(libroId));
        return {
          id: parseInt(libroId),
          info: libroInfo,
          cola: colasEspera[libroId]
        };
      });
  
    return (
      <div className="cola-espera-container">
        <h2>Colas de Espera</h2>
        
        {librosConCola.length > 0 ? (
          <div className="colas-lista">
            {librosConCola.map(libro => (
              <div key={libro.id} className="cola-item">
                <div className="cola-libro-info">
                  <h3>{libro.info ? libro.info.titulo : `Libro ID: ${libro.id}`}</h3>
                  {libro.info && (
                    <p>
                      <strong>Autor:</strong> {libro.info.autor} | 
                      <strong> Estado:</strong> {libro.info.disponible ? 'Disponible' : 'Prestado'}
                      {!libro.info.disponible && libro.info.usuario && (
                        <span> a {libro.info.usuario}</span>
                      )}
                    </p>
                  )}
                </div>
                
                <div className="cola-usuarios">
                  <h4>Usuarios en espera:</h4>
                  <ol>
                    {libro.cola.map((usuario, idx) => (
                      <li key={idx}>
                        {usuario}
                        {idx === 0 && <span className="siguiente-badge">Siguiente</span>}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-resultados">No hay colas de espera activas.</p>
        )}
      </div>
    );
  };
  
  export default ColaEspera;