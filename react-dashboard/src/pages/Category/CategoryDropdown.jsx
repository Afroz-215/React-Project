import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Spinner } from 'reactstrap';
import { categoryDropdown } from './CategoryService';
import { LABEL_SELECT_CATEGORY } from '../../utils/message';

const CategoryDropdown = ({
  onSelect,
  onChange,
  onLoad,
  name = 'category',
  value = '',
  label = LABEL_SELECT_CATEGORY,
  showDescription = true,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const formatted = await categoryDropdown();
        console.log("Loaded categories:", formatted);
        setCategories(formatted);
        onLoad?.(formatted);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const selectedId = e.target.value;

    const selectedCategory = categories.find(
      (cat) => String(cat.id) === String(selectedId)
    );

    if (selectedCategory) {
      setSelectedDescription(selectedCategory.description || '');
      onSelect?.(String(selectedId)); 
    }

    onChange?.(e);
  };

  return (
    <FormGroup>
      <Label>{label}</Label>
      {loading ? (
        <Spinner size="sm" color="primary" />
      ) : (
        <>
          <Input
            type="select"
            name={name}
            value={value || ''}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              {LABEL_SELECT_CATEGORY}
            </option>
            {categories.map((cat, idx) => (
              <option key={cat.id || idx} value={cat.id}>
                {cat.name || 'Unnamed'}
              </option>
            ))}
          </Input>

          {selectedDescription && showDescription && (
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
