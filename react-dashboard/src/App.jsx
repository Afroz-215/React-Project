import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import CategoryDropdown from './pages/Category/CategoryDropdown';
import CategoryProducts from './pages/Category/CategoryProducts';
import CategoryManager from './pages/Category/CategoryManager';


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

    </Routes>
  );
}

export default App;
