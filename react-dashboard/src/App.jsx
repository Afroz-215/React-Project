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



function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/changePassword" element={<ForgetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/changePassword' element={<ChangePassword />}></Route>
      <Route path="/categories" element={<CategoryManager />} />
      <Route path="/categoryProducts" element={<CategoryProducts />} />
      <Route path='/Product' element={<ProductManager/>}/>
      <Route path="/orders" element={<AllOrders />} />

    </Routes>
  );
}

export default App;
