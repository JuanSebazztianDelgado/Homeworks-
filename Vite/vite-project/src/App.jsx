import React from 'react';
import Header from './Header';
import SongPlayer from './songDoubleLinkedList.jsx';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <SongPlayer />
    </div>
  );
}

export default App;