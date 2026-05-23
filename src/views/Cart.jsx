import React from "react";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart, totalPrice } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    };

    const containerStyle = {
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto'
    };

    const itemStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ccc',
        padding: '10px 0'
    };

    const quantityControlsStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '5px 0'
    };

    const buttonQtyStyle = {
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '2px 8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    };

    const buttonDeleteStyle = {
        backgroundColor: '#ff4d4f',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    const buttonClearStyle = {
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
        fontWeight: 'bold'
    };

    if (cart.length === 0) {
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <h2>🛒 Tu carrito de la compra</h2>
                <p style={{ marginBottom: '20px' }}>Tu carrito está vacío. ¡Ve a la tienda a buscar algo interesante!</p>
                <button 
                    onClick={() => navigate('/')}
                    style={{
                        ...buttonClearStyle,
                        marginTop: 0,
                        backgroundColor: '#0070f3'
                    }}
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h2>🛒 Tu carrito de la compra</h2>
            <div>
                {cart.map((item) => {
                    const isMaxStockReached = item.quantity >= item.stock;

                    return (
                        <div key={item.id} style={itemStyle}>
                            <div>
                                <h4>{item.name}</h4>
                                <p style={{ fontSize: '14px', color: '#666' }}>{formatPrice(item.price)} c/u</p>
                                <div style={quantityControlsStyle}>
                                    <button
                                        style={buttonQtyStyle}
                                        onClick={() => decreaseQuantity(item.id)}
                                    >
                                        -
                                    </button>
                                    <span style={{ fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button
                                        style={{
                                            ...buttonQtyStyle,
                                            backgroundColor: isMaxStockReached ? '#e0e0e0' : '#f0f0f0',
                                            cursor: isMaxStockReached ? 'not-allowed' : 'pointer',
                                            color: isMaxStockReached ? '#aaa': '#000'
                                        }}
                                        onClick={() => addToCart(item)}
                                        disabled={isMaxStockReached}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                style={buttonDeleteStyle}
                                onClick={() => removeFromCart(item.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <h3>Total: {formatPrice(totalPrice)}</h3>
                <button style={buttonClearStyle} onClick={clearCart}>
                    Vaciar carrito
                </button>
            </div>
        </div>
    );
}

export default Cart;