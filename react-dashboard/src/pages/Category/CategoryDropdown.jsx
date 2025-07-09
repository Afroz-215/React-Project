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
        console.log("Fetched dropdown categories:", res?.data?.data?.categories);

        const raw = res?.data?.data?.categories || [];

        const formatted = raw.map((cat, i) => ({
          id: cat._id || cat.id || i,
          name: cat.category_name || cat.name || `Category ${i + 1}`,
          description: cat.description || '',
        }));

        setCategories(formatted);
        if (onLoad) onLoad(formatted);
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
    const selectedCategory = categories.find(
      (cat) => String(cat.id) === String(selectedId)
    );

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
            value={value }
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

      <pre>{JSON.stringify(categories, null, 2)}</pre>
    </FormGroup>
  );
};

export default CategoryDropdown;
