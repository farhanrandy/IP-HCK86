import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4 items-center">
      <Link to="/home" className="font-bold">JobFinderAI</Link>
      <Link to="/saved">Saved Jobs</Link>
      <Link to="/resumes">Resume</Link>
      <Link to="/settings">Settings</Link>
      <button onClick={handleLogout} className="ml-auto">Logout</button>
    </nav>
  );
}
