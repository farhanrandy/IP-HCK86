import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchJobs, saveJob } from '../redux/jobsSlice';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    if (!q) {
      setMessage('Isi pekerjaan yang kamu inginkan');
      return;
    }
    setMessage('');
    dispatch(searchJobs({ q, location }));
  };

  const handleSave = (jobId) => {
    dispatch(saveJob(jobId));
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Job title"
          className="border p-2"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4">
          Search
        </button>
      </div>
      {message && <p className="text-red-500">{message}</p>}
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow">
            <Link to={`/jobs/${job.id}`} className="text-lg font-semibold">
              {job.title}
            </Link>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <button
              onClick={() => handleSave(job.id)}
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
