import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, Download, FileQuestion, Bell, ArrowRight, TrendingUp, Award } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../../context/AuthContext'
import { PROGRESS_CHART_DATA } from '../../utils/mockData'
import {
  getContent,
  getDownloadedIdsForUser,
  getNotificationsForUser,
  getTestResultsForUser,
  getVideosWatchedIdsForUser,
} from '../../services/portalStore'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-ink-800 border border-ink-700 rounded-sm px-3 py-2 text-xs">
        <p className="text-ink-400">{label}</p>
        <p className="text-white font-medium">{payload[0].value}% score</p>
      </div>
    )
  }
  return null
}

const QUICK_LINKS = [
  { icon: Video, label: 'Video Lessons', href: '/student/lessons', desc: 'Watch recorded classes' },
  { icon: Download, label: 'Downloads', href: '/student/downloads', desc: 'PDFs & past papers' },
  { icon: FileQuestion, label: 'MCQ Tests', href: '/student/tests', desc: 'Practice questions' },
  { icon: Bell, label: 'Notifications', href: '/student/notifications', desc: 'Announcements' },
]

export default function StudentDashboard() {
  const { user } = useAuth()

  const [notifications, setNotifications] = useState([])
  const [videos, setVideos] = useState([])
  const [downloadsIds, setDownloadsIds] = useState([])
  const [videosWatchedIds, setVideosWatchedIds] = useState([])
  const [testResults, setTestResults] = useState([])

  useEffect(() => {
    if (!user?.id) return
    const content = getContent()
    setVideos(content.videos)
    setNotifications(getNotificationsForUser(user.id))
    setDownloadsIds(getDownloadedIdsForUser(user.id))
    setVideosWatchedIds(getVideosWatchedIdsForUser(user.id))
    setTestResults(getTestResultsForUser(user.id))
  }, [user?.id])

  const recentNotifs = useMemo(() => notifications.filter(n => !n.read).slice(0, 3), [notifications])
  const recentVideos = useMemo(
    () => videos.filter(v => v.level === user?.level || v.level === 'N5').slice(0, 3),
    [videos, user?.level]
  )

  const upcoming = useMemo(() => {
    const typeToUi = (t) => {
      if (t === 'exam') return 'exam'
      if (t === 'schedule') return 'class'
      if (t === 'event') return 'event'
      return 'class'
    }
    return notifications
      .filter(n => ['exam', 'schedule', 'event'].includes(n.type))
      .slice(0, 3)
      .map(n => ({
        label: n.title,
        value: n.date,
        type: typeToUi(n.type),
      }))
  }, [notifications])

  const stats = useMemo(() => {
    const testsTaken = testResults.length
    const avgPct =
      testsTaken === 0 ? null : Math.round(testResults.reduce((s, r) => s + (r.pct || 0), 0) / testsTaken)
    return {
      testsTaken,
      avgPct,
      videosWatched: videosWatchedIds.length,
      downloads: downloadsIds.length,
    }
  }, [testResults, videosWatchedIds.length, downloadsIds.length])

  const progressChartData = useMemo(() => {
    if (!testResults.length) return PROGRESS_CHART_DATA
    const sorted = [...testResults].sort((a, b) => (b.submittedAt || '').localeCompare(a.submittedAt || ''))
    const last = sorted.slice(0, 6).reverse()
    const month = (iso) => {
      const d = new Date(iso)
      return d.toLocaleString(undefined, { month: 'short' })
    }
    return last.map(r => ({ month: month(r.submittedAt), score: r.pct }))
  }, [testResults])

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary-900/30 to-ink-900 border border-primary-800/20 rounded-sm p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs text-ink-500 mb-1">Welcome back</div>
            <h2 className="font-display text-xl font-bold text-white">{user?.name}</h2>
            <p className="text-xs text-ink-400 mt-1">
              Current level: <span className="text-primary-400 font-medium">JLPT {user?.level}</span> · Enrolled {user?.enrolled}
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-xl font-bold text-white shrink-0">
            {user?.avatar}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-ink-400">Course Progress</span>
            <span className="text-white font-medium">{user?.progress}%</span>
          </div>
          <div className="h-2 bg-ink-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full progress-bar"
              style={{ width: `${user?.progress}%` }}
            />
          </div>
          <div className="text-[10px] text-ink-600 mt-1">{100 - user?.progress}% remaining to complete course</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_LINKS.map(({ icon: Icon, label, href, desc }) => (
          <Link key={href} to={href} className="card hover:border-primary-600/40 transition-all duration-200 group text-center py-5">
            <div className="w-9 h-9 rounded-sm bg-primary-600/15 border border-primary-600/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-600/25 transition-colors">
              <Icon size={17} className="text-primary-400" />
            </div>
            <div className="text-xs font-medium text-white">{label}</div>
            <div className="text-[10px] text-ink-500 mt-0.5">{desc}</div>
          </Link>
        ))}
      </div>

      {/* Progress Chart + Upcoming */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-medium text-white">Progress Score</h3>
              <p className="text-xs text-ink-500 mt-0.5">Monthly assessment scores</p>
            </div>
            <TrendingUp size={16} className="text-primary-400" />
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={progressChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="progGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#62748f', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#62748f', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="score" stroke="#dc2626" fill="url(#progGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="text-sm font-medium text-white mb-4">Upcoming</h3>
          <div className="space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-xs text-ink-500 py-3 text-center">No upcoming items yet</p>
            ) : (
              upcoming.map(item => (
                <div key={item.label} className="flex gap-3 py-2 border-b border-ink-800 last:border-0">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                    item.type === 'exam' ? 'bg-red-400' : item.type === 'class' ? 'bg-emerald-400' : 'bg-blue-400'
                  }`} />
                  <div>
                    <div className="text-[10px] text-ink-500">{item.label}</div>
                    <div className="text-xs text-white mt-0.5">{item.value}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 pt-4 border-t border-ink-800">
            <div className="flex items-center gap-2 mb-2">
              <Award size={14} className="text-gold" />
              <span className="text-xs font-medium text-white">Your Stats</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Tests Taken', value: String(stats.testsTaken) },
                { label: 'Avg Score', value: stats.avgPct === null ? '—' : `${stats.avgPct}%` },
                { label: 'Videos Watched', value: String(stats.videosWatched) },
                { label: 'Downloads', value: String(stats.downloads) },
              ].map(s => (
                <div key={s.label} className="bg-ink-800 rounded-sm p-2 text-center">
                  <div className="text-sm font-bold text-white">{s.value}</div>
                  <div className="text-[9px] text-ink-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Videos + Notifications */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Recent Lessons</h3>
            <Link to="/student/lessons" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentVideos.map(v => (
              <div key={v.id} className="flex items-center gap-3 py-2 border-b border-ink-800 last:border-0">
                <div className="w-9 h-9 rounded-sm bg-primary-600/15 border border-primary-600/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary-400">
                  {v.thumb}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{v.title}</div>
                  <div className="text-[10px] text-ink-500">{v.duration} · {v.category}</div>
                </div>
                <Video size={12} className="text-ink-600 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">New Notifications</h3>
            <Link to="/student/notifications" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              All <ArrowRight size={12} />
            </Link>
          </div>
          {recentNotifs.length === 0 ? (
            <p className="text-xs text-ink-500 py-4 text-center">No new notifications</p>
          ) : (
            <div className="space-y-3">
              {recentNotifs.map(n => (
                <div key={n.id} className="flex gap-3 py-2 border-b border-ink-800 last:border-0">
                  <div className="notification-dot mt-1.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-white truncate">{n.title}</div>
                    <div className="text-[10px] text-ink-500 mt-0.5 line-clamp-1">{n.body}</div>
                    <div className="text-[10px] text-ink-600 mt-1">{n.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
