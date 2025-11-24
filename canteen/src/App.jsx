import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'; 
import CanteenHome from './Components/Layouts/CanteenHome';
import Menu from './Components/Layouts/Menu'; 
import Order from './Components/Layouts/Order'; 
import Contact from './Components/Layouts/Contact';
import './App.css'; 
import Login from './Components/Layouts/Login';
import AdminUpload from './Components/Layouts/AdminUpload';


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
          <Route path="/login" element={<Login />} />
          <Route path="/admin/upload" element={<AdminUpload />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
