import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Spinner } from 'reactstrap';
import axios from 'axios';

const CategoryDropdown = ({ onSelect, label = 'Select Category' }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        'https://e-commerce-gg46.onrender.com/api/category/categoryDropdown'
      );
      setCategories(res.data?.data || []);
    } catch (err) {
      console.error('Error fetching dropdown categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedCategory = categories.find((cat) => cat.id === selectedId);

    if (selectedCategory) {
      setSelectedDescription(selectedCategory.description || '');
      onSelect && onSelect(selectedId);
    }
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      {loading ? (
        <Spinner size="sm" color="primary" />
      ) : (
        <>
          <Input type="select" onChange={handleChange} defaultValue="">
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, idx) => (
              <option key={cat.id || idx} value={cat.id}>
                {cat.category_name?.trim() || 'Unnamed'}
              </option>
            ))}
          </Input>

          {selectedDescription && (
            <p style={{ marginTop: '0.5rem', color: 'gray' }}>
              <strong>Description:</strong> {selectedDescription}
            </p>
          )}
        </>
      )}
    </FormGroup>
  );
};

export default CategoryDropdown;
