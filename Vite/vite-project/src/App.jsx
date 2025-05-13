import React from "react";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <h1>Welcome to the N-ary Tree Menu</h1>
        <p>Select a menu item to navigate.</p>
      </div>
    </div>
  );
}

export default App;