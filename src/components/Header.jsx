// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, handleLogout }) => {
    return (
        <header className="header">
            <h1>
                <Link to="/" className="header-logo">Shopping App</Link>
            </h1>
            <nav>
                {isLoggedIn && (
                    <div className='nav-links'>
                        <Link to="/">Home</Link>
                        <Link to="/cart">Cart</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
