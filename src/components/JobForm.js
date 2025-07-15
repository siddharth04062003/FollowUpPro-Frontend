
import React, { useState, useEffect } from 'react';
import StatusDropdown from './StatusDropdown';

const initialState = {
  company: '',
  role: '',
  status: '',
  appliedDate: '',
  followUpDate: '',
  notes: '',
  resume: null
};

const JobForm = ({ onSubmit, editingJob, onCancel }) => {
  const [fileError, setFileError] = useState("");
  const [form, setForm] = useState(initialState);


  useEffect(() => {
    if (editingJob) {
      setForm({
        company: editingJob.company || '',
        role: editingJob.role || '',
        status: editingJob.status || '',
        appliedDate: editingJob.appliedDate ? editingJob.appliedDate.slice(0,10) : '',
        followUpDate: editingJob.followUpDate ? editingJob.followUpDate.slice(0,10) : '',
        notes: editingJob.notes || '',
        resume: null
      });
    } else {
      setForm(initialState);
    }
  }, [editingJob]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      const file = files[0];
      if (file && file.size > 512000) { // 500KB = 512000 bytes
        setFileError("File too large. Please compress your resume to under 500KB before uploading.");
        setForm(f => ({ ...f, resume: null }));
      } else {
        setFileError("");
        setForm(f => ({ ...f, resume: file }));
      }
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialState);
  };


  return (
    <form
      className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8 rounded-2xl shadow-2xl mb-8 animate-fade-in transition-all duration-500 border border-gray-800 flex flex-col gap-5 font-sans"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Company Name</label>
          <input name="company" value={form.company} onChange={handleChange} required placeholder="Company Name" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Role</label>
          <input name="role" value={form.role} onChange={handleChange} required placeholder="Role (e.g. SDE, Analyst)" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Location</label>
          <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <StatusDropdown value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} dark />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Applying Date</label>
          <input type="date" name="appliedDate" value={form.appliedDate} onChange={handleChange} required className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Follow Up Date</label>
          <input type="date" name="followUpDate" value={form.followUpDate} onChange={handleChange} className="w-full rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
        </div>
      </div>
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="w-full mb-4 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-700 transition placeholder-gray-400 px-4 py-2 font-medium shadow-sm" />
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-300">Resume (PDF, DOCX, etc.) <span className="text-xs text-gray-400">(Max 500KB)</span></label>
        <input type="file" name="resume" accept=".pdf,.doc,.docx" onChange={handleChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-300 hover:file:bg-blue-800 transition-all duration-200" />
        {fileError && <div className="text-red-500 text-xs mt-1 font-semibold">{fileError} <a href='https://www.ilovepdf.com/compress_pdf' target='_blank' rel='noopener noreferrer' className='underline hover:text-blue-400'>Compress here</a></div>}
      </div>
      <div className="flex gap-4 mt-6">
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">{editingJob ? 'Update' : 'Add'} Job</button>
        {editingJob && (
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400">Cancel</button>
        )}
      </div>
    </form>
  );
}

export default JobForm;