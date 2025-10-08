import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="/Pulse"> 
      <div className="App">
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
