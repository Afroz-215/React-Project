import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgetPassword from './pages/ForgetPassword'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user/changePassword" element={<ForgetPassword />} /> {/* ✅ route added */}
    </Routes>
  );
}

export default App;
