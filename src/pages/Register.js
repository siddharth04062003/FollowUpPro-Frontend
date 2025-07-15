import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', title: '', linkedin: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoChange = e => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (profilePhoto) data.append('profilePhoto', profilePhoto);
      await api.post('/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-900 rounded-xl shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
      {error && <div className="text-red-400 mb-2 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center">
          <label htmlFor="profilePhoto" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-gray-600 mb-2">
              {preview ? (
                <img src={preview} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-400">Add Photo</span>
              )}
            </div>
            <input id="profilePhoto" name="profilePhoto" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
          <span className="text-xs text-gray-400">Profile Photo (optional, max 2MB)</span>
        </div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required className="input input-bordered w-full bg-gray-800 text-white" />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Professional Title (optional)" className="input input-bordered w-full bg-gray-800 text-white" />
        <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL (optional)" className="input input-bordered w-full bg-gray-800 text-white" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="input input-bordered w-full bg-gray-800 text-white" />
        <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required className="input input-bordered w-full bg-gray-800 text-white" />
        <button type="submit" className="btn btn-primary w-full mt-2">Register</button>
      </form>
    </div>
  );
};

export default Register;