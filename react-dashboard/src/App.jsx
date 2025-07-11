import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import CategoryProducts from './pages/Category/CategoryProducts';
import CategoryManager from './pages/Category/CategoryManager';
import ProductManager from './pages/Product/ProductManager';
import AllOrders from './pages/Order/AllOrders';

import {
  ROUTE_LOGIN,
  ROUTE_DASHBOARD,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_PROFILE,
  ROUTE_CHANGE_PASSWORD,
  ROUTE_CATEGORIES,
  ROUTE_CATEGORY_PRODUCTS,
  ROUTE_PRODUCT_MANAGER,
  ROUTE_ALL_ORDERS
} from './constants/componentRoutes';

function App() {
  return (
    <Routes>
      <Route path={ROUTE_LOGIN} element={<Login />} />
      <Route path={ROUTE_DASHBOARD} element={<Dashboard />} />
      <Route path={ROUTE_FORGOT_PASSWORD} element={<ForgetPassword />} />
      <Route path={ROUTE_PROFILE} element={<Profile />} />
      <Route path={ROUTE_CHANGE_PASSWORD} element={<ChangePassword />} />
      <Route path={ROUTE_CATEGORIES} element={<CategoryManager />} />
      <Route path={ROUTE_CATEGORY_PRODUCTS} element={<CategoryProducts />} />
      <Route path={ROUTE_PRODUCT_MANAGER} element={<ProductManager />} />
      <Route path={ROUTE_ALL_ORDERS} element={<AllOrders />} />
    </Routes>
  );
}

export default App;
