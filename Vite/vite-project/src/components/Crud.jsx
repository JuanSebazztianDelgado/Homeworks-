import React, { useState, useEffect } from 'react';
import useCollection from '../hooks/useCollection';

export const Crud = () => {
  const [userName, setUserName] = useState('');
  const { add, getAll, update, remove, isPending, results } = useCollection('users');

  const getAllDocs = async () => {
    try {
      await getAll([]);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  const save = async () => {
    if (!userName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    try {
      await add({ name: userName });
      setUserName('');
      await getAllDocs();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  const handleUpdate = async (id) => {
    const newName = prompt('Ingresa el nuevo nombre:');
    if (!newName || !newName.trim()) {
      alert('El nombre no puede estar vacío');
      return;
    }

    try {
      await update(id, { name: newName });
      await getAllDocs();
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmDelete) return;

    try {
      await remove(id);
      await getAllDocs();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const handleSetUserName = (event) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    getAllDocs();
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <input
        type="text"
        onChange={handleSetUserName}
        value={userName}
        placeholder="Ingresa un nombre"
      />
      <button type="button" onClick={save} disabled={isPending}>
        {isPending ? 'Guardando...' : 'Guardar'}
      </button>

      {isPending && <p>Cargando...</p>}

      {results.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              {item.name}{' '}
              <button onClick={() => handleUpdate(item.id)}>Actualizar</button>
              <button onClick={() => handleDelete(item.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};