import React, { useEffect, useState } from 'react'
import { Plus, Trash2, Send, X } from 'lucide-react'
import { dateISO, getAnnouncements, setAnnouncementsItems } from '../../services/portalStore'

const TYPE_COLORS = {
  exam: 'badge-red',
  vacancy: 'badge-blue',
  schedule: 'badge-green',
  event: 'badge-yellow',
  content: 'badge-blue',
}

export default function AdminNotifications() {
  const [notifs, setNotifs] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newNotif, setNewNotif] = useState({ title: '', body: '', type: 'schedule' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setNotifs(getAnnouncements().items)
  }, [])

  const handleSend = () => {
    const n = {
      id: Date.now(),
      ...newNotif,
      date: dateISO(),
    }
    const next = [n, ...notifs]
    setNotifs(next)
    setAnnouncementsItems(next)
    setNewNotif({ title: '', body: '', type: 'schedule' })
    setSent(true)
    setShowAdd(false)
    setTimeout(() => setSent(false), 3000)
  }

  const handleDelete = (id) => {
    const next = notifs.filter(x => x.id !== id)
    setNotifs(next)
    setAnnouncementsItems(next)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Student Notifications</h2>
          <p className="text-xs text-ink-500 mt-0.5">Broadcast announcements to all students via the portal</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-xs px-3 py-2"><Plus size={13} /> New Notification</button>
      </div>

      {sent && (
        <div className="flex items-center gap-2 bg-emerald-900/30 border border-emerald-800/40 rounded-sm px-4 py-3">
          <Send size={14} className="text-emerald-400" />
          <span className="text-sm text-emerald-300">Notification sent to all students successfully!</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Announcements', value: notifs.length },
          { label: 'Latest', value: notifs[0]?.title ? 1 : 0 },
          { label: 'This Month', value: notifs.filter(n => String(n.date || '').startsWith(String(new Date().getFullYear()))).length },
        ].map(({ label, value }) => (
          <div key={label} className="stat-card text-center py-4">
            <div className="text-xl font-display font-bold text-white">{value}</div>
            <div className="text-xs text-ink-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifs.map(n => (
          <div key={n.id} className={`bg-ink-900 border rounded-sm p-4 transition-colors border-primary-600/20`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-start gap-2.5">
                <div className="notification-dot mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm font-medium text-white">{n.title}</div>
                  <p className="text-xs text-ink-400 mt-1 leading-relaxed">{n.body}</p>
                </div>
              </div>
              <button onClick={() => handleDelete(n.id)} className="text-ink-600 hover:text-red-400 transition-colors shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-ink-600">{n.date}</span>
              <span className={`badge ${TYPE_COLORS[n.type] || 'badge-blue'} text-[10px]`}>{n.type}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md bg-ink-900 border border-ink-700 rounded-sm p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Broadcast Notification</h3>
              <button onClick={() => setShowAdd(false)} className="text-ink-400 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-ink-500 mb-1">Type</label>
                <select value={newNotif.type} onChange={e => setNewNotif({ ...newNotif, type: e.target.value })} className="input-field text-xs">
                  {Object.keys(TYPE_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-ink-500 mb-1">Title</label>
                <input value={newNotif.title} onChange={e => setNewNotif({ ...newNotif, title: e.target.value })} className="input-field text-xs" placeholder="Notification title" />
              </div>
              <div>
                <label className="block text-xs text-ink-500 mb-1">Message</label>
                <textarea value={newNotif.body} onChange={e => setNewNotif({ ...newNotif, body: e.target.value })}
                  className="input-field text-xs resize-none" rows={4} placeholder="Full notification message..." />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setShowAdd(false)} className="btn-outline flex-1 text-xs py-2 justify-center">Cancel</button>
              <button onClick={handleSend} disabled={!newNotif.title || !newNotif.body}
                className="btn-primary flex-1 text-xs py-2 justify-center disabled:opacity-50">
                <Send size={13} /> Send to All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
