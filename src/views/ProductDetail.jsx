import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getProductStockAvailable } = useCart();
    
    const product = productsData.find(p => p.id === parseInt(id));

    if (!product) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3>Producto no encontrado</h3>
            <button onClick={() => navigate('/')}>Volver al catálogo</button>
        </div>
    );

    const availableStock = getProductStockAvailable(product);
    const isOutOfStock = availableStock <= 0;

    const containerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        padding: '20px',
        maxWidth: '1000px',
        margin: '0 auto',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const imageStyle = {
        maxWidth: '400px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'block'
    };

    const infoStyle = {
        flex: 1,
        minWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    };

    const titleStyle = {
        fontSize: '2rem',
        lineHeight: '1.4',
        margin: '15px 0'
    };

    const descriptionStyle = {
        fontSize: '18px',
        color: '#555',
        lineHeight: '1.6',
        marginBottom: '25px',
        maxWidth: '600px'
    };

    const priceStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '10px 0'
    };

    const buttonStyle = {
        backgroundColor: isOutOfStock ? '#ccc' : '#0070f3',
        color: '#fff',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: isOutOfStock ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '20px'
    };

    return (
        <div style={containerStyle}>
            <img src={product.image} alt={product.name} style={imageStyle} />
            <div style={infoStyle}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer', marginBottom: '15px', padding: 0 }}
                >
                    &larr; Volver
                </button>
                <h1 style={titleStyle}>{product.name}</h1>
                <p style={descriptionStyle}>{product.description}</p>
                <p style={priceStyle}>{product.price.toFixed(2)} €</p>
                
                <div style={{ margin: '15px 0' }}>
                    {isOutOfStock ? (
                        <span style={{ color: 'red', fontWeight: 'bold' }}>Agotado</span>
                    ) : (
                        <span style={{ color: 'green' }}>Stock disponible: {availableStock}</span>
                    )}
                </div>

                <button 
                    style={buttonStyle}
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock}
                >
                    {isOutOfStock ? 'Sin stock' : 'Añadir al carrito'}
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;