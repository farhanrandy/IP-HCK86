import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/slices/authSlice'

export default function Navbar(){
  const { token, user } = useSelector(s=>s.auth)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const items = [
    { to: '/jobs', label: 'Jobs' },
    { to: '/saved', label: 'Saved' },
    { to: '/resumes', label: 'Resumes' },
    { to: '/settings', label: 'Settings' },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-semibold tracking-tight">JobFinder<span className="text-blue-600">AI</span></Link>
        <nav className="hidden gap-4 md:flex">
          {items.map(it => (
            <Link key={it.to} to={it.to} className={`text-sm ${location.pathname.startsWith(it.to) ? 'text-blue-600' : 'text-zinc-700'} hover:underline`}>
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {token ? (
            <>
              <span className="hidden text-sm text-zinc-600 md:inline">Hi, {user?.name || 'User'}</span>
              <button onClick={()=>{ dispatch(logout()); navigate('/login') }} className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm text-white">Logout</button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white">Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}
