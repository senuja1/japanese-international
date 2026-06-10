import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const STYLES = {
  success: 'border-emerald-700 bg-emerald-900/80 text-emerald-200',
  error: 'border-red-700 bg-red-900/80 text-red-200',
  warning: 'border-amber-700 bg-amber-900/80 text-amber-200',
  info: 'border-blue-700 bg-blue-900/80 text-blue-200',
}

function ToastItem({ id, message, type, dismiss }) {
  const Icon = ICONS[type] || Info
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-sm border backdrop-blur-sm shadow-xl max-w-sm text-sm ${STYLES[type] || STYLES.info} animate-[fadeInUp_0.3s_ease_both]`}>
      <Icon size={15} className="shrink-0 mt-0.5" />
      <span className="flex-1 leading-relaxed">{message}</span>
      <button onClick={() => dismiss(id)} className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
        <X size={13} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const toast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <ToastItem {...t} dismiss={dismiss} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx.toast
}
