import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import ProtectedRoute from '@/components/ProtectedRoute'
import LandingPage from './LandingPage'
import LoginPage from './LoginPage'
import JobsPage from './JobsPage'
import SavedJobsPage from './SavedJobsPage'
import ResumesPage from './ResumesPage'
import SavedJobDetailPage from './SavedJobDetailPage'
import SettingsPage from './SettingsPage'

export default function App(){
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobs" element={<ProtectedRoute><JobsPage/></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><SavedJobsPage/></ProtectedRoute>} />
          <Route path="/resumes" element={<ProtectedRoute><ResumesPage/></ProtectedRoute>} />
          <Route path="/saved/:id" element={<ProtectedRoute><SavedJobDetailPage/></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage/></ProtectedRoute>} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
    </div>
  )
}
