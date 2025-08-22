import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
  const token = useSelector(s => s.auth.accessToken)
  return token ? <Outlet /> : <Navigate to="/login" replace />
}
