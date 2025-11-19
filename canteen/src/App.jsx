import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; 
import CanteenHome from './Components/Layouts/CanteenHome';
import Menu from './Components/Layouts/Menu'; 
import Order from './Components/Layouts/Order'; 
import Contact from './Components/Layouts/Contact';
import './App.css'; 

const App = () => {
  return (
    <Router>
      
      <Navbar />

      <div className="content">
        <Routes>
        
          <Route path="/" element={<CanteenHome />} /> 
          <Route path="/menu" element={<Menu />} />  
          <Route path="/order" element={<Order />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/navbar" element={<Navbar/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
