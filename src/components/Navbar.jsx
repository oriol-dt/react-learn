import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

function Navbar() {
    const { totalItems } = useCart();
    const navStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff',
        gap: '10px'
    };

    const linkStyle = {
        color: '#fff',
        margin: '5px 10px',
        textDecoration: 'none',
        fontWeight: 'bold'
    };

    const logoStyle = {
        ...linkStyle,
        margin: '0',
        fontSize: '1.2rem'
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}><h1>⚡ RetroShop</h1></Link>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/" style={linkStyle}>Tienda</Link>
                <Link to="/carrito" style={linkStyle}>Carrito 🛒 {totalItems > 0 && <span>({totalItems})</span>}</Link>
            </div>
        </nav>
    )
}

export default Navbar;