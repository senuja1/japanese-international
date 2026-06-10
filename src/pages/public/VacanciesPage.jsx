import React, { useState } from 'react'
import { MapPin, Briefcase, DollarSign, Phone, Download, Search, Filter, ExternalLink } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const VACANCIES = [
  {
    id: 1, company: 'Yamamoto Manufacturing', location: 'Osaka, Japan', role: 'Production Line Operator',
    salary: '¥200,000 – ¥240,000', level: 'N4', type: 'Full-time', seats: 8, status: 'Open',
    desc: 'Operating manufacturing equipment and quality control. Japanese communication in workplace setting required.'
  },
  {
    id: 2, company: 'Sakura Care Services', location: 'Tokyo, Japan', role: 'Care Worker (介護)',
    salary: '¥220,000 – ¥260,000', level: 'N3', type: 'Full-time', seats: 4, status: 'Open',
    desc: 'Elderly care services in licensed care facility. N3 minimum with care certification preferred.'
  },
  {
    id: 3, company: 'Fujita Construction', location: 'Nagoya, Japan', role: 'Construction Technician',
    salary: '¥230,000 – ¥280,000', level: 'N4', type: 'Full-time', seats: 12, status: 'Open',
    desc: 'Civil and building construction. CDL certification is an advantage. Team-based work environment.'
  },
  {
    id: 4, company: 'Tanaka Foods', location: 'Kyoto, Japan', role: 'Food Processing Staff',
    salary: '¥180,000 – ¥210,000', level: 'N5', type: 'Full-time', seats: 6, status: 'Open',
    desc: 'Food manufacturing and packaging operations. Entry-level friendly with Japanese training provided.'
  },
  {
    id: 5, company: 'Hiroshi Logistics', location: 'Yokohama, Japan', role: 'Delivery Driver (CDL)',
    salary: '¥260,000 – ¥320,000', level: 'N3', type: 'Full-time', seats: 3, status: 'Filling',
    desc: 'CDL/Patrol vehicle operation for logistics company. Valid driving license mandatory. High pay role.'
  },
  {
    id: 6, company: 'Online Interview Practice', location: 'Virtual', role: 'Mock Interview Session',
    salary: 'Free for enrolled students', level: 'All', type: 'Practice', seats: 20, status: 'Open',
    desc: 'Weekly online practice interview sessions conducted by HR professionals. Register via student portal.'
  },
]

const INTERVIEW_TIPS = [
  'Dress formally even for online interviews',
  'Greet with proper Japanese phrase: よろしくお願いします',
  'Have your JLPT certificate visible if online',
  'Speak slowly and clearly — confidence matters',
  'Research the company before your interview',
]

export default function VacanciesPage() {
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [selectedVacancy, setSelectedVacancy] = useState(null)
  const [applied, setApplied] = useState([])

  const filtered = VACANCIES.filter(v => {
    const matchSearch = v.company.toLowerCase().includes(search.toLowerCase()) ||
      v.role.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase())
    const matchLevel = levelFilter === 'All' || v.level === levelFilter || v.level === 'All'
    return matchSearch && matchLevel
  })

  const handleApply = (id) => {
    setApplied(prev => [...prev, id])
    setSelectedVacancy(null)
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="section-label">Career Opportunities</span>
            <h1 className="page-title mt-3 mb-4">Available Vacancies</h1>
            <p className="text-ink-300 text-base max-w-xl">
              Live job listings from our Japan partner companies. Updated weekly. Contact our office or apply via call to proceed.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-9"
                placeholder="Search company, role, location..."
              />
            </div>
            <select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              className="input-field w-auto min-w-[140px]"
            >
              {['All', 'N5', 'N4', 'N3', 'N2', 'N1'].map(l => (
                <option key={l} value={l}>Level: {l}</option>
              ))}
            </select>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
            {filtered.map((v) => (
              <div key={v.id} className={`card hover:border-ink-700 transition-all duration-200 cursor-pointer ${selectedVacancy?.id === v.id ? 'border-primary-600/60' : ''}`}
                onClick={() => setSelectedVacancy(v)}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{v.role}</h3>
                    <p className="text-xs text-ink-400 mt-0.5">{v.company}</p>
                  </div>
                  <span className={`badge ${v.status === 'Open' ? 'badge-green' : 'badge-yellow'} shrink-0`}>
                    {v.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-ink-400 mb-3">
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-primary-500" />{v.location}</span>
                  <span className="flex items-center gap-1"><DollarSign size={11} className="text-primary-500" />{v.salary}</span>
                  <span className="flex items-center gap-1"><Briefcase size={11} className="text-primary-500" />{v.type}</span>
                </div>
                <p className="text-xs text-ink-400 leading-relaxed line-clamp-2">{v.desc}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-ink-800">
                  <div className="flex gap-3">
                    <span className="badge badge-blue">Level {v.level}</span>
                    <span className="text-xs text-ink-500">{v.seats} seats</span>
                  </div>
                  {applied.includes(v.id) ? (
                    <span className="text-xs text-emerald-400 flex items-center gap-1">
                      ✓ Applied
                    </span>
                  ) : (
                    <button
                      onClick={e => { e.stopPropagation(); handleApply(v.id) }}
                      className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1"
                    >
                      <Phone size={11} /> Apply via Call
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Interview Info & Tips */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="font-semibold text-white mb-4 text-sm">Online Interview Practice</h3>
              <p className="text-sm text-ink-400 mb-4 leading-relaxed">
                Weekly mock interview sessions are available free of charge for all enrolled students.
                Our HR professionals simulate real Japanese company interview scenarios.
              </p>
              <ul className="space-y-2 mb-5">
                {INTERVIEW_TIPS.map(tip => (
                  <li key={tip} className="text-xs text-ink-400 flex items-start gap-2">
                    <span className="text-primary-500 mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
              <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-4 py-2.5">
                Register for Practice Session
              </a>
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-4 text-sm">Job Offer Documentation</h3>
              <p className="text-sm text-ink-400 mb-4 leading-relaxed">
                For shortlisted candidates, we provide official job offer PDF documents with full company details and contract terms.
              </p>
              <div className="space-y-3">
                {['Application Form (EN)', 'Application Form (JP)', 'Visa Requirements Guide', 'Medical Fitness Form'].map(doc => (
                  <div key={doc} className="flex items-center justify-between p-3 bg-ink-800 rounded-sm">
                    <span className="text-xs text-ink-300">{doc}</span>
                    <button className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
                      <Download size={12} /> PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
