import React from 'react';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  StickyNote, 
  BarChart3, 
  Filter,
  Mail,
  Bell
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <PlusCircle className="w-6 h-6" />,
      title: "Add & Manage Applications",
      description: "Easily add, edit, and delete job applications with detailed information"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Track Application Status",
      description: "Monitor progress: Applied, Interview, Rejected, Offer, Accepted"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Follow-up Reminders",
      description: "Set automated reminders to never miss important follow-ups"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Notifications",
      description: "Get daily email reminders at 6 AM and 8 PM for scheduled follow-ups"
    },
    {
      icon: <StickyNote className="w-6 h-6" />,
      title: "Personal Notes",
      description: "Add detailed notes and insights for each application"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Dashboard Analytics",
      description: "Comprehensive table view with filtering and sorting capabilities"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-gray-900/90 p-10 rounded-2xl shadow-2xl w-full max-w-4xl text-center border border-gray-800">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-100 drop-shadow">
            Welcome to <span className="text-blue-400">Job Application Tracker</span>
          </h1>
          <p className="mb-8 text-gray-400 text-lg max-w-2xl mx-auto">
            Track your job applications, set reminders, and stay organized with ease. 
            Never miss a follow-up opportunity again.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg shadow-lg transition transform hover:scale-105">
              Login
            </button>
            <button className="px-8 py-3 rounded-lg bg-gray-800 border border-blue-700 hover:bg-gray-700 text-blue-400 font-semibold text-lg shadow-lg transition transform hover:scale-105">
              Sign Up
            </button>
            <button className="px-8 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-lg shadow-lg transition transform hover:scale-105">
              Admin Login
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-100 mb-8">
              Powerful Features to Boost Your Job Search
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600/20 rounded-lg mb-4 mx-auto">
                    <span className="text-blue-400">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Indicators */}
          <div className="mt-12 p-6 bg-gray-800/30 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">
              Track Every Stage of Your Journey
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { status: 'Applied', color: 'bg-blue-500', textColor: 'text-blue-100' },
                { status: 'Interview', color: 'bg-yellow-500', textColor: 'text-yellow-100' },
                { status: 'Rejected', color: 'bg-red-500', textColor: 'text-red-100' },
                { status: 'Offer', color: 'bg-green-500', textColor: 'text-green-100' },
                { status: 'Accepted', color: 'bg-purple-500', textColor: 'text-purple-100' }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`${item.color} ${item.textColor} px-4 py-2 rounded-full text-sm font-medium shadow-lg`}
                >
                  {item.status}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
            <h3 className="text-2xl font-bold text-gray-100 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-4">
              Join thousands of job seekers who are staying organized and landing their dream jobs.
            </p>
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition transform hover:scale-105 shadow-lg">
              Get Started Free
              <PlusCircle className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;