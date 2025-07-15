import React from 'react';

const statusColors = {
  Applied: 'bg-blue-600',
  Interview: 'bg-yellow-500',
  Rejected: 'bg-red-600',
  Offer: 'bg-green-600',
  Accepted: 'bg-purple-600',
};

const SidebarStats = ({ jobs }) => {
  const stats = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});
  const total = jobs.length;

  return (
    <aside className="w-full md:w-64 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-6 mb-8 md:mb-0 md:mr-8 flex-shrink-0 animate-fade-in flex flex-col justify-between min-h-[400px]">
      <div>
        <h2 className="text-xl font-bold text-gray-100 mb-6 text-center">Application Stats</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-gray-300">
            <span className="font-semibold">Total</span>
            <span className="text-lg font-bold">{total}</span>
          </div>
          {Object.keys(statusColors).map(status => (
            <div key={status} className="flex justify-between items-center">
              <span className="text-gray-400">{status}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[status]} transition`}>{stats[status] || 0}</span>
            </div>
          ))}
        </div>
      </div>
      <footer className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400 text-xs font-sans">
        <div className="flex flex-col items-center mb-2">
          <img src={require('../assets/profilePhoto.jpg')} alt="Siddharth Gautam" className="w-16 h-16 rounded-full border-4 border-blue-700 shadow-xl mb-2 object-cover ring-2 ring-blue-900" />
          <div className="font-extrabold text-gray-100 text-base tracking-tight mt-1">Siddharth Gautam</div>
          <div className="text-xs text-blue-300 font-semibold tracking-wide">Full Stack Developer</div>
        </div>
        <div className="flex justify-center gap-4 mt-2 mb-1">
          <a href="https://www.linkedin.com/in/sidga04/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-bold underline underline-offset-2 tracking-wide">LinkedIn</a>
          <span className="text-gray-700 font-bold">|</span>
          <a href="mailto:siddharthgautamshlok@gmail.com" className="hover:text-green-400 transition-colors font-bold underline underline-offset-2 tracking-wide">Email</a>
        </div>
        <div className="mt-3 text-gray-400 border-t border-gray-800 pt-2 text-[11px] italic font-medium flex items-center justify-center gap-1">
          <span>Passionate about building impactful web apps</span> <span className="text-lg">🚀</span>
        </div>
      </footer>
    </aside>
  );
};

export default SidebarStats;
