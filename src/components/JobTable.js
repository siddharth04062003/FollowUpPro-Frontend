import React from 'react';

const JobTable = ({ jobs, onDelete, onEdit }) => (
  <div className="overflow-x-auto animate-fade-in">
    <table className="table-auto w-full bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 rounded-2xl shadow-2xl border border-gray-800 text-gray-100 font-sans">
      <thead className="bg-gray-800/80">
        <tr>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Company</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Role</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Location</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Status</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs" title="Date you applied to the job">Applied Date</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs" title="Date you plan to follow up">Follow Up Date</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Notes</th>
          <th className="py-3 px-2 text-blue-400 font-extrabold tracking-wide uppercase text-xs">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.length === 0 ? (
          <tr>
            <td colSpan="8" className="text-center py-6 text-gray-500 font-semibold">No jobs found.</td>
          </tr>
        ) : (
          jobs.map((job, idx) => (
            <tr key={job._id} className={idx % 2 === 0 ? 'bg-gray-900/80' : 'bg-gray-800/60 hover:bg-gray-700/80 transition'}>
              <td className="py-3 px-2 font-semibold text-gray-100">{job.company}</td>
              <td className="py-3 px-2 text-gray-300">{job.role}</td>
              <td className="py-3 px-2 text-gray-300">{job.location}</td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 rounded-full text-xs font-bold text-white bg-blue-600 shadow-sm">{job.status}</span>
              </td>
              <td className="py-3 px-2 text-gray-400" title="Date you applied">{job.appliedDate ? job.appliedDate.slice(0, 10) : ''}</td>
              <td className="py-3 px-2 text-gray-400" title="Date you plan to follow up">{job.followUpDate ? job.followUpDate.slice(0, 10) : ''}</td>
              <td className="py-3 px-2 text-gray-400 max-w-xs truncate">{job.notes}</td>
              <td className="py-3 px-2 flex gap-2">
                <button onClick={() => onEdit(job)} className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-3 py-1 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400">Edit</button>
                <button onClick={() => onDelete(job._id)} className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400">Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default JobTable;