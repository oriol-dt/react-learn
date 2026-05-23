import React from "react";
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard.jsx';

function Home() {
    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px'
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🏪 Catálogo de productos</h2>

            <div style={gridStyle}>
                {productsData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;