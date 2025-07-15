import React from 'react';

const statuses = ['Applied', 'Interview', 'Rejected', 'Offer', 'Accepted'];

const StatusDropdown = ({ value, onChange }) => (
  <select name="status" value={value} onChange={onChange} className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm">
    {statuses.map(status => (
      <option key={status} value={status} className="bg-gray-900 text-gray-100">{status}</option>
    ))}
  </select>
);

export default StatusDropdown; 