import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;