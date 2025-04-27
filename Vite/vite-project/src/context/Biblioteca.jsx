import React, { createContext, useState } from 'react';
import { librosIniciales } from '../data/Libros'; 

export const BibliotecaContext = createContext();

export const BibliotecaProvider = ({ children }) => {

    const [catalogo, setCatalogo] = useState(librosIniciales);
    
    const [librosDevueltos, setLibrosDevueltos] = useState([]); // Cambiado de pilaDevueltos a librosDevueltos
    
    const [colasEspera, setColasEspera] = useState({});
    
    const [usuarioActual, setUsuarioActual] = useState("Usuario1");
  
    const prestarLibro = (libroId) => {
      if (colasEspera[libroId] && colasEspera[libroId].length > 0) {
        const usuarioEnCola = colasEspera[libroId][0];
        const nuevaCola = { ...colasEspera };
        nuevaCola[libroId] = colasEspera[libroId].slice(1);
        setColasEspera(nuevaCola);
        
        setCatalogo(catalogo.map(libro => 
          libro.id === libroId 
            ? { ...libro, disponible: false, usuario: usuarioEnCola } 
            : libro
        ));
        
        return `Libro prestado a ${usuarioEnCola} que estaba en lista de espera`;
      } else {
        setCatalogo(catalogo.map(libro => 
          libro.id === libroId 
            ? { ...libro, disponible: false, usuario: usuarioActual } 
            : libro
        ));
        
        return `Libro prestado a ${usuarioActual}`;
      }
    };
  
    const devolverLibro = (libroId) => {
      const libro = catalogo.find(libro => libro.id === libroId);
      
      if (libro && !libro.disponible) {
        setLibrosDevueltos([{ ...libro, fechaDevolucion: new Date() }, ...librosDevueltos]); // Actualizado
        
        setCatalogo(catalogo.map(item => 
          item.id === libroId 
            ? { ...item, disponible: true, usuario: null } 
            : item
        ));
        
        if (colasEspera[libroId] && colasEspera[libroId].length > 0) {
          prestarLibro(libroId);
        }
        
        return "Libro devuelto correctamente";
      }
      
      return "Error: El libro no está prestado";
    };
  
    const unirseColaEspera = (libroId, nombreUsuario = usuarioActual) => {
      setColasEspera(prevColas => {
        const nuevaCola = { ...prevColas };
        
        if (!nuevaCola[libroId]) {
          nuevaCola[libroId] = [];
        }
        
        if (!nuevaCola[libroId].includes(nombreUsuario)) {
          nuevaCola[libroId] = [...nuevaCola[libroId], nombreUsuario];
        }
        
        return nuevaCola;
      });
      
      return `${nombreUsuario} añadido a la cola de espera`;
    };
  
    const rehacerDevolucion = (index) => {
      const libroDevuelto = librosDevueltos[index]; // Actualizado
      const nuevaPila = librosDevueltos.filter((_, i) => i !== index); // Actualizado
      setLibrosDevueltos(nuevaPila); // Actualizado
      
      if (!catalogo.some(libro => libro.id === libroDevuelto.id)) {
        setCatalogo([...catalogo, { ...libroDevuelto, disponible: true, usuario: null }]);
      } else {
        setCatalogo(catalogo.map(libro => 
          libro.id === libroDevuelto.id 
            ? { ...libro, disponible: true, usuario: null } 
            : libro
        ));
      }
      
      return "Devolución deshecha correctamente";
    };
  
    const cambiarUsuario = (nuevoUsuario) => {
      setUsuarioActual(nuevoUsuario);
    };
  
    return (
      <BibliotecaContext.Provider 
        value={{ 
          catalogo, 
          librosDevueltos, // Actualizado
          colasEspera, 
          usuarioActual,
          prestarLibro, 
          devolverLibro, 
          unirseColaEspera, 
          rehacerDevolucion,
          cambiarUsuario
        }}
      >
        {children}
      </BibliotecaContext.Provider>
    );
  };