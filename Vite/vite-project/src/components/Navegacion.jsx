import React,  { useState } from 'react'
import { useBiblioteca } from '../hooks/useBiblioteca'

const Navigation = () => {
    const { usuarioActual, cambiarUsuario } = useBiblioteca();
    const [nuevoUsuario, setNuevoUsuario] = useState('');
  
    const handleCambiarUsuario = (e) => {
      e.preventDefault();
      if (nuevoUsuario.trim()) {
        cambiarUsuario(nuevoUsuario);
        setNuevoUsuario('');
      }
    };
  
    return (
      <nav className="navbar">
        <h1>Biblioteca Virtual Interactiva</h1>
        <div className="usuario-info">
          <span>Usuario actual: <strong>{usuarioActual}</strong></span>
          <form onSubmit={handleCambiarUsuario} className="cambiar-usuario-form">
            <input
              type="text"
              value={nuevoUsuario}
              onChange={(e) => setNuevoUsuario(e.target.value)}
              placeholder="Nuevo usuario"
            />
            <button type="submit">Cambiar Usuario</button>
          </form>
        </div>
      </nav>
    );
  };
  
  export default Navigation;