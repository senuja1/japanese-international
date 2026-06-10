import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, BookOpen, Calendar, Bell,
  Briefcase, LogOut, Menu, X, ChevronRight, Settings
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const MENU = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: BookOpen, label: 'Content', href: '/admin/content' },
  { icon: Calendar, label: 'Schedule', href: '/admin/schedule' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
  { icon: Briefcase, label: 'Vacancies', href: '/admin/vacancies' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="flex h-screen bg-ink-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-ink-900 border-r border-ink-800 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
        {/* Logo */}
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-ink-800 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-primary-600 rounded-sm flex items-center justify-center shrink-0">
            <span className="font-japanese text-white text-xs">明</span>
          </div>
          {!collapsed && (
            <div>
              <div className="font-display font-bold text-white text-base leading-none">Japanese International</div>
              <div className="font-mono text-[8px] tracking-[0.15em] uppercase text-ink-500">Admin Panel</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
          {MENU.map(({ icon: Icon, label, href }) => {
            const active = location.pathname === href || (href !== '/admin' && location.pathname.startsWith(href))
            return (
              <Link
                key={href}
                to={href}
                title={collapsed ? label : undefined}
                className={`sidebar-item ${active ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <Icon size={16} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
                {!collapsed && active && <ChevronRight size={12} className="ml-auto text-primary-500" />}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="border-t border-ink-800 p-3 space-y-1">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {user?.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">{user?.name}</div>
                <div className="text-[10px] text-ink-500">Administrator</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`sidebar-item w-full text-primary-400 hover:text-primary-300 hover:bg-primary-900/30 ${collapsed ? 'justify-center px-2' : ''}`}
          >
            <LogOut size={15} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-5 -right-3 w-6 h-6 bg-ink-800 border border-ink-700 rounded-full flex items-center justify-center text-ink-400 hover:text-white hover:bg-ink-700 transition-colors z-10"
          style={{ position: 'sticky', marginLeft: 'auto', marginRight: '-12px' }}
        >
          {collapsed ? <ChevronRight size={12} /> : <X size={10} />}
        </button>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-14 bg-ink-900/50 border-b border-ink-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setCollapsed(!collapsed)} className="text-ink-400 hover:text-white transition-colors lg:hidden">
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-sm font-medium text-white capitalize">
                {location.pathname === '/admin' ? 'Dashboard' : location.pathname.replace('/admin/', '')}
              </h1>
              <p className="text-xs text-ink-500">japanese International — Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin/notifications" className="relative text-ink-400 hover:text-white transition-colors">
              <Bell size={17} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </Link>
            <Link to="/" className="text-xs text-ink-500 hover:text-white transition-colors">
              ← Public Site
            </Link>
          </div>
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
