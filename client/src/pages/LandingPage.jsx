import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice';

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await api.get('/auth/google');
      localStorage.setItem('access_token', data.access_token);
      dispatch(setUser(data.user));
      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <button onClick={handleLogin} className="px-4 py-2 bg-red-500 text-white rounded">
        Login with Google
      </button>
    </div>
  );
}
