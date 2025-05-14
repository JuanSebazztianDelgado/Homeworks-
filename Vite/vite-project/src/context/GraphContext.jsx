import React, { createContext, useState } from 'react';

export const GraphContext = createContext();

export const GraphProvider = ({ children }) => {
  const [graph, setGraph] = useState({
    cities: [],
    people: [],
  });

  const addCity = (cityName) => {
    setGraph((prev) => ({
      ...prev,
      cities: [...prev.cities, { name: cityName }],
    }));
  };

  const addPerson = (name, age, city) => {
    setGraph((prev) => ({
      ...prev,
      people: [...prev.people, { name, age, city }],
    }));
  };

  return (
    <GraphContext.Provider value={{ graph, addCity, addPerson }}>
      {children}
    </GraphContext.Provider>
  );
};