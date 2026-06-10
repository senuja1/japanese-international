// src/components/ui/index.jsx
// Reusable atomic UI components

import React from 'react'
import { X, Loader2 } from 'lucide-react'

/* ── Badge ───────────────────────────────────────────────── */
export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'badge',
    green: 'badge badge-green',
    red: 'badge badge-red',
    yellow: 'badge badge-yellow',
    blue: 'badge badge-blue',
  }
  return (
    <span className={`${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  )
}

/* ── Button ──────────────────────────────────────────────── */
export function Button({ children, variant = 'primary', size = 'md', loading, disabled, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 font-body font-medium transition-all duration-200 rounded-sm'
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    ghost: 'text-ink-400 hover:text-white hover:bg-ink-800 px-3 py-1.5',
    danger: 'bg-red-700 hover:bg-red-600 text-white shadow-sm',
  }
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
}

/* ── Input ───────────────────────────────────────────────── */
export function Input({ label, error, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs text-ink-500 mb-1.5">{label}</label>}
      <input className={`input-field ${error ? 'border-red-600 focus:border-red-500' : ''} ${className}`} {...props} />
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}

/* ── Select ──────────────────────────────────────────────── */
export function Select({ label, error, children, className = '', ...props }) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs text-ink-500 mb-1.5">{label}</label>}
      <select className={`input-field ${error ? 'border-red-600' : ''} ${className}`} {...props}>
        {children}
      </select>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  )
}

/* ── Card ────────────────────────────────────────────────── */
export function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`card ${hover ? 'hover:border-ink-700 transition-all duration-200 cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

/* ── Modal ───────────────────────────────────────────────── */
export function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${maxWidth} bg-ink-900 border border-ink-700 rounded-sm p-6 shadow-2xl`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-white transition-colors">
            <X size={17} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

/* ── Spinner ─────────────────────────────────────────────── */
export function Spinner({ size = 16, className = '' }) {
  return (
    <Loader2
      size={size}
      className={`animate-spin text-primary-400 ${className}`}
    />
  )
}

/* ── EmptyState ──────────────────────────────────────────── */
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="w-12 h-12 rounded-sm bg-ink-800 flex items-center justify-center mb-4">
          <Icon size={22} className="text-ink-600" />
        </div>
      )}
      <h3 className="font-medium text-white text-sm mb-1">{title}</h3>
      {description && <p className="text-xs text-ink-500 max-w-xs leading-relaxed mb-4">{description}</p>}
      {action}
    </div>
  )
}

/* ── Divider ─────────────────────────────────────────────── */
export function Divider({ label, className = '' }) {
  if (!label) return <div className={`divider ${className}`} />
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-px bg-ink-800" />
      <span className="text-xs text-ink-600 shrink-0">{label}</span>
      <div className="flex-1 h-px bg-ink-800" />
    </div>
  )
}

/* ── Alert ───────────────────────────────────────────────── */
export function Alert({ children, variant = 'info', className = '' }) {
  const variants = {
    info: 'bg-blue-900/20 border-blue-800/40 text-blue-300',
    warning: 'bg-amber-900/20 border-amber-800/40 text-amber-300',
    success: 'bg-emerald-900/20 border-emerald-800/40 text-emerald-300',
    error: 'bg-red-900/20 border-red-800/40 text-red-300',
  }
  return (
    <div className={`border rounded-sm px-4 py-3 text-sm ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

/* ── StatCard ────────────────────────────────────────────── */
export function StatCard({ icon: Icon, label, value, change, positive, accent = 'text-primary-400' }) {
  return (
    <div className="stat-card">
      <div className="flex items-center justify-between mb-3">
        <div className="w-8 h-8 rounded-sm bg-ink-800 flex items-center justify-center">
          <Icon size={15} className={accent} />
        </div>
        {change !== undefined && (
          <span className={`text-xs font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="font-display text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-ink-500 mt-1">{label}</div>
    </div>
  )
}

/* ── SectionHeader ───────────────────────────────────────── */
export function SectionHeader({ label, title, subtitle, center = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      {title && (
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-3">
          {title}
        </h2>
      )}
      {subtitle && <p className="text-ink-300 text-base leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  )
}

/* ── ProgressBar ─────────────────────────────────────────── */
export function ProgressBar({ value, max = 100, label, showPercent = true, color = 'bg-primary-500' }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between text-xs mb-1.5">
          {label && <span className="text-ink-400">{label}</span>}
          {showPercent && <span className="text-white font-medium">{pct}%</span>}
        </div>
      )}
      <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full progress-bar`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ── TableWrapper ────────────────────────────────────────── */
export function TableWrapper({ children }) {
  return (
    <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {children}
        </table>
      </div>
    </div>
  )
}

/* ── Th (Table Header Cell) ──────────────────────────────── */
export function Th({ children }) {
  return (
    <th className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-ink-500 uppercase whitespace-nowrap">
      {children}
    </th>
  )
}
