import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Cart from './views/Cart';

function App() {
  return (
      <CartProvider>
          <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Cart />} />
              </Routes>
          </Router>
      </CartProvider>
  );
}

export default App;