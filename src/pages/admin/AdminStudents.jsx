import React, { useState } from 'react'
import { Search, UserPlus, Download, Eye, Edit, Trash2, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { MOCK_STUDENTS } from '../../utils/mockData'

const LEVELS = ['All', 'N5', 'N4', 'N3', 'N2', 'N1']
const STATUSES = ['All', 'Active', 'Inactive', 'Graduated']

function StudentModal({ student, onClose }) {
  if (!student) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg bg-ink-900 border border-ink-700 rounded-sm p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-white">Student Profile</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-white transition-colors"><X size={18} /></button>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-600 to-ink-700 flex items-center justify-center text-xl font-bold text-white shrink-0">
            {student.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-white">{student.name}</div>
            <div className="text-xs text-ink-500">{student.email}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`badge ${student.status === 'Active' ? 'badge-green' : student.status === 'Graduated' ? 'badge-blue' : 'badge-yellow'} text-[10px]`}>
                {student.status}
              </span>
              <span className="badge badge-blue text-[10px]">Level {student.level}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            ['Student ID', student.id],
            ['Phone', student.phone],
            ['Enrolled', student.enrolled],
            ['Intake', student.intake],
            ['Progress', `${student.progress}%`],
          ].map(([label, val]) => (
            <div key={label} className="bg-ink-800 rounded-sm p-3">
              <div className="text-[10px] text-ink-500 mb-0.5">{label}</div>
              <div className="text-xs text-white font-medium">{val}</div>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-ink-500">Course Progress</span>
            <span className="text-white">{student.progress}%</span>
          </div>
          <div className="h-2 bg-ink-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full progress-bar" style={{ width: `${student.progress}%` }} />
          </div>
        </div>
        <button onClick={onClose} className="btn-outline w-full justify-center text-sm">Close</button>
      </div>
    </div>
  )
}

export default function AdminStudents() {
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [page, setPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStudent, setNewStudent] = useState({ name: '', email: '', level: 'N5', phone: '' })
  const PER_PAGE = 6

  const filtered = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
    const matchLevel = levelFilter === 'All' || s.level === levelFilter
    const matchStatus = statusFilter === 'All' || s.status === statusFilter
    return matchSearch && matchLevel && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleAddStudent = () => {
    const id = `S${String(students.length + 1).padStart(3, '0')}`
    setStudents(prev => [...prev, {
      ...newStudent,
      id,
      intake: 'April 2025',
      status: 'Active',
      progress: 0,
      enrolled: new Date().toISOString().split('T')[0],
    }])
    setNewStudent({ name: '', email: '', level: 'N5', phone: '' })
    setShowAddModal(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold text-white">Student Management</h2>
          <p className="text-xs text-ink-500 mt-0.5">{filtered.length} students</p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline text-xs px-3 py-2 gap-1.5"><Download size={13} /> Export</button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary text-xs px-3 py-2"><UserPlus size={13} /> Add Student</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} className="input-field pl-8 text-xs" placeholder="Search students..." />
        </div>
        <select value={levelFilter} onChange={e => { setLevelFilter(e.target.value); setPage(1) }} className="input-field text-xs w-auto">
          {LEVELS.map(l => <option key={l} value={l}>Level: {l}</option>)}
        </select>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1) }} className="input-field text-xs w-auto">
          {STATUSES.map(s => <option key={s} value={s}>Status: {s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-800">
                {['Student', 'ID', 'Level', 'Progress', 'Intake', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-ink-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-sm text-ink-500">No students found</td></tr>
              ) : paginated.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-700 to-ink-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {s.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{s.name}</div>
                        <div className="text-[10px] text-ink-500">{s.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-ink-400">{s.id}</td>
                  <td className="px-4 py-3"><span className="badge badge-blue text-[10px]">{s.level}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1 bg-ink-700 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${s.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-ink-400">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-400">{s.intake}</td>
                  <td className="px-4 py-3">
                    <span className={`badge ${s.status === 'Active' ? 'badge-green' : s.status === 'Graduated' ? 'badge-blue' : 'badge-yellow'} text-[10px]`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedStudent(s)} className="p-1 text-ink-400 hover:text-white transition-colors"><Eye size={14} /></button>
                      <button className="p-1 text-ink-400 hover:text-white transition-colors"><Edit size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-ink-800">
            <span className="text-xs text-ink-500">Page {page} of {totalPages}</span>
            <div className="flex gap-1">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="p-1.5 rounded text-ink-400 hover:text-white disabled:opacity-30 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="p-1.5 rounded text-ink-400 hover:text-white disabled:opacity-30 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      <StudentModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAddModal(false)}>
          <div className="w-full max-w-md bg-ink-900 border border-ink-700 rounded-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-white text-sm">Add New Student</h3>
              <button onClick={() => setShowAddModal(false)} className="text-ink-400 hover:text-white"><X size={17} /></button>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Student full name' },
                { label: 'Email', key: 'email', placeholder: 'student@email.com', type: 'email' },
                { label: 'Phone', key: 'phone', placeholder: '+94 XX XXX XXXX' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs text-ink-500 mb-1">{label}</label>
                  <input type={type || 'text'} value={newStudent[key]} onChange={e => setNewStudent({ ...newStudent, [key]: e.target.value })}
                    className="input-field text-xs" placeholder={placeholder} />
                </div>
              ))}
              <div>
                <label className="block text-xs text-ink-500 mb-1">Level</label>
                <select value={newStudent.level} onChange={e => setNewStudent({ ...newStudent, level: e.target.value })} className="input-field text-xs">
                  {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowAddModal(false)} className="btn-outline flex-1 justify-center text-xs py-2">Cancel</button>
              <button onClick={handleAddStudent} disabled={!newStudent.name || !newStudent.email}
                className="btn-primary flex-1 justify-center text-xs py-2 disabled:opacity-50">Add Student</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
