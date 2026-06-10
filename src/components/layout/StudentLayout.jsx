import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Video, Download, FileQuestion, Bell,
  LogOut, Menu, ChevronRight, BookOpen
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/student' },
  { icon: Video, label: 'Video Lessons', href: '/student/lessons' },
  { icon: Download, label: 'Downloads', href: '/student/downloads' },
  { icon: FileQuestion, label: 'MCQ Tests', href: '/student/tests' },
  { icon: Bell, label: 'Notifications', href: '/student/notifications' },
]

export default function StudentLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const activeLabel = MENU.find(m =>
    m.href === '/student' ? location.pathname === m.href : location.pathname.startsWith(m.href)
  )?.label || 'Dashboard'

  return (
    <div className="flex h-screen bg-ink-950 overflow-hidden">
      {/* Mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 flex flex-col bg-ink-900 border-r border-ink-800
        transition-transform duration-300 lg:translate-x-0
        ${menuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo + Profile */}
        <div className="px-5 py-5 border-b border-ink-800">
          <Link to="/" className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-primary-600 rounded-sm flex items-center justify-center shrink-0">
              <span className="font-japanese text-white text-xs">明</span>
            </div>
            <div>
              <div className="font-display font-bold text-white text-base leading-none">japanese</div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink-500">Student Portal</div>
            </div>
          </Link>

          {/* Student profile card */}
          <div className="bg-ink-800 rounded-sm p-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-sm font-bold text-white shrink-0">
                {user?.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">{user?.name}</div>
                <div className="text-xs text-ink-500">Level: <span className="text-primary-400 font-medium">{user?.level}</span></div>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] text-ink-500">Progress</span>
                <span className="text-[10px] text-primary-400 font-medium">{user?.progress}%</span>
              </div>
              <div className="h-1.5 bg-ink-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full progress-bar"
                  style={{ width: `${user?.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
          {MENU.map(({ icon: Icon, label, href }) => {
            const active = href === '/student' ? location.pathname === href : location.pathname.startsWith(href)
            return (
              <Link
                key={href}
                to={href}
                className={`sidebar-item ${active ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} />
                <span>{label}</span>
                {active && <ChevronRight size={12} className="ml-auto text-primary-500" />}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-ink-800 p-3">
          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-primary-400 hover:text-primary-300 hover:bg-primary-900/30"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-ink-900/50 border-b border-ink-800 flex items-center justify-between px-5 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)} className="text-ink-400 hover:text-white transition-colors lg:hidden">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-sm font-medium text-white">{activeLabel}</h1>
              <p className="text-xs text-ink-500">Student Portal</p>
            </div>
          </div>
          <Link to="/student/notifications" className="relative text-ink-400 hover:text-white transition-colors">
            <Bell size={17} />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
