import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Payment from './pages/Payment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/"        element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;