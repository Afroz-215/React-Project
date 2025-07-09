import React, { useEffect, useState } from 'react';
import { FormGroup, Label, Input, Spinner } from 'reactstrap';
import { listOfCategories } from './CategoryService';

const CategoryDropdown = ({
  onSelect,
  onChange,
  onLoad,
  name = 'category',
  value,
  label = 'Select Category',
  showDescription = true,
}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await listOfCategories();
        const raw = res?.data?.categories || [];

        console.log('Fetched dropdown categories:', raw);

        const formatted = raw.map((cat, i) => ({
          id: cat._id || cat.id || i,
          name: cat.name?.trim() || cat.category_name || `Category ${i + 1}`,
          description: cat.description || '',
        }));

        setCategories(formatted);
        onLoad?.(formatted);
      } catch (err) {
        console.error('Error fetching dropdown categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find((cat) => String(cat.id) === String(selectedId));

    if (selectedCategory) {
      setSelectedDescription(selectedCategory.description || '');
      onSelect?.(selectedId);
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
            value={value || ''} // ✅ Fix warning here
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
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

      {/* Debug: See category data */}
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}
    </FormGroup>
  );
};

export default CategoryDropdown;
