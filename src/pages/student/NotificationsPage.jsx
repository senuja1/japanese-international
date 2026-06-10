import React, { useEffect, useState } from 'react'
import { Bell, Check, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import {
  getNotificationsForUser,
  getUnreadCountForUser,
  hideNotification,
  markNotificationRead,
} from '../../services/portalStore'

const TYPE_COLORS = {
  exam: 'badge-red',
  vacancy: 'badge-blue',
  schedule: 'badge-green',
  event: 'badge-yellow',
  content: 'badge-blue',
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifs, setNotifs] = useState([])
  const [unread, setUnread] = useState(0)

  const refresh = () => {
    if (!user?.id) return
    const next = getNotificationsForUser(user.id)
    setNotifs(next)
    setUnread(getUnreadCountForUser(user.id))
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const markRead = (id) => {
    if (!user?.id) return
    markNotificationRead(user.id, id)
    refresh()
  }

  const markAllRead = () => {
    if (!user?.id) return
    notifs.filter(n => !n.read).forEach(n => markNotificationRead(user.id, n.id))
    refresh()
  }

  const remove = (id) => {
    if (!user?.id) return
    hideNotification(user.id, id)
    refresh()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-white">Notifications</h2>
          <p className="text-xs text-ink-500 mt-0.5">{unread} unread · {notifs.length} total</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1">
            <Check size={12} /> Mark all read
          </button>
        )}
      </div>

      {notifs.length === 0 ? (
        <div className="card py-16 text-center">
          <Bell size={32} className="text-ink-700 mx-auto mb-3" />
          <p className="text-sm text-ink-500">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifs.map(n => (
            <div key={n.id} className={`bg-ink-900 border rounded-sm p-5 transition-all duration-200 ${n.read ? 'border-ink-800' : 'border-primary-600/30'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${n.read ? 'bg-ink-700' : 'bg-primary-500 animate-pulse'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`text-sm font-medium ${n.read ? 'text-ink-300' : 'text-white'}`}>{n.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`badge ${TYPE_COLORS[n.type] || 'badge-blue'} text-[10px]`}>{n.type}</span>
                    </div>
                  </div>
                  <p className="text-xs text-ink-400 leading-relaxed mb-2">{n.body}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-ink-600">{n.date}</span>
                    <div className="flex gap-3">
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="text-[10px] text-primary-400 hover:text-primary-300 flex items-center gap-0.5 transition-colors">
                          <Check size={10} /> Mark read
                        </button>
                      )}
                      <button onClick={() => remove(n.id)} className="text-[10px] text-ink-600 hover:text-red-400 transition-colors">
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
