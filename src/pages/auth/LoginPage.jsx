import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, Shield, GraduationCap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const [role, setRole] = useState('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const { login, loading, error, setError, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : '/student')
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await login(email, password, role)
    if (result.success) {
      navigate(result.user.role === 'admin' ? '/admin' : '/student')
    }
  }

  const fillDemo = (r) => {
    setRole(r)
    setError(null)
    if (r === 'admin') {
      setEmail('admin@japanese.international')
      setPassword('admin123')
    } else {
      setEmail('tanaka@japanese.international')
      setPassword('student123')
    }
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary-600 rounded-sm flex items-center justify-center">
              <span className="font-japanese text-white text-base">明</span>
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-white text-xl leading-none">Japanese</div>
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-500">International</div>
            </div>
          </Link>
          <p className="text-ink-400 text-sm mt-5">Sign in to your portal</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-ink-900 border border-ink-800 rounded-sm p-1 mb-6">
          <button
            onClick={() => { setRole('student'); setError(null) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-sm transition-all duration-200 ${
              role === 'student' ? 'bg-primary-600 text-white' : 'text-ink-400 hover:text-white'
            }`}
          >
            <GraduationCap size={15} /> Student
          </button>
          <button
            onClick={() => { setRole('admin'); setError(null) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm rounded-sm transition-all duration-200 ${
              role === 'admin' ? 'bg-primary-600 text-white' : 'text-ink-400 hover:text-white'
            }`}
          >
            <Shield size={15} /> Admin
          </button>
        </div>

        {/* Demo Hints */}
        <div className="bg-ink-900/60 border border-ink-800 rounded-sm p-3 mb-6 text-xs">
          <p className="text-ink-500 mb-2 font-mono">Demo credentials:</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => fillDemo('student')} className="text-left p-2 bg-ink-800 rounded hover:bg-ink-700 transition-colors">
              <div className="text-primary-400 font-medium">Student</div>
              <div className="text-ink-500 mt-0.5">tanaka@atsuko.international</div>
              <div className="text-ink-500">student123</div>
            </button>
            <button onClick={() => fillDemo('admin')} className="text-left p-2 bg-ink-800 rounded hover:bg-ink-700 transition-colors">
              <div className="text-primary-400 font-medium">Admin</div>
              <div className="text-ink-500 mt-0.5">admin@japanese.international</div>
              <div className="text-ink-500">admin123</div>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-ink-900 border border-ink-800 rounded-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-ink-500 mb-1.5">Email Address</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-field"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-xs text-ink-500 mb-1.5">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-800/50 rounded-sm px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer"
              className="text-xs text-ink-500 hover:text-primary-400 transition-colors">
              Forgot password? Contact admin →
            </a>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-ink-600 hover:text-ink-400 transition-colors">
            ← Back to public site
          </Link>
        </div>
      </div>
    </div>
  )
}
