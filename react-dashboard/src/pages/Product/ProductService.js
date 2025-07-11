import api from '../../services/axiosInstance';
import { StatusCodes } from 'http-status-codes';


export const PRODUCT_ADD = '/products/addProduct';
export const PRODUCT_EDIT = '/products/editProduct';          // + /:id
export const PRODUCT_DELETE = '/products/deleteProduct';      // + /:id
export const PRODUCT_VIEW = '/products/viewProduct';          // + /:id
export const PRODUCT_LIST = '/products/listOfProducts';
export const PRODUCT_VIEW_ADMIN = '/products/productViewForAdmin'; // + /:id
export const CATEGORY_LIST = '/products/listOfCategories';   // (if still required)


const success = (status) =>
  [StatusCodes.OK, StatusCodes.CREATED, StatusCodes.ACCEPTED].includes(status);



export const addProduct = async (formData) => {
  const res = await api.post(PRODUCT_ADD, formData);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to add product');
};

export const updateProduct = async (id, formData) => {
  const res = await api.put(`${PRODUCT_EDIT}/${id}`, formData);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to update product');
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`${PRODUCT_DELETE}/${id}`);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to delete product');
};

export const viewProduct = async (id) => {
  const res = await api.get(`${PRODUCT_VIEW}/${id}`);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to view product');
};

export const productViewForAdmin = async (id) => {
  const res = await api.get(`${PRODUCT_VIEW_ADMIN}/${id}`);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to view product (admin)');
};


export const listProducts = async (payload = { page: 1, pageSize: 10 }) => {
  const res = await api.post(PRODUCT_LIST, payload);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to list products');
};

export const listCategories = async () => {
  const res = await api.post(CATEGORY_LIST);
  if (success(res.status)) return res.data;
  throw new Error(res.data?.message || 'Failed to list categories');
};
