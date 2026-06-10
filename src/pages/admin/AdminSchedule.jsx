// AdminSchedule.jsx
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Plus, Trash2, Edit, CheckCircle2 } from 'lucide-react'

const INITIAL_EVENTS = [
  { id: 1, title: 'April 2025 Intake — First Class', date: '2025-04-07', time: '8:00 AM', type: 'Class Start', location: 'Colombo', level: 'N5' },
  { id: 2, title: 'JLPT Registration Deadline', date: '2025-04-30', time: 'EOD', type: 'Exam', location: 'Online', level: 'All' },
  { id: 3, title: 'Mock Interview Session', date: '2025-03-29', time: '10:00 AM', type: 'Event', location: 'Zoom', level: 'All' },
  { id: 4, title: 'Holiday — Sinhala & Tamil New Year', date: '2025-04-13', time: 'Full Day', type: 'Holiday', location: '—', level: 'All' },
  { id: 5, title: 'JLPT July Exam', date: '2025-07-06', time: '9:00 AM', type: 'Exam', location: 'Colombo University', level: 'All' },
  { id: 6, title: 'September 2025 Intake', date: '2025-09-01', time: '8:00 AM', type: 'Class Start', location: 'Colombo & Online', level: 'All' },
]

function AdminSchedule() {
  const [events, setEvents] = useState(INITIAL_EVENTS)
  const [showAdd, setShowAdd] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', type: 'Class Start', location: '', level: 'All' })
  const [filterType, setFilterType] = useState('All')

  const filtered = filterType === 'All' ? events : events.filter(e => e.type === filterType)
  const sorted = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date))

  const typeColor = t => ({
    'Class Start': 'badge-green',
    'Exam': 'badge-red',
    'Event': 'badge-blue',
    'Holiday': 'badge-yellow',
  }[t] || 'badge-blue')

  const handleAdd = () => {
    setEvents(p => [...p, { id: Date.now(), ...newEvent }])
    setNewEvent({ title: '', date: '', time: '', type: 'Class Start', location: '', level: 'All' })
    setShowAdd(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Schedule & Important Dates</h2>
          <p className="text-xs text-ink-500 mt-0.5">Class start dates, exam dates, holidays, and system updates</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs px-3 py-2"><Plus size={13} /> Add Event</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['All', 'Class Start', 'Exam', 'Event', 'Holiday'].map(t => (
          <button key={t} onClick={() => setFilterType(t)}
            className={`px-3 py-1 text-xs rounded-full border transition-all ${filterType === t ? 'bg-primary-600 border-primary-500 text-white' : 'border-ink-700 text-ink-400 hover:text-white hover:border-ink-600'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {sorted.map(event => (
          <div key={event.id} className="bg-ink-900 border border-ink-800 rounded-sm p-4 flex items-center gap-4 hover:border-ink-700 transition-colors">
            <div className="w-12 text-center shrink-0">
              <div className="font-mono text-[10px] text-ink-500">{event.date.split('-')[0]}</div>
              <div className="font-display text-lg font-bold text-white leading-none">
                {new Date(event.date).toLocaleDateString('en', { day: '2-digit' })}
              </div>
              <div className="font-mono text-[10px] text-primary-400">
                {new Date(event.date).toLocaleDateString('en', { month: 'short' }).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{event.title}</div>
              <div className="flex items-center gap-4 mt-1 text-[10px] text-ink-400">
                <span className="flex items-center gap-1"><Clock size={10} />{event.time}</span>
                <span className="flex items-center gap-1"><MapPin size={10} />{event.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className={`badge ${typeColor(event.type)} text-[10px]`}>{event.type}</span>
              <button onClick={() => setEvents(p => p.filter(e => e.id !== event.id))} className="text-ink-500 hover:text-red-400 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md bg-ink-900 border border-ink-700 rounded-sm p-5" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-white mb-4">Add Event / Date</h3>
            <div className="space-y-3">
              <input value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} className="input-field text-xs" placeholder="Event title" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} className="input-field text-xs" />
                <input value={newEvent.time} onChange={e => setNewEvent({ ...newEvent, time: e.target.value })} className="input-field text-xs" placeholder="Time (e.g. 9:00 AM)" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={newEvent.type} onChange={e => setNewEvent({ ...newEvent, type: e.target.value })} className="input-field text-xs">
                  {['Class Start', 'Exam', 'Event', 'Holiday'].map(t => <option key={t}>{t}</option>)}
                </select>
                <input value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} className="input-field text-xs" placeholder="Location" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowAdd(false)} className="btn-outline flex-1 text-xs py-2 justify-center">Cancel</button>
              <button onClick={handleAdd} disabled={!newEvent.title || !newEvent.date} className="btn-primary flex-1 text-xs py-2 justify-center disabled:opacity-50">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSchedule
