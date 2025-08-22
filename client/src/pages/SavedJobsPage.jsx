import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedJobs } from '../redux/jobsSlice';
import { Link } from 'react-router-dom';

export default function SavedJobsPage() {
  const dispatch = useDispatch();
  const saved = useSelector((state) => state.jobs.saved);

  useEffect(() => {
    dispatch(fetchSavedJobs());
  }, [dispatch]);

  return (
    <div className="p-4 grid gap-4">
      {saved.map((job) => (
        <Link to={`/jobs/${job.id}`} key={job.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">{job.title}</h2>
          <p>{job.company}</p>
          <p>{job.location}</p>
        </Link>
      ))}
    </div>
  );
}
