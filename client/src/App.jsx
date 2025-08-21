import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Jobs from './pages/Jobs'
import Saved from './pages/Saved'
import Resumes from './pages/Resumes'
import AIHelper from './pages/AIHelper'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/ai" element={<AIHelper />} />
          </Route>
          <Route path="*" element={<Navigate to="/jobs" replace />} />
        </Routes>
      </main>
    </div>
  )
}
