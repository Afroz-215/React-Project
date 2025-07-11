import React, { useEffect, useState } from 'react';
import {
  addCategory,
  updateCategory,
  deleteCategory,
  listOfCategories,
} from './CategoryService';

import CategoryDropdown from './CategoryDropdown';
import {
  LABEL_CATEGORY_FORM,
  LABEL_CATEGORY_LIST,
  LABEL_CATEGORY_FORM_TITLE_ADD,
  LABEL_CATEGORY_FORM_TITLE_EDIT,
  LABEL_CATEGORY_PREVIEW,
} from '../../utils/message';

const initialForm = { name: '', description: '' };

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await listOfCategories();
      // API shape: res -> { statusCode, data: { categories: [...] } }
      setCategories(res.data?.categories || res.data || []);
    } catch (err) {
      console.error('Error loading categories', err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateCategory(editId, formData);
      } else {
        await addCategory(formData);
      }
      resetForm();
      fetchCategories();
    } catch (err) {
      console.error('Error submitting category', err);
    }
  };

  const handleEdit = (id) => {
    const c = categories.find((cat) => (cat._id || cat.id) === id);
    if (c) {
      setFormData({
        name: c.name || c.category_name || '',
        description: c.description || '',
      });
      setEditId(id);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category', err);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData(initialForm);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{editId ? LABEL_CATEGORY_FORM_TITLE_EDIT : LABEL_CATEGORY_FORM_TITLE_ADD}</h2>

      {/* Category form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder={LABEL_CATEGORY_FORM}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Description (optional)"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <br />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
        {editId && (
          <button type="button" onClick={resetForm} style={{ marginLeft: '0.5rem' }}>
            Cancel
          </button>
        )}
      </form>

      <h3>{LABEL_CATEGORY_LIST}</h3>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat._id || cat.id}>
              <strong>{cat.name || cat.category_name}</strong>{' '}
              {cat.description && <em>— {cat.description}</em>}
              {' '}
              <button onClick={() => handleEdit(cat._id || cat.id)}>Edit</button>{' '}
              <button onClick={() => handleDelete(cat._id || cat.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <hr />
      <h4>{LABEL_CATEGORY_PREVIEW}</h4>
      <CategoryDropdown onSelect={(id) => console.log('Selected ID:', id)} />
    </div>
  );
};

export default CategoryManager;
