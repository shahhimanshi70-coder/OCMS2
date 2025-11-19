
// App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CanteenMenuBar from "./pages/CanteenMenuBar";
import HomePage from "./pages/HomePage.jsx";


function App() {
  return (
    <BrowserRouter>
      <CanteenNavbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CanteenMenuBar" element={<CanteenMenuBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

