
import React from "react";
import "./App.css"; 
import HomePage from "./Components/Layouts/HomePage";
import CanteenMenuBar from "./Components/Layouts/CanteenMenuBar";
import Login from "./Components/Layouts/Login";
import Billing from "./Components/Layouts/Billing";
import Order from "./Components/Layouts/Order";


function App() {
  return (
    <div className="App">
      <HomePage />
       <CanteenMenuBar />
       <Login/>
       <Billing/>
       <Order/>
      
    </div>
  );
}

export default App;