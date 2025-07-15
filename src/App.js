import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import AdminDashboard from './pages/AdminDashboard';


function Profile() {
  // Placeholder for user profile page
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <p>Profile details and actions will go here.</p>
    </div>
  );
}

function App() {
  return (
    <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;