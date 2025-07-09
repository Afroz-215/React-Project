import axios from 'axios';

const BASE_URL = 'https://e-commerce-gg46.onrender.com/api';

export const listOfCategories = async () => {
  const token = localStorage.getItem('token');

  return axios.post(`${BASE_URL}/category/listOfCategories`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const categoryDropdown = async () => {
  const res = await axios.get(`${BASE_URL}/categoryDropdown`);
  const raw = res?.data?.data || [];

  const formatted = raw.map((cat, i) => ({
    id: cat._id || cat.id || i,
    name: cat.name?.trim() || `Category ${i + 1}`,
    description: cat.description || ''
  }));

  return Promise.resolve({ data: formatted });
};

//  MOCK only for changes
let mockCategories = [];

export const addCategory = async (formData) => {
  const newCat = {
    id: Date.now(),
    name: formData.name,
    description: formData.description || ''
  };
  mockCategories.push(newCat);
  return Promise.resolve({ data: { message: 'Mock added', category: newCat } });
};

export const updateCategory = async (id, formData) => {
  mockCategories = mockCategories.map((c) => (c.id === id ? { ...c, ...formData } : c));
  return Promise.resolve({ data: { message: 'Mock updated' } });
};

export const deleteCategory = async (id) => {
  mockCategories = mockCategories.filter((c) => c.id !== id);
  return Promise.resolve({ data: { message: 'Mock deleted' } });
};

export const viewCategory = async (id) => {
  const found = mockCategories.find((c) => c.id === id);
  return Promise.resolve({ data: found || {} });
};
