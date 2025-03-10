// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const auth = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(auth);

    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCart);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCartItems([]);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('cartItems');
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <GoogleOAuthProvider clientId="383330621967-ag5fian2mg84sqa0rkqtcpc8u0c54c4u.apps.googleusercontent.com">
      <Router>
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<ProductList handleAddToCart={handleAddToCart} />} />
              <Route path="/cart" element={<Cart cartItems={cartItems} handleRemoveFromCart={handleRemoveFromCart} />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <Route
              path="*"
              element={
                <div className="login-container">
                  <div className="login-card">
                    <h2>Welcome! Please sign in to continue</h2>
                    <div className="google-login-wrapper">
                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={() => console.log('Login Failed')}
                      />
                    </div>
                  </div>
                </div>

              }
            />
          )}
        </Routes>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
