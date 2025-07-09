import React, { useState, useEffect } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { listOfCategories } from './CategoryService';
import { listProducts as listOfProducts } from '../Product/ProductService';

const CategoryProduct = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await listOfCategories();
        const raw = res?.data?.data?.categories || [];
        const formatted = raw.map((cat, i) => ({
          _id: cat._id || cat.id || i,
          name: cat.category_name || cat.name || `Category ${i + 1}`,
        }));
        setCategories(formatted);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = async (categoryId) => {
    setSelectedCategoryId(categoryId);

    const formData = {
      page: 1,
      pageSize: 100,
      sortKey: 'createdAt',
      sortValue: 'desc',
      search: '',
    };

    try {
      const res = await listOfProducts(formData);
      const allProducts = res.data.products || [];

      const filtered = allProducts.filter(
        (product) => String(product.categoryId) === String(categoryId)
      );

      setFilteredProducts(filtered);
    } catch (err) {
      console.error('Error loading products for category:', err);
    }
  };

  const getCategoryName = (id) => {
    return categories.find((cat) => String(cat._id) === String(id))?.name || 'Unknown';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Category-wise Products</h2>

      <CategoryDropdown
        value={selectedCategoryId}
        name="category"
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
              Category: {getCategoryName(prod.categoryId)}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryProduct;
