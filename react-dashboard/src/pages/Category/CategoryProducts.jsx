import React, { useState } from 'react';
import CategoryDropdown from './CategoryDropdown';
import { listProducts } from '../Product/ProductService';
import {
  LABEL_CATEGORY_PRODUCTS_PAGE,
  LABEL_PRODUCTS_IN_SELECTED_CATEGORY,
  MSG_NO_PRODUCTS_FOUND,
  MSG_SELECT_CATEGORY_FIRST
} from '../../utils/message';

const CategoryProduct = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});

  const handleCategorySelect = async (categoryId) => {
    if (!categoryId) {
      console.warn("No category selected.");
      return;
    }

    setSelectedCategoryId(categoryId); 

    const payload = {
      page: 1,
      pageSize: 10,
      sortKey: '',
      sortValue: '',
      search: '',
      category_id: categoryId,
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2));
  console.log('category_id type:', typeof payload.category_id, payload.category_id);


    try {
    const res = await listProducts(payload);
    console.log('Products fetched:', res.data?.data);
    setFilteredProducts(res.data?.data || []);
  } catch (err) {
    console.error('Error loading products for category:', err);

    if (err?.response) {
      console.error('Server responded with:', err.response.status, err.response.data);
      alert(`Server error: ${err.response.status}\n${JSON.stringify(err.response.data, null, 2)}`);
    } else {
      alert("Unknown error occurred. Check console.");
    }
  }
};

  const handleCategoryLoad = (categories) => {
    const map = {};
    categories.forEach((cat) => {
      map[cat.id] = cat.name;
    });
    setCategoriesMap(map);
  };

  const getCategoryName = (id) => {
    return categoriesMap[id] || 'Unknown';
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{LABEL_CATEGORY_PRODUCTS_PAGE}</h2>

      <CategoryDropdown
        value={selectedCategoryId}
        name="category"
        onSelect={handleCategorySelect}
        onLoad={handleCategoryLoad}
      />

      <hr />

      <h3>{LABEL_PRODUCTS_IN_SELECTED_CATEGORY}</h3>
      {filteredProducts.length === 0 ? (
        selectedCategoryId ? <p>{MSG_NO_PRODUCTS_FOUND}</p> : <p>{MSG_SELECT_CATEGORY_FIRST}</p>
      ) : (
        <ul>
          {filteredProducts.map((prod) => (
            <li key={prod._id || prod.id}>
              <strong>{prod.product_title_name || prod.name}</strong><br />
              Description: {prod.description}<br />
              Price: ₹{prod.price}<br />
              Category: {getCategoryName(prod.category_id || prod.categoryId)}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryProduct;
