import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import SavedJobsPage from './pages/SavedJobsPage';
import JobDetailPage from './pages/JobDetailPage';
import ResumePage from './pages/ResumePage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';

function App() {
  const token = localStorage.getItem('access_token');

  return (
    <BrowserRouter>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Navigate to="/home" /> : <LandingPage />} />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/saved" element={token ? <SavedJobsPage /> : <Navigate to="/" />} />
        <Route path="/jobs/:id" element={token ? <JobDetailPage /> : <Navigate to="/" />} />
        <Route path="/resumes" element={token ? <ResumePage /> : <Navigate to="/" />} />
        <Route path="/settings" element={token ? <SettingsPage /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
