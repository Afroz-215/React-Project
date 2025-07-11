import axiosInstance from '../../services/axiosInstance';
import { StatusCodes } from 'http-status-codes';

export const CATEGORY_LIST = '/Category/listOfCategories';
export const CATEGORY_DROPDOWN = '/Category/CategoryDropdown';

export const listOfCategories = async () => {
  const res = await axiosInstance.post(CATEGORY_LIST);
  if ([StatusCodes.OK, StatusCodes.CREATED, StatusCodes.ACCEPTED].includes(res.status)) {
    return res.data;
  }
  throw new Error(res.data?.message || 'Failed to load categories');
};

export const categoryDropdown = async () => {
  const res = await axiosInstance.get(CATEGORY_DROPDOWN);
  if ([StatusCodes.OK, StatusCodes.CREATED, StatusCodes.ACCEPTED].includes(res.status)) {
    return (res.data?.data || []).map((cat, i) => ({
      id: cat._id || cat.id || i,
      name: (cat.category_name || cat.name || '').trim() || `Category ${i + 1}`,
      description: cat.description || '',
    }));
  }
  throw new Error(res.data?.message || 'Failed to load category dropdown');
};


export const listProducts = async (payload) => {
  const res = await axiosInstance.post('/products/listOfProducts', payload);
  return res;
};



let mockCategories = [];

export const addCategory = async (formData) => {
  const newCat = {
    id: Date.now(),
    name: formData.name,
    description: formData.description || '',
  };
  mockCategories.push(newCat);
  return { message: 'Mock added', category: newCat };
};

export const updateCategory = async (id, formData) => {
  mockCategories = mockCategories.map((c) =>
    c.id === id ? { ...c, ...formData } : c
  );
  return { message: 'Mock updated' };
};

export const deleteCategory = async (id) => {
  mockCategories = mockCategories.filter((c) => c.id !== id);
  return { message: 'Mock deleted' };
};

export const viewCategory = async (id) => {
  const found = mockCategories.find((c) => c.id === id);
  return found || {};
};
