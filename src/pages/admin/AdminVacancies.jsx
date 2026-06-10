import React, { useState } from 'react'
import { Briefcase, Plus, Trash2, Eye, X, MapPin, DollarSign } from 'lucide-react'

const INITIAL_VACANCIES = [
  { id: 1, company: 'Yamamoto Manufacturing', role: 'Production Operator', location: 'Osaka', salary: '¥200K–240K', level: 'N4', seats: 8, status: 'Open' },
  { id: 2, company: 'Sakura Care Services', role: 'Care Worker', location: 'Tokyo', salary: '¥220K–260K', level: 'N3', seats: 4, status: 'Open' },
  { id: 3, company: 'Fujita Construction', role: 'Construction Technician', location: 'Nagoya', salary: '¥230K–280K', level: 'N4', seats: 12, status: 'Open' },
  { id: 4, company: 'Hiroshi Logistics', role: 'CDL Driver', location: 'Yokohama', salary: '¥260K–320K', level: 'N3', seats: 3, status: 'Filling' },
]

export default function AdminVacancies() {
  const [vacancies, setVacancies] = useState(INITIAL_VACANCIES)
  const [showAdd, setShowAdd] = useState(false)
  const [newV, setNewV] = useState({ company: '', role: '', location: '', salary: '', level: 'N4', seats: 1, status: 'Open' })

  const handleAdd = () => {
    setVacancies(p => [...p, { id: Date.now(), ...newV }])
    setNewV({ company: '', role: '', location: '', salary: '', level: 'N4', seats: 1, status: 'Open' })
    setShowAdd(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Vacancy Management</h2>
          <p className="text-xs text-ink-500 mt-0.5">Manage live job listings from Japan partner companies</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs px-3 py-2"><Plus size={13} /> Add Vacancy</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active Listings', value: vacancies.filter(v => v.status !== 'Closed').length },
          { label: 'Total Seats', value: vacancies.reduce((s, v) => s + Number(v.seats), 0) },
          { label: 'Partner Companies', value: new Set(vacancies.map(v => v.company)).size },
        ].map(({ label, value }) => (
          <div key={label} className="stat-card text-center py-4">
            <div className="text-xl font-display font-bold text-white">{value}</div>
            <div className="text-xs text-ink-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink-800">
                {['Company', 'Role', 'Location', 'Salary', 'Level', 'Seats', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-mono tracking-widest text-ink-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vacancies.map(v => (
                <tr key={v.id} className="table-row">
                  <td className="px-4 py-3 text-xs font-medium text-white">{v.company}</td>
                  <td className="px-4 py-3 text-xs text-ink-300">{v.role}</td>
                  <td className="px-4 py-3 text-xs text-ink-400">
                    <span className="flex items-center gap-1"><MapPin size={10} />{v.location}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-ink-400">{v.salary}</td>
                  <td className="px-4 py-3"><span className="badge badge-blue text-[10px]">{v.level}</span></td>
                  <td className="px-4 py-3 text-xs text-ink-400">{v.seats}</td>
                  <td className="px-4 py-3">
                    <span className={`badge text-[10px] ${v.status === 'Open' ? 'badge-green' : v.status === 'Filling' ? 'badge-yellow' : 'badge-red'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setVacancies(p => p.filter(x => x.id !== v.id))}
                      className="text-ink-500 hover:text-red-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-lg bg-ink-900 border border-ink-700 rounded-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Add New Vacancy</h3>
              <button onClick={() => setShowAdd(false)} className="text-ink-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Company</label>
                  <input value={newV.company} onChange={e => setNewV({ ...newV, company: e.target.value })} className="input-field text-xs" placeholder="Company name" />
                </div>
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Role</label>
                  <input value={newV.role} onChange={e => setNewV({ ...newV, role: e.target.value })} className="input-field text-xs" placeholder="Job role" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Location</label>
                  <input value={newV.location} onChange={e => setNewV({ ...newV, location: e.target.value })} className="input-field text-xs" placeholder="City, Japan" />
                </div>
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Salary Range</label>
                  <input value={newV.salary} onChange={e => setNewV({ ...newV, salary: e.target.value })} className="input-field text-xs" placeholder="¥ range" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Min. Level</label>
                  <select value={newV.level} onChange={e => setNewV({ ...newV, level: e.target.value })} className="input-field text-xs">
                    {['N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Seats</label>
                  <input type="number" min={1} value={newV.seats} onChange={e => setNewV({ ...newV, seats: e.target.value })} className="input-field text-xs" />
                </div>
                <div>
                  <label className="block text-xs text-ink-500 mb-1">Status</label>
                  <select value={newV.status} onChange={e => setNewV({ ...newV, status: e.target.value })} className="input-field text-xs">
                    {['Open', 'Filling', 'Closed'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowAdd(false)} className="btn-outline flex-1 text-xs py-2 justify-center">Cancel</button>
              <button onClick={handleAdd} disabled={!newV.company || !newV.role}
                className="btn-primary flex-1 text-xs py-2 justify-center disabled:opacity-50">Add Vacancy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
