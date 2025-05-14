import React from 'react';
import { GraphProvider } from './context/GraphContext';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import CityList from './components/CityList';
import GraphDisplay from './components/GraphDisplay';

function App() {
  return (
    <GraphProvider>
      <div className="App">
        <Header />
        <PersonForm />
        <CityList />
        <GraphDisplay />
      </div>
    </GraphProvider>
  );
}

export default App;