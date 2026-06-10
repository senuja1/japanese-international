import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users, TrendingUp, BookOpen, Briefcase, Bell, ArrowRight,
  CheckCircle2, AlertCircle, Clock, UserPlus
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { MOCK_STUDENTS, MOCK_NOTIFICATIONS, ENROLLMENT_CHART_DATA } from '../../utils/mockData'

const LEVEL_DISTRIBUTION = [
  { level: 'N5', count: 42, color: 'bg-blue-500' },
  { level: 'N4', count: 38, color: 'bg-emerald-500' },
  { level: 'N3', count: 29, color: 'bg-amber-500' },
  { level: 'N2', count: 18, color: 'bg-primary-500' },
  { level: 'N1', count: 7, color: 'bg-purple-500' },
]

const STAT_CARDS = [
  { icon: Users, label: 'Total Students', value: '134', change: '+12', positive: true },
  { icon: UserPlus, label: 'New This Month', value: '29', change: '+8', positive: true },
  { icon: TrendingUp, label: 'JLPT Pass Rate', value: '94%', change: '+2%', positive: true },
  { icon: Briefcase, label: 'Open Vacancies', value: '6', change: '-1', positive: false },
]

const RECENT_STUDENTS = MOCK_STUDENTS.slice(0, 5)
const RECENT_NOTIFS = MOCK_NOTIFICATIONS.slice(0, 4)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-ink-800 border border-ink-700 rounded-sm px-3 py-2 text-xs">
        <p className="text-ink-400">{label}</p>
        <p className="text-white font-medium">{payload[0].value} {payload[0].name === 'count' ? 'enrollments' : ''}</p>
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const totalLevels = LEVEL_DISTRIBUTION.reduce((s, l) => s + l.count, 0)

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ icon: Icon, label, value, change, positive }) => (
          <div key={label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-sm bg-ink-800 flex items-center justify-center">
                <Icon size={15} className="text-primary-400" />
              </div>
              <span className={`text-xs font-medium ${positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {change}
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-ink-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Enrollment Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-medium text-white">Monthly Enrollments</h3>
              <p className="text-xs text-ink-500 mt-0.5">Last 7 months</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={ENROLLMENT_CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="enrollGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: '#62748f', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#62748f', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="count" stroke="#dc2626" fill="url(#enrollGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Level Distribution */}
        <div className="card">
          <h3 className="text-sm font-medium text-white mb-5">Students by Level</h3>
          <div className="space-y-3">
            {LEVEL_DISTRIBUTION.map(item => (
              <div key={item.level}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-ink-400">JLPT {item.level}</span>
                  <span className="text-white font-medium">{item.count}</span>
                </div>
                <div className="h-1.5 bg-ink-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.count / totalLevels) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-ink-800">
            <div className="text-xs text-ink-500">Total enrolled</div>
            <div className="text-xl font-bold text-white font-display">{totalLevels}</div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Students */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Recent Students</h3>
            <Link to="/admin/students" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-2">
            {RECENT_STUDENTS.map(s => (
              <div key={s.id} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-ink-700 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {s.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{s.name}</div>
                  <div className="text-[10px] text-ink-500">Level {s.level} • {s.intake}</div>
                </div>
                <span className={`badge ${s.status === 'Active' ? 'badge-green' : s.status === 'Graduated' ? 'badge-blue' : 'badge-yellow'} text-[10px]`}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white">Recent Notifications</h3>
            <Link to="/admin/notifications" className="text-xs text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              Manage <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_NOTIFS.map(n => (
              <div key={n.id} className="flex gap-3 py-2 border-b border-ink-800 last:border-0">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-ink-600' : 'bg-primary-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{n.title}</div>
                  <div className="text-[10px] text-ink-500 mt-0.5 line-clamp-1">{n.body}</div>
                  <div className="text-[10px] text-ink-600 mt-1">{n.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
