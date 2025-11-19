import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/Layouts/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
