// SortFilter.js
import React, { useState } from 'react';
import './SortFilter.css';

const SortFilter = ({ products, setSortedProducts }) => {
    const [sortOption, setSortOption] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortOption(sortValue);

        let sortedProducts = [...products];
        if (sortValue === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortValue === 'name-desc') {
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        }
        setSortedProducts(sortedProducts);
    };

    const handleFilterChange = (e) => {
        const category = e.target.value;
        setFilterCategory(category);

        const filteredProducts = category
            ? products.filter((product) => product.category === category)
            : products;

        setSortedProducts(filteredProducts);
    };

    const categories = [...new Set(products.map((product) => product.category))];

    return (
        <div className="sort-filter">
            <div>
                <label>Sort by:</label>
                <select value={sortOption} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                </select>
            </div>

            <div>
                <label>Filter by Category:</label>
                <select value={filterCategory} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SortFilter;
