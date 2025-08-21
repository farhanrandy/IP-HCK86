import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginWithGoogle } from '@/slices/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginPage(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { status, token } = useSelector(s=>s.auth)
  const btnRef = useRef(null)

  useEffect(()=>{ if (token) navigate('/jobs') }, [token, navigate])

  useEffect(()=>{
    if (window.google && window.google.accounts && btnRef.current){
      window.google.accounts.id.initialize({
        client_id: '385986024648-1fe2dkgt3in5jgl09sdlkd53efn6r6ut.apps.googleusercontent.com',
        callback: async (cred)=>{
          const idToken = cred.credential
          try{
            await dispatch(loginWithGoogle(idToken)).unwrap()
            navigate('/jobs')
          }catch(e){ console.error(e) }
        }
      })
      window.google.accounts.id.renderButton(btnRef.current, { theme: 'filled_blue', size: 'large', text: 'continue_with' })
    }
  }, [dispatch])

  const handleDevStub = async ()=>{
    try{
      await dispatch(loginWithGoogle('dev-stub-token')).unwrap()
      navigate('/jobs')
    }catch(e){ console.error(e) }
  }

  return (
    <div className="mx-auto max-w-md py-16">
      <div className="rounded-xl border bg-white p-6">
        <h2 className="text-xl font-semibold">Login</h2>
        <p className="mt-1 text-sm text-zinc-600">Masuk untuk menyimpan job dan generate cover letter.</p>

        <div ref={btnRef} className="mt-6 flex justify-center"></div>

        <button onClick={handleDevStub} className="mt-3 w-full rounded-lg border px-4 py-2 text-sm">Dev Login (stub)</button>

        {status === 'loading' && <p className="mt-3 text-sm text-zinc-600">Memproses...</p>}
        <p className="mt-2 text-xs text-zinc-500">Ganti client id Google di file ini.</p>
      </div>
    </div>
  )
}
