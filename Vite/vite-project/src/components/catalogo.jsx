import React,  { useState } from 'react'
import { useBiblioteca } from '../hooks/useBiblioteca';
import LibroItem from './LibroItem';  

const Catalogo = () => {
    const { catalogo, prestarLibro, devolverLibro, unirseColaEspera, colasEspera } = useBiblioteca();
    const [filtro, setFiltro] = useState('');
    const [categoriasVisibles, setCategoriasVisibles] = useState([]);
    const [notificacion, setNotificacion] = useState('');
  
    
    const categorias = [...new Set(catalogo.map(libro => libro.categoria))];
  
    
    const librosFiltrados = catalogo.filter(libro => {
      const cumpleFiltroTexto = libro.titulo.toLowerCase().includes(filtro.toLowerCase()) || libro.autor.toLowerCase().includes(filtro.toLowerCase());
      const cumpleFiltroCategoria = categoriasVisibles.length === 0 || categoriasVisibles.includes(libro.categoria);
      return cumpleFiltroTexto && cumpleFiltroCategoria;
    });
  
    const handlePrestar = (libroId) => {
      const mensaje = prestarLibro(libroId);
      mostrarNotificacion(mensaje);
    };

    const handleDevolver = (libroId) => {
      const mensaje = devolverLibro(libroId);
      mostrarNotificacion(mensaje);
    };

    const handleUnirseColaEspera = (libroId) => {
      const mensaje = unirseColaEspera(libroId);
      mostrarNotificacion(mensaje);
    };

    const mostrarNotificacion = (mensaje) => {
      setNotificacion(mensaje);
      setTimeout(() => {
        setNotificacion('');
      }, 3000);
    };

    const toggleCategoria = (categoria) => {
      if (categoriasVisibles.includes(categoria)) {
        setCategoriasVisibles(categoriasVisibles.filter(cat => cat !== categoria));
      } else {
        setCategoriasVisibles([...categoriasVisibles, categoria]);
      }
    };
  
    return (
      <div className="catalogo-container">
        <h2>Catálogo de Libros</h2>
        
        {notificacion && (
          <div className="notificacion">{notificacion}</div>
        )}
        
        <div className="filtros">
          <div className="busqueda">
            <input
              type="text"
              placeholder="Buscar por título o autor"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
          
          <div className="categorias-filtro">
            <span>Filtrar por categoría:</span>
            <div className="categoria-botones">
              {categorias.map(categoria => (
                <button
                  key={categoria}
                  className={categoriasVisibles.includes(categoria) ? 'active' : ''}
                  onClick={() => toggleCategoria(categoria)}
                >
                  {categoria}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="libros-grid">
          {librosFiltrados.length > 0 ? (
            librosFiltrados.map(libro => (
              <LibroItem
                key={libro.id}
                libro={libro}
                actions={
                  <>
                    {libro.disponible ? (
                      <button 
                        className="btn-prestar"
                        onClick={() => handlePrestar(libro.id)}
                      >
                        Prestar
                      </button>
                    ) : (
                      <>
                        <button 
                          className="btn-devolver"
                          onClick={() => handleDevolver(libro.id)}
                        >
                          Devolver
                        </button>
                        <button 
                          className="btn-cola"
                          onClick={() => handleUnirseColaEspera(libro.id)}
                        >
                          Unirse a cola de espera
                        </button>
                        {colasEspera[libro.id] && colasEspera[libro.id].length > 0 && (
                          <div className="cola-info">
                            <span>En cola: {colasEspera[libro.id].length}</span>
                          </div>
                        )}
                      </>
                    )}
                  </>
                }
              />
            ))
          ) : (
            <p className="no-resultados">No se encontraron libros con los filtros seleccionados.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Catalogo;