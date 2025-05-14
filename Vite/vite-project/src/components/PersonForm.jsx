import React, { useState, useContext } from 'react';
import { GraphContext } from '../context/GraphContext';

function PersonForm() {
  const { addPerson, graph } = useContext(GraphContext);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && age && city) {
      addPerson(name, age, city);
      setName('');
      setAge('');
      setCity('');
    }
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Edad"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option value="">Selecciona una ciudad</option>
        {graph.cities.map((c, index) => (
          <option key={index} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <button type="submit">Agregar Persona</button>
    </form>
  );
}

export default PersonForm;