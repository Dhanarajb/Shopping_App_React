// ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ handleAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [filterOption, setFilterOption] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    // Handle Sorting
    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortOption(sortValue);

        let sortedProducts = [...filteredProducts];
        if (sortValue === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === 'name-desc') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
        setFilteredProducts(sortedProducts);
    };

    // Handle Filtering
    const handleFilterChange = (e) => {
        const filterValue = e.target.value;
        setFilterOption(filterValue);

        if (filterValue) {
            setFilteredProducts(products.filter(product => product.category === filterValue));
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <div className="product-list-container">
            <h2 className="product-list-title">Product List</h2>

            <div className="controls">
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="">Sort By</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                    <option value="name-desc">Name: Z-A</option>
                </select>

                <select value={filterOption} onChange={handleFilterChange}>
                    <option value="">Filter By Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelry</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>

            <div className="product-list">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} handleAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
