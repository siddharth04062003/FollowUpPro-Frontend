import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [login, setLogin] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [analytics, setAnalytics] = useState(null);

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${API_URL}/admin/login`, login);
      setToken(res.data.token);
      localStorage.setItem('adminToken', res.data.token);
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  useEffect(() => {
    if (!token) return;
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/analytics`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnalytics(res.data);
      } catch {
        setError('Session expired. Please login again.');
        setToken('');
        localStorage.removeItem('adminToken');
      }
    };
    fetchAnalytics();
  }, [token]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-xl shadow-xl flex flex-col gap-4 w-80 border border-gray-800">
          <h2 className="text-2xl font-bold text-blue-400 mb-2 text-center">Admin Login</h2>
          {error && <div className="text-red-400 text-center">{error}</div>}
          <input type="text" placeholder="Admin Username" value={login.username} onChange={e => setLogin(l => ({ ...l, username: e.target.value }))} className="input input-bordered bg-gray-800 text-white" />
          <input type="password" placeholder="Password" value={login.password} onChange={e => setLogin(l => ({ ...l, password: e.target.value }))} className="input input-bordered bg-gray-800 text-white" />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

  if (!analytics) {
    return <div className="min-h-screen flex items-center justify-center text-gray-200 text-xl bg-gray-950">Loading analytics...</div>;
  }

  const statusData = {
    labels: analytics.jobsByStatus.map(s => s._id),
    datasets: [{
      label: 'Jobs by Status',
      data: analytics.jobsByStatus.map(s => s.count),
      backgroundColor: ['#60a5fa', '#fbbf24', '#34d399', '#f87171', '#a78bfa', '#f472b6'],
    }]
  };
  const dateData = {
    labels: analytics.jobsByDate.map(d => d._id),
    datasets: [{
      label: 'Applications per Day',
      data: analytics.jobsByDate.map(d => d.count),
      backgroundColor: '#60a5fa',
    }]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-10 px-2">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-extrabold text-blue-400 text-center">Admin Analytics Dashboard</h1>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all duration-200 ml-4"
            onClick={() => {
              localStorage.removeItem('adminToken');
              setToken('');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-400">{analytics.userCount}</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Total Users</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-green-400">{analytics.jobCount}</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Total Jobs</div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <div className="text-4xl font-bold text-yellow-400">{analytics.jobsByStatus.reduce((a,b)=>a+b.count,0)}</div>
            <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Total Activities</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-300 mb-2">Jobs by Status</h3>
            <Pie data={statusData} />
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-blue-300 mb-2">Applications per Day</h3>
            <Bar data={dateData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
