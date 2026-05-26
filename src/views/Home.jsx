import React, { useState } from "react";
import ProductCard from '../components/ProductCard.jsx';
import productsData from '../data/products.json';

function Home() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px'
    };

    const searchInputStyle = {
        padding: '10px',
        width: '300px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '20px',
        fontSize: '16px'
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🏪 Catálogo de productos</h2>

            <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={searchInputStyle}
            />

            <div style={gridStyle}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>No se encontraron productos que coincidan con su búsqueda.</p>
                )}
            </div>
        </div>
    );
}

export default Home;