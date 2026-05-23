import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart ] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            const currentQuantity = existingItem ? existingItem.quantity : 0;

            if (currentQuantity >= product.stock) {
                return prevCart;
            }

            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }

            return [...prevCart, { ...product, quantity: 1}];
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === productId);

            if (existingItem.quantity === 1) {
                return prevCart.filter((item) => item.id !== productId);
            }

            return prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            );
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const getProductStockAvailable = (product) =>  {
        const cartItem = cart.find((item) => item.id === product.id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;
        return product.stock - quantityInCart;
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, totalItems, totalPrice, getProductStockAvailable }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}