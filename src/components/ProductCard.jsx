import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart, getProductStockAvailable } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const availableStock = getProductStockAvailable(product);
    const isOutOfStock = availableStock <= 0;

    const cardStyle = {
        border: '2px solid #444',
        borderRadius: '12px',
        padding: '15px',
        margin: '10px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        boxShadow: isHovered
            ? '0 10px 20px rgba(255, 255, 255, 0.15), 0 0 12px rgba(0, 112, 243, 0.2)'
            : '0 4px 10px rgba(0, 0, 0, 0.3)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.2s ease-in-out',
        opacity: isOutOfStock ? 0.6 : 1
    };

    const imageContainerStyle = {
        width: '100%',
        height: '160px',
        backgroundColor: '#1a1a1a',
        borderRadius: '6px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px',
        boxSizing: 'border-box'
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '4px'
    };

    const descriptionStyle = {
        fontSize: '14px',
        color: '#444',
        minHeight: '65px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: '10px 0',
        padding: '0 5px'
    };

    const buttonStyle = {
        backgroundColor: isOutOfStock
            ? '#ccc'
            : (isHovered ? '#0051bb' : '#0070f3'),
        color: isOutOfStock ? '#666' : '#fff',
        border: 'none',
        padding: '10px 12px',
        borderRadius: '6px',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        marginTop: '10px',
        fontWeight: 'bold',
        boxShadow: isHovered && !isOutOfStock ? '0 4px 12px rgba(0, 112, 243, 0.3)' : 'none',
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease'
    };

    return (
        <div
            style={cardStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={imageContainerStyle}>
                <img src={product.image} alt={product.name} style={imageStyle} />
            </div>

            <h3 style={{ color: '#111', marginTop: '15px', fontSize: '18px' }}>{product.name}</h3>

            <p style={descriptionStyle}>{product.description}</p>

            <div style={{ margin: '5px 0', fontSize: '14px' }}>
                {isOutOfStock ? (
                    <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>Agotado</span>
                ) : (
                    <span style={{ color: '#27ae60', fontWeight: 'bold' }}>Disponibles: {availableStock} unidades</span>
                )}
            </div>

            <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#111', margin: '5px 0' }}>
        {product.price.toFixed(2).replace('.', ',')} €
      </span>

            <button
                style={buttonStyle}
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
            >
                {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
            </button>
        </div>
    );
}

export default ProductCard;