import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="bg-gray-900/90 p-10 rounded-2xl shadow-2xl w-full max-w-lg text-center border border-gray-800">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-100 drop-shadow">Welcome to <span className="text-blue-400">Job Application Tracker</span></h1>
        <p className="mb-8 text-gray-400 text-lg">Track your job applications, set reminders, and stay organized with ease.</p>
        <div className="flex flex-col gap-4 mt-8">
          <Link to="/login" className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg shadow transition">Login</Link>
          <Link to="/register" className="w-full py-3 rounded-lg bg-gray-800 border border-blue-700 hover:bg-gray-700 text-blue-400 font-semibold text-lg shadow transition">Sign Up</Link>
          <Link to="/admin" className="w-full py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-lg shadow transition">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
