import React, { useContext } from 'react';
import { GraphContext } from '../context/GraphContext';

function CityList() {
  const { graph } = useContext(GraphContext);

  return (
    <div className="city-list">
      <h2>Ciudades y sus habitantes</h2>
      {graph.cities.map((city, index) => (
        <div key={index}>
          <h3>{city.name}</h3>
          <ul>
            {graph.people
              .filter((person) => person.city === city.name)
              .map((person, idx) => (
                <li key={idx}>
                  {person.name} ({person.age} años)
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default CityList;