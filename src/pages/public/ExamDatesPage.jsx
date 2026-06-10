import React, { useState } from 'react'
import { Calendar, Clock, MapPin, AlertCircle, Download, ExternalLink } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const JLPT_DATES = [
  { id: 1, exam: 'JLPT N5', date: 'July 6, 2025', deadline: 'April 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 120 },
  { id: 2, exam: 'JLPT N4', date: 'July 6, 2025', deadline: 'April 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 80 },
  { id: 3, exam: 'JLPT N3', date: 'July 6, 2025', deadline: 'April 30, 2025', venue: 'University of Colombo', status: 'Limited', seats: 40 },
  { id: 4, exam: 'JLPT N2', date: 'July 6, 2025', deadline: 'April 30, 2025', venue: 'University of Colombo', status: 'Limited', seats: 25 },
  { id: 5, exam: 'JLPT N1', date: 'July 6, 2025', deadline: 'April 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 30 },
  { id: 6, exam: 'JLPT N5', date: 'December 7, 2025', deadline: 'September 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 150 },
  { id: 7, exam: 'JLPT N4', date: 'December 7, 2025', deadline: 'September 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 100 },
  { id: 8, exam: 'JLPT N3', date: 'December 7, 2025', deadline: 'September 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 60 },
  { id: 9, exam: 'JLPT N2', date: 'December 7, 2025', deadline: 'September 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 40 },
  { id: 10, exam: 'JLPT N1', date: 'December 7, 2025', deadline: 'September 30, 2025', venue: 'University of Colombo', status: 'Open', seats: 35 },
]

const CELI_DATES = [
  { id: 1, exam: 'CELI 1', date: 'June 12, 2025', deadline: 'April 15, 2025', venue: 'japanese HQ, Colombo', status: 'Open', seats: 30 },
  { id: 2, exam: 'CELI 2', date: 'June 12, 2025', deadline: 'April 15, 2025', venue: 'japanese HQ, Colombo', status: 'Open', seats: 25 },
  { id: 3, exam: 'CELI 3', date: 'October 9, 2025', deadline: 'August 20, 2025', venue: 'japanese HQ, Colombo', status: 'Open', seats: 20 },
]

const JPT_DATES = [
  { id: 1, exam: 'JPT Business', date: 'Monthly', deadline: 'Rolling', venue: 'Online + Colombo', status: 'Open', seats: 50 },
]

export default function ExamDatesPage() {
  const [activeTab, setActiveTab] = useState('JLPT')

  const TABS = [
    { id: 'JLPT', label: 'JLPT', data: JLPT_DATES },
    { id: 'CELI', label: 'CELI', data: CELI_DATES },
    { id: 'JPT', label: 'JPT', data: JPT_DATES },
  ]

  const activeData = TABS.find(t => t.id === activeTab)?.data || []

  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="section-label">Examinations</span>
            <h1 className="page-title mt-3 mb-4">Exam Dates & Registration</h1>
            <p className="text-ink-300 text-base leading-relaxed">
              Official examination dates for JLPT, CELI, and JPT held in Sri Lanka.
              Register early — seats fill up fast. Japanese students receive priority registration.
            </p>
          </div>

          {/* Alert */}
          <div className="flex items-start gap-3 bg-amber-900/20 border border-amber-800/40 rounded-sm p-4 mb-10 max-w-2xl">
            <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/80">
              Exam registration deadlines are strict. Japanese helps enrolled students with the full registration process — contact us 2 months before the deadline.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-ink-900 border border-ink-800 rounded-sm p-1 w-fit mb-8">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 text-sm font-medium rounded-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-ink-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-800 bg-ink-900/80">
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase">Exam</th>
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase">Date</th>
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase hidden sm:table-cell">Reg. Deadline</th>
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase hidden md:table-cell">Venue</th>
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase">Status</th>
                    <th className="text-left px-5 py-3.5 text-xs font-mono tracking-widest text-ink-500 uppercase hidden lg:table-cell">Seats</th>
                  </tr>
                </thead>
                <tbody>
                  {activeData.map((row) => (
                    <tr key={row.id} className="table-row">
                      <td className="px-5 py-4 font-medium text-white">{row.exam}</td>
                      <td className="px-5 py-4 text-ink-300">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-primary-500" />
                          {row.date}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400 hidden sm:table-cell">{row.deadline}</td>
                      <td className="px-5 py-4 text-ink-400 hidden md:table-cell">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-ink-600" />
                          {row.venue}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge ${
                          row.status === 'Open' ? 'badge-green' :
                          row.status === 'Limited' ? 'badge-yellow' : 'badge-red'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-ink-400 hidden lg:table-cell">{row.seats}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Clock,
                title: 'How to Register',
                points: ['Contact Japanese at least 2 months before deadline', 'Submit copies of NIC & certificates', 'Pay exam fee via bank transfer', 'Receive confirmation letter from us'],
              },
              {
                icon: Download,
                title: 'Prep Materials',
                points: ['JLPT Official Sample Questions', 'CELI Past Papers Pack', 'Vocabulary & Kanji Lists', 'Listening Practice Audio'],
              },
              {
                icon: ExternalLink,
                title: 'Official Resources',
                points: ['jlpt.jp — Official JLPT Site', 'cvcl.it — CELI Authority', 'Language Testing International', 'Ministry of Education Japan'],
              },
            ].map(({ icon: Icon, title, points }) => (
              <div key={title} className="card">
                <Icon size={18} className="text-primary-500 mb-3" />
                <h3 className="font-semibold text-white text-sm mb-3">{title}</h3>
                <ul className="space-y-1.5">
                  {points.map(p => (
                    <li key={p} className="text-xs text-ink-400 flex items-start gap-2">
                      <span className="text-primary-600 mt-0.5">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
