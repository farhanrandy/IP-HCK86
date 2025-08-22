
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import JobsPage from '@/pages/JobsPage'
import SavedJobsPage from '@/pages/SavedJobsPage'
import ResumesPage from '@/pages/ResumesPage'
import ResumeEditorPage from '@/pages/ResumeEditorPage'
import LoginPage from '@/pages/LoginPage'
import ProtectedRoute from '@/routes/ProtectedRoute'

function Nav() {
  return (
    <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/jobs" className="font-semibold">Job Finder</Link>
        <div className="ml-auto flex items-center gap-3">
          <Link to="/jobs" className="text-sm hover:underline">Jobs</Link>
          <Link to="/saved" className="text-sm hover:underline">Saved</Link>
          <Link to="/resumes" className="text-sm hover:underline">Resumes</Link>
          <Link to="/login" className="text-sm hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <div className="min-h-screen text-gray-900">
      <Nav />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/saved" element={<SavedJobsPage />} />
            <Route path="/resumes" element={<ResumesPage />} />
            <Route path="/resumes/new" element={<ResumeEditorPage />} />
            <Route path="/resumes/:id/edit" element={<ResumeEditorPage />} />
          </Route>
          <Route path="*" element={<div className="text-center py-20">404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  )
}
