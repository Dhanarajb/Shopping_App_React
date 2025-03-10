// ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, handleAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
