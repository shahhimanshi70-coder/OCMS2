import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import CanteenHome from './CanteenHome';
import Menu from './Menu'; 
import Order from './Order'; 
import Contact from './Contact';
import AdminUpload from './AdminUpload';
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
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/Navbar" element={<Navbar/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
