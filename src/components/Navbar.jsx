import React from "react";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

function Navbar() {
    const { totalItems } = useCart();
    const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#222',
        color: '#fff'
    };

    const linkStyle = {
        color: '#fff',
        marginLeft: '15px',
        textDecoration: 'none',
        fontWeight: 'bold'
    };

    return (
        <nav style={navStyle}>
            <h1>⚡ RetroShop</h1>
            <div>
                <Link to="/" style={linkStyle}>Tienda</Link>
                <Link to="/carrito" style={linkStyle}>Carrito 🛒 {totalItems > 0 && <span>({totalItems})</span>}</Link>
            </div>
        </nav>
    )
}

export default Navbar;