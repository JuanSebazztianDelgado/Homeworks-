import React, { useState } from 'react';
import { useBiblioteca } from '../hooks/useBiblioteca'; 
import LibroItem from './LibroItem';

const LibrosDevueltos = () => {
    const { librosDevueltos, rehacerDevolucion } = useBiblioteca(); 
    const [notificacion, setNotificacion] = useState('');
  
    
    const handleRehacer = (index) => {
      const mensaje = rehacerDevolucion(index);
      mostrarNotificacion(mensaje);
    };
  
    
    const mostrarNotificacion = (mensaje) => {
      setNotificacion(mensaje);
      setTimeout(() => {
        setNotificacion('');
      }, 3000);
    };
  
    return (
      <div className="libros-devueltos-container">
        <h2>Historial de Devoluciones</h2>
        
        {notificacion && (
          <div className="notificacion">{notificacion}</div>
        )}
        
        {librosDevueltos.length > 0 ? ( 
          <div className="pila-libros">
            {librosDevueltos.map((libro, index) => ( 
              <LibroItem
                key={`${libro.id}-${index}`}
                libro={libro}
                actions={
                  <button 
                    className="btn-rehacer"
                    onClick={() => handleRehacer(index)}
                  >
                    Rehacer devolución
                  </button>
                }
              />
            ))}
          </div>
        ) : (
          <p className="no-resultados">No hay libros devueltos recientemente.</p>
        )}
      </div>
    );
  };
  
  export default LibrosDevueltos;