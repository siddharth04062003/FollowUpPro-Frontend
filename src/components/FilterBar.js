import StatusDropdown from './StatusDropdown';
import React from 'react';

const FilterBar = ({ filter, setFilter }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center animate-fade-in">
      <select
        value={filter.status}
        onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
        className="input input-bordered"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        <option value="Offer">Offer</option>
        <option value="Accepted">Accepted</option>
      </select>
      <div>
        <label className="mr-2 font-semibold text-blue-700">Status:</label>
        <StatusDropdown value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))} />
      </div>
      <div>
        <label className="mr-2 font-semibold text-blue-700">Applied Date:</label>
        <input type="date" value={filter.date} onChange={e => setFilter(f => ({ ...f, date: e.target.value }))} className="input input-bordered rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition" />
      </div>
      <button className="btn btn-secondary bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow transition-transform hover:scale-105 duration-200" onClick={() => setFilter({ status: '', date: '' })}>Clear Filters</button>
    </div>
  );
};

export default FilterBar;