import React, { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { listOfProducts } from './CategoryService'; 

const CategoryProduct = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    try {
      const res = await listOfProducts();
      const allProducts = res.data.products || [];

      const filtered = allProducts.filter(
        (product) => product.categoryId == categoryId
      );
      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Error loading products for category:', err);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Category-wise Products</h2>

      <CategoryDropdown
        label="Choose a category"
        onSelect={handleCategorySelect}
      />

      <hr />

      <h3>Products in Selected Category</h3>
      {filteredProducts.length === 0 ? (
        selectedCategoryId ? <p>No products found.</p> : <p>Please select a category.</p>
      ) : (
        <ul>
          {filteredProducts.map((prod) => (
            <li key={prod.id}>
              <strong>{prod.name}</strong><br />
              Description: {prod.description}<br />
              Price: ₹{prod.price}<br />
              Category ID: {prod.categoryId}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryProduct;
