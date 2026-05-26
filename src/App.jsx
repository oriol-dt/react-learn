import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Cart from './views/Cart';
import ProductDetail from './views/ProductDetail';
import Checkout from './views/Checkout';

function App() {
  return (
      <CartProvider>
          <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/producto/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
          </Router>
      </CartProvider>
  );
}

export default App;