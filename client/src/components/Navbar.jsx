import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authSlice'

function NavLink({ to, children }) {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      className={
        'px-3 py-2 rounded-lg text-sm font-medium ' +
        (active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100')
      }
      to={to}
    >
      {children}
    </Link>
  )
}

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector(s => s.auth.accessToken)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-3 py-3">
          <Link to="/jobs" className="text-lg font-semibold">JobFinder</Link>
          <nav className="flex gap-1 ml-2">
            <NavLink to="/jobs">Jobs</NavLink>
            <NavLink to="/saved">Saved</NavLink>
            <NavLink to="/resumes">Resumes</NavLink>
            <NavLink to="/ai">AI Helper</NavLink>
          </nav>
          <div className="ml-auto">
            {token ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-lg bg-gray-900 text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
