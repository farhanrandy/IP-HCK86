import { GoogleLogin } from '@react-oauth/google'
import { useDispatch, useSelector } from 'react-redux'
import { googleLogin } from '../features/auth/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const { status, error, accessToken } = useSelector(s=>s.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    if (accessToken) navigate('/jobs', { replace: true })
  }, [accessToken, navigate])

  return (
    <div className="grid place-items-center h-[70vh]">
      <div className="bg-white border rounded-2xl p-8 shadow-sm w-full max-w-md">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-sm text-gray-600 mt-1">
          Sign in with Google to receive a JWT from the backend.
        </p>
        <div className="mt-6 flex justify-center">
          <GoogleLogin
            onSuccess={(credResp) => {
              const idToken = credResp?.credential
              if (!idToken) return
              dispatch(googleLogin({ idToken }))
            }}
            onError={() => alert('Google login error')}
            useOneTap
          />
        </div>
        <div className="mt-3 text-sm">
          {status==='loading' && <span className="text-gray-600">Logging in…</span>}
          {status==='failed' && <span className="text-red-600">{error}</span>}
        </div>
      </div>
    </div>
  )
}
