import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Globe } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  {
    label: 'Programs',
    children: [
      { label: 'JLPT Preparation', href: '/exam-dates' },
      { label: 'CELI Examinations', href: '/exam-dates' },
      { label: 'Enrollment Process', href: '/process' },
      { label: 'Class Start Dates', href: '/class-dates' },
    ],
  },
  { label: 'Vacancies', href: '/vacancies' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(null)
  }, [location])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-ink-950/95 backdrop-blur-md border-b border-ink-800 py-3' : 'py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-primary-600 rounded-sm flex items-center justify-center">
            <span className="font-japanese text-white text-xs font-medium">明</span>
          </div>
          <div>
            <div className="font-display font-bold text-white text-lg leading-none">japanese</div>
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-500 leading-none mt-0.5">International</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="nav-link flex items-center gap-1">
                  {item.label}
                  <ChevronDown size={13} className={`transition-transform duration-200 ${dropdownOpen === item.label ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen === item.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-ink-900 border border-ink-700 rounded-sm shadow-2xl py-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        to={child.href}
                        className="block px-4 py-2.5 text-sm font-body text-ink-300 hover:text-white hover:bg-ink-800 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`nav-link ${location.pathname === item.href ? 'text-white' : ''}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/login" className="btn-outline text-xs px-4 py-2">
            Student Login
          </Link>
          <Link to="/process" className="btn-primary text-xs px-4 py-2">
            Enroll Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-ink-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-ink-900 border-t border-ink-800 mt-2">
          <nav className="px-6 py-4 space-y-1">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <div className="text-sm text-ink-500 py-2 font-medium">{item.label}</div>
                  {item.children.map((child) => (
                    <Link key={child.label} to={child.href} className="block text-sm text-ink-300 py-2 pl-3 hover:text-white transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.label} to={item.href} className="block text-sm text-ink-300 py-2 hover:text-white transition-colors">
                  {item.label}
                </Link>
              )
            )}
            <div className="pt-4 flex flex-col gap-2">
              <Link to="/login" className="btn-outline text-sm justify-center">Student Login</Link>
              <Link to="/process" className="btn-primary text-sm justify-center">Enroll Now</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
