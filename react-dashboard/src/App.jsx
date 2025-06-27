import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/changePassword" element={<ForgetPassword />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
