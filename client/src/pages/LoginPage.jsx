import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import http from '@/lib/http'
import toast from 'react-hot-toast'

function loadGsiScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts && window.google.accounts.id) return resolve()
    const el = document.createElement('script')
    el.src = 'https://accounts.google.com/gsi/client'
    el.async = true
    el.defer = true
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('Failed to load Google script'))
    document.head.appendChild(el)
  })
}

export default function LoginPage(){
  const navigate = useNavigate()
  const loc = useLocation()
  const btnRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [errMsg, setErrMsg] = useState('')

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(()=>{
    let cancelled = false
    const timeout = setTimeout(()=>{
      if (status==='loading') {
        setStatus('error')
        setErrMsg('Gagal memuat tombol Google. Pastikan AdBlock dimatikan & VITE_GOOGLE_CLIENT_ID di .env')
      }
    }, 7000)

    ;(async ()=>{
      try {
        if (!CLIENT_ID) {
          setStatus('error'); setErrMsg('VITE_GOOGLE_CLIENT_ID belum di-set di .env'); return
        }
        await loadGsiScript()
        if (cancelled) return
        window.google.accounts.id.initialize({
          client_id: CLIENT_ID,
          callback: onCredentialResponse,
          ux_mode: 'popup',
        })
        if (btnRef.current) {
          window.google.accounts.id.renderButton(btnRef.current, {
            theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with', logo_alignment: 'left', width: 320,
          })
        }
        setStatus('ready')
      } catch (e) {
        setStatus('error'); setErrMsg('Tidak bisa memuat Google Identity Services.')
      } finally {
        clearTimeout(timeout)
      }
    })()

    return ()=>{ cancelled=true; clearTimeout(timeout) }
  }, [CLIENT_ID])

  async function onCredentialResponse(res){
    try{
      const idToken = res?.credential
      if (!idToken) return toast.error('No credential from Google')
      const { data } = await http.post('/auth/google', { idToken })
      const token = data?.access_token || data?.accessToken || data?.token
      if (!token) throw new Error('No access token from server')
      localStorage.setItem('access_token', token)
      toast.success('Logged in with Google')
      navigate(loc.state?.from || '/jobs', { replace: true })
    }catch(e){
      // interceptor handles errors
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl border p-6 text-center space-y-4">
      <h1 className="text-xl font-semibold">Sign in</h1>
      {status==='loading' && <p className="text-sm text-gray-500">Loading Google button…</p>}
      <div ref={btnRef} className="flex justify-center" />
      {status==='error' && <div className="text-sm text-red-600">{errMsg}</div>}
    </div>
  )
}
