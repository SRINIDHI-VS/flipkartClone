import React, { useState, useEffect } from 'react';
import axios from 'axios';
function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    color: '',
    priceRange: '',
    type: '',
  });
  useEffect(() => {
    axios(' https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json').then((data)=>setProducts(data.data));
  }, []);
  // function fetchProducts() {
  //   return new Promise((resolve) => {
  //     const products = [
  //       {
  //         id: 1,
  //         name: 'Green Polo',
  //         price: 29.99,
  //         color: 'Green',
  //         gender: 'Male',
  //         type: 'Polo',
  //         quantity: 5,
  //       },
  //     ];
  //     resolve(products);
  //   });
  // }
  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }
  function handleFilterChange(filterName, value) {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  }
  function filterAndSearchProducts() {
    let filteredProducts = [...products];
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.gender) {
      filteredProducts = filteredProducts.filter(
        (product) => product.gender === filters.gender
      );
    }
    if (filters.color) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color === filters.color
      );
    }
    if (filters.priceRange) {
    }
    if (filters.type) {
      filteredProducts = filteredProducts.filter(
        (product) => product.type === filters.type
      );
    }

    return filteredProducts;
  }
  function handleAddToCart(product) {
    if (product.quantity > 0) {
      const updatedProducts = products.map((p) => {
        if (p.id === product.id) {
          return { ...p, quantity: p.quantity - 1 };
        }
        return p;
      });
      setProducts(updatedProducts);
    } else {
      alert('Out of stock!');
    }
  }

  const filteredProducts = filterAndSearchProducts();

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search..."
      />
      <div>
        <select
          value={filters.gender}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          value={filters.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
        >
          <option value="">All Colors</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
        </select>
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Polo">Polo</option>
          <option value="V-neck">V-neck</option>
        </select>
      </div>
      {filteredProducts.map((product) => (
        <div key={product.id}>
          <img src={product.imageURL} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Color: {product.color}</p>
          <p>Gender: {product.gender}</p>
          <p>Quantity: {product.quantity}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductListingPage;