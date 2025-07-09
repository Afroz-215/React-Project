// src/pages/Product/ProductService.js
import axios from 'axios';

const BASE_URL = 'https://e-commerce-gg46.onrender.com/api/products';

export const addProduct = (formData) => {
  return axios.post(`${BASE_URL}/addProduct`, formData);
};

export const updateProduct = (id, formData) => {
  return axios.put(`${BASE_URL}/editProduct/${id}`, formData);
};

export const deleteProduct = (id) => {
  return axios.delete(`${BASE_URL}/deleteProduct/${id}`);
};

export const viewProduct = (id) => {
  return axios.get(`${BASE_URL}/viewProduct/${id}`);
};

export const listProducts = () => {
  return axios.post(`${BASE_URL}/listOfProducts`);
};

export const listCategories = () => {
  return axios.post(`${BASE_URL}/listOfCategories`);
};

export const productViewForAdmin = (id) => {
  return axios.get(`${BASE_URL}/productViewForAdmin/${id}`);
};
