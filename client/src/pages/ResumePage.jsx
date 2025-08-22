import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchResumes,
  createResume,
  updateResume,
  deleteResume,
} from '../redux/resumesSlice';

export default function ResumePage() {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resumes);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchResumes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateResume({ id: editId, title, content }));
    } else {
      dispatch(createResume({ title, content }));
    }
    setTitle('');
    setContent('');
    setEditId(null);
  };

  const handleEdit = (resume) => {
    setTitle(resume.title);
    setContent(resume.content);
    setEditId(resume.id);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="border p-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {editId ? 'Update' : 'Create'}
        </button>
      </form>
      <div className="grid gap-4">
        {resumes.map((r) => (
          <div key={r.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{r.title}</h3>
            <p className="whitespace-pre-line">{r.content}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(r)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteResume(r.id))}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
