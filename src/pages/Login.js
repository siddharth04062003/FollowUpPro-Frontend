import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-900/90 border border-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">Login</h2>
        {error && <div className="bg-red-900/80 text-red-200 px-4 py-2 rounded mb-4">{error}</div>}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input input-bordered w-full mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 placeholder-gray-400"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="input input-bordered w-full mb-6 bg-gray-800 text-gray-100 border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 placeholder-gray-400"
        />
        <button type="submit" className="btn btn-primary w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow transition-transform hover:scale-105 duration-200">Login</button>
        <div className="text-center mt-4 text-gray-400">
          Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;