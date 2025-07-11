import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { listProducts } from './ProductService';
import { validationMessage } from "../../utils/message";


const LOCAL_KEY = 'local_products';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: '', price: '', category: '' });
  const [editId, setEditId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await listProducts();
      const backendProducts = Array.isArray(res.data.data) ? res.data.data : [];
      const localData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

      const merged = [...backendProducts];
      localData.forEach((localProd) => {
        const index = merged.findIndex((p) => String(p._id) === String(localProd._id));
        if (index !== -1) {
          merged[index] = localProd;
        } else {
          merged.push(localProd);
        }
      });

      setProducts(merged);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.post('/category/listOfCategories');
      const raw = res?.data?.data?.categories || [];

      const formatted = raw.map((cat, i) => ({
        _id: cat._id || cat.id || i,
        name: cat.name || cat.category_name || `Category ${i + 1}`,
      }));

      setCategories(formatted);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

    if (editId) {
      const updated = localData.map((p) =>
        String(p._id) === String(editId) ? { ...formData, _id: editId } : p
      );
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    } else {
      const newProduct = { ...formData, _id: Date.now().toString() };
      localData.push(newProduct);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(localData));
    }

    setFormData({ name: '', price: '', category: '' });
    setEditId(null);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setFormData({ name: product.name, price: product.price, category: product.category });
    setEditId(product._id);
  };

  const handleDelete = (id) => {
    const localData = JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];
    const filtered = localData.filter((p) => String(p._id) !== String(id));
    localStorage.setItem(LOCAL_KEY, JSON.stringify(filtered));
    fetchProducts();
  };

  const viewDetails = (product) => {
    setSelectedProduct(product);
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
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">{validationMessage('Category')}</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">{editId ? 'Update' : 'Add'} Product</button>
      </form>

      <ul>
        {products.map((prod) => {
          const catName =
            categories.find((c) => String(c._id) === String(prod.category))?.name || 'Unknown';

          return (
            <li key={prod._id}>
              {prod.name} - ₹{prod.price} (Category: {catName})
              <button onClick={() => handleEdit(prod)}>Edit</button>
              <button onClick={() => handleDelete(prod._id)}>Delete</button>
              <button onClick={() => viewDetails(prod)}>View</button>
            </li>
          );
        })}
      </ul>

      {selectedProduct && (
        <div style={{ marginTop: '1rem', border: '1px solid gray', padding: '1rem' }}>
          <h4>Product Details</h4>
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
          <p>
            <strong>Category:</strong>{' '}
            {categories.find((c) => String(c._id) === String(selectedProduct.category))?.name ||
              'Unknown'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
