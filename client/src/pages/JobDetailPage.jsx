import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes } from '../redux/resumesSlice';
import api from '../api';
import jsPDF from 'jspdf';

export default function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [resumeId, setResumeId] = useState('');
  const [letter, setLetter] = useState('');
  const resumes = useSelector((state) => state.resumes);
  const dispatch = useDispatch();

  useEffect(() => {
    const getJob = async () => {
      const { data } = await api.get(`/jobs/${id}`);
      setJob(data);
    };
    getJob();
    dispatch(fetchResumes());
  }, [id, dispatch]);

  const handleGenerate = async () => {
    const { data } = await api.post('/ai/cover-letter', { jobId: id, resumeId });
    setLetter(data.letter);
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(letter, 10, 10);
    doc.save('cover-letter.pdf');
  };

  if (!job) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p className="mt-4">{job.description}</p>
      <p className="mt-2">{job.qualifications}</p>
      {job.applyUrl && (
        <a href={job.applyUrl} target="_blank" rel="noopener" className="text-blue-500">
          Apply
        </a>
      )}
      <div className="mt-4">
        <select
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          className="border p-2"
        >
          <option value="">Pilih resume</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.title}
            </option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
          className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Generate AI Cover Letter
        </button>
      </div>
      {letter && (
        <div className="mt-4">
          <h2 className="font-semibold">Cover Letter</h2>
          <p className="whitespace-pre-line border p-2">{letter}</p>
          <button onClick={downloadPdf} className="mt-2 bg-green-500 text-white px-2 py-1 rounded">
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
