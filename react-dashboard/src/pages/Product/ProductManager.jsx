// src/pages/Product/ProductManager.jsx
import React, { useEffect, useState } from 'react';
import { listOfCategories } from '../Category/CategoryService';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  listProducts
} from './ProductService';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await listProducts();
      console.log(" listProducts raw response:", res.data);
      if (Array.isArray(res.data.data) && res.data.data.length > 0) {
        setProducts(res.data.data);
      } else {
        console.warn('Empty product list, skipping overwrite');
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };


  const fetchCategories = async () => {
    try {
      const res = await listOfCategories();
      console.log(" listOfCategories full response:", res.data);
      const rawCategories = res?.data?.categories || [];
      console.log(" Raw categories:", rawCategories);

      const formatted = rawCategories.map((cat, i) => ({
        _id: cat._id || cat.id || i,
        name: cat.category_name || `Category ${i + 1}`,
      }));


      console.log(" Mapped categories for dropdown:", formatted);

      setCategories(formatted);
    } catch (err) {
      console.error('Failed to fetch categories from listOfCategories:', err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId !== null) {
    // 🛠 Update existing product in local list
    setProducts(prev =>
      prev.map(prod =>
        prod._id === editId ? { ...prod, ...formData } : prod
      )
    );
  } else {
    
    setProducts(prev => [
      ...prev,
      { ...formData, _id: Date.now() }
    ]);
  }

  setFormData({ name: '', price: '', category: '' });
  setEditId(null);
};

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, category: product.category });
    setEditId(product._id);
  };

  const handleDelete = (id) => {
  setProducts(prev => prev.filter(p => p._id !== id));
};


  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product Manager</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        {/* <pre>{JSON.stringify(categories, null, 2)}</pre>
<pre>{JSON.stringify(products, null, 2)}</pre> */}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => {
            // console.log(" Rendering category:", cat);
            return (
              <option key={cat._id || index} value={cat._id}>
                {cat.name}
              </option>
            );
          })}
        </select>

        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
      </form>

      <ul>
        {products.map((prod) => {
          const category = categories.find(
            (cat) => String(cat._id) === String(prod.category)
          );
          const catName =
            categories.find((c) => String(c._id) === String(prod.category))?.name || 'Unknown';


          return (

            <li key={prod._id}>
              {prod.name} - ₹{prod.price} (Category: {catName})
              <button onClick={() => handleEdit(prod)}>Edit</button>
              <button onClick={() => handleDelete(prod._id)}>Delete</button>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default ProductManager;