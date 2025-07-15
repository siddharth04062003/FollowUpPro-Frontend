import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    title: user?.title || '',
    role: user?.role || '',
    linkedin: user?.linkedin || '',
    profilePhoto: user?.photo || '',
  });
  const [fileError, setFileError] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto' && files && files[0]) {
      if (files[0].size > 2 * 1024 * 1024) {
        setFileError('Photo too large. Please use a photo under 2MB.');
        return;
      }
      setFileError('');
      setForm(f => ({ ...f, profilePhoto: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onUpdate) onUpdate(form);
    setEditMode(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-6 mb-8 flex flex-col items-center max-w-md mx-auto animate-fade-in">
      <h2 className="text-xl font-bold text-gray-100 mb-4">User Info</h2>
      {!editMode ? (
        <>
          <img
            src={user.photo && user.photo.includes('http') ? user.photo : (user.photo ? `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace('/api','') : 'http://localhost:5000'}/${user.photo}` : require('../assets/profilePhoto.jpg'))}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-blue-700 shadow-xl mb-2 object-cover ring-2 ring-blue-900"
          />
          <div className="font-extrabold text-gray-100 text-lg tracking-tight mt-1">{user.name}</div>
          <div className="text-xs text-blue-300 font-semibold tracking-wide mb-1">{user.title}</div>
          <div className="text-xs text-green-300 font-semibold tracking-wide mb-2">{user.role}</div>
          <div className="text-gray-400 text-sm mb-1">{user.email}</div>
          {user.linkedin && user.linkedin.startsWith('http') && (
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-bold underline underline-offset-2 tracking-wide text-xs mb-2">LinkedIn</a>
          )}
          <button onClick={() => setEditMode(true)} className="mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-lg shadow transition-all duration-200">Edit</button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-lg shadow transition-all duration-200"
          >
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 mt-2">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2 font-medium shadow-sm" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2 font-medium shadow-sm" />
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2 font-medium shadow-sm" />
          <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2 font-medium shadow-sm" />
          <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 px-4 py-2 font-medium shadow-sm" />
          <label className="block text-xs text-gray-400">Profile Photo (max 2MB)</label>
          <input type="file" name="profilePhoto" accept="image/*" onChange={handleChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800 transition-all duration-200" />
          {fileError && <div className="text-red-500 text-xs mt-1 font-semibold">{fileError}</div>}
          <div className="flex gap-2 mt-2">
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-4 rounded-lg shadow transition-all duration-200">Save</button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded-lg shadow transition-all duration-200">Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserInfo;
