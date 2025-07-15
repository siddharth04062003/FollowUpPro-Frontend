import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Use your axios instance with JWT
import JobForm from '../components/JobForm';
import FilterBar from '../components/FilterBar';

import JobTable from '../components/JobTable';
import SidebarStats from '../components/SidebarStats';

import UserInfo from '../components/UserInfo';

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);


  // --- HOOKS AND LOGIC ---
  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState({ status: '', date: '' });
  const [editingJob, setEditingJob] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    // Fetch user profile
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/profile');
        setUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, []);

  const handleAddOrEdit = async (jobData) => {
    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, jobData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEditingJob(null);
      } else {
        await api.post('/jobs', jobData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchJobs();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const filteredJobs = jobs.filter(job => {
    let statusMatch = filter.status ? job.status === filter.status : true;
    let dateMatch = filter.date ? job.appliedDate && job.appliedDate.startsWith(filter.date) : true;
    return statusMatch && dateMatch;
  });


  const handleUserUpdate = (updatedUser) => {
    // TODO: Implement user update API call
    // For now, just update local state
    setUser(prev => ({ ...prev, ...updatedUser }));
  };

  // --- SINGLE RETURN ---

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-gray-200 text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex flex-col items-center py-0 px-2">
      {/* Top Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between px-6 py-4 mb-6 rounded-2xl bg-gray-900/80 border border-gray-800 shadow-lg animate-fade-in-down">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <img
              src={user.profilePhoto
                ? (user.profilePhoto.startsWith('http')
                    ? user.profilePhoto
                    : `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api','') : 'http://localhost:5000'}/${user.profilePhoto}`)
                : 'https://unavatar.io/github/ghost'}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-blue-500 shadow object-cover ring-2 ring-blue-400 group-hover:ring-4 transition-all duration-200"
              title={user.name + (user.role ? ` (${user.role})` : '')}
            />
            <span className="absolute left-1/2 -translate-x-1/2 top-12 opacity-0 group-hover:opacity-100 bg-gray-800 text-xs text-gray-200 px-3 py-1 rounded shadow-lg transition-all duration-200 pointer-events-none z-10 whitespace-nowrap">
              {user.name} {user.role && <span className="text-blue-300">({user.role})</span>}
            </span>
          </div>
          <span className="text-lg md:text-2xl font-extrabold text-gray-100 font-mono tracking-wide animate-fade-in">Hello <span className="text-blue-400">{user.name.split(' ')[0]}</span>!</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-xs text-gray-500 font-semibold tracking-widest uppercase">Welcome to your Dashboard</span>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-all duration-200"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
        <div className="flex flex-col gap-6 md:w-80">
          <UserInfo user={{
            name: user.name,
            email: user.email,
            title: user.title,
            role: user.role,
            linkedin: user.linkedin,
            photo: user.profilePhoto
              ? (user.profilePhoto.startsWith('http')
                  ? user.profilePhoto
                  : `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api','') : 'http://localhost:5000'}/${user.profilePhoto}`)
              : 'https://unavatar.io/github/ghost',
          }} onUpdate={handleUserUpdate} />
          <SidebarStats jobs={jobs} />
        </div>
        <div className="flex-1 bg-gray-900/90 rounded-2xl shadow-2xl p-8 border border-gray-800">
          <h1 className="text-4xl font-extrabold mb-8 text-gray-100 text-center drop-shadow">Job Application Tracker</h1>
          <div className="mb-8">
            <JobForm onSubmit={handleAddOrEdit} editingJob={editingJob} onCancel={() => setEditingJob(null)} />
          </div>
          <div className="mb-8">
            <FilterBar filter={filter} setFilter={setFilter} />
          </div>
          <JobTable jobs={filteredJobs} onDelete={handleDelete} onEdit={handleEditClick} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;