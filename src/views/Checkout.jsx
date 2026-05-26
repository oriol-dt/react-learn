import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.address) {
            setIsSubmitted(true);
            clearCart();
        } else {
            alert('Por favor, rellena todos los campos');
        }
    };

    if (isSubmitted) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>🎉 ¡Gracias por tu compra, {formData.name}!</h2>
                <p>Hemos enviado la confirmación a {formData.email}.</p>
                <button 
                    onClick={() => navigate('/')}
                    style={{ backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '20px' }}
                >
                    Volver a la tienda
                </button>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '50px' }}>
                <h2>El carrito está vacío</h2>
                <button onClick={() => navigate('/')}>Ir a la tienda</button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '40px 20px' }}>
            <h2>Finalizar Compra</h2>
            <p style={{ marginBottom: '20px' }}>Total a pagar: <strong>{totalPrice.toFixed(2)} €</strong></p>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Nombre completo:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Correo electrónico:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Dirección de envío:</label>
                    <textarea 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
                        required
                    />
                </div>
                <button 
                    type="submit"
                    style={{ backgroundColor: '#27ae60', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginTop: '10px' }}
                >
                    Confirmar Pedido
                </button>
            </form>
        </div>
    );
}

export default Checkout;