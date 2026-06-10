// VideoLessons.jsx
import React, { useEffect, useMemo, useState } from 'react'
import { Play, Eye, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { addVideoWatchedIdForUser, getContent } from '../../services/portalStore'

export default function VideoLessons() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [playing, setPlaying] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const content = getContent()
    setVideos(content.videos)
  }, [])

  const filtered = useMemo(() => {
    const s = search.toLowerCase()
    return videos.filter(v => {
      const ms = v.title.toLowerCase().includes(s) || v.category.toLowerCase().includes(s)
      const ml = levelFilter === 'All' || v.level === levelFilter
      return ms && ml
    })
  }, [videos, search, levelFilter])

  const handlePlay = (video) => {
    setPlaying(video)
    if (user?.id) addVideoWatchedIdForUser(user.id, video.id)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-white">Video Lessons</h2>
        <p className="text-xs text-ink-500 mt-0.5">Recorded lectures and class sessions</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-8 text-xs" placeholder="Search lessons..." />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="input-field text-xs w-auto">
          {['All', 'N5', 'N4', 'N3', 'N2', 'N1'].map(l => <option key={l} value={l}>Level: {l}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(v => (
          <div key={v.id} className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden hover:border-ink-700 transition-all duration-200 group">
            <div className="aspect-video bg-gradient-to-br from-ink-800 to-ink-900 flex items-center justify-center relative cursor-pointer"
              onClick={() => handlePlay(v)}>
              <div className="w-12 h-12 rounded-full bg-primary-600/90 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Play size={18} className="text-white ml-1" />
              </div>
              <div className="absolute top-2 right-2 bg-ink-950/80 rounded px-1.5 py-0.5 text-[10px] text-white font-mono">{v.duration}</div>
              <div className="absolute top-2 left-2 bg-primary-600/90 rounded px-1.5 py-0.5 text-[10px] text-white">{v.level}</div>
              <div className="absolute inset-0 flex items-end justify-center pb-3">
                <div className="text-4xl font-japanese text-white/10">{v.thumb}</div>
              </div>
            </div>
            <div className="p-3">
              <div className="text-xs font-medium text-white mb-1">{v.title}</div>
              <div className="flex items-center justify-between text-[10px] text-ink-500">
                <span>{v.category}</span>
                <span className="flex items-center gap-1"><Eye size={10} />{v.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {playing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setPlaying(null)}>
          <div className="w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <div className="aspect-video bg-ink-900 border border-ink-700 rounded-sm flex items-center justify-center mb-3">
              <div className="w-full h-full relative">
                {playing.embedUrl ? (
                  <iframe
                    title={playing.title}
                    src={playing.embedUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <div className="text-center p-6">
                    <div className="text-6xl font-japanese text-primary-600/30 mb-3">{playing.thumb}</div>
                    <div className="font-semibold text-white">{playing.title}</div>
                    <div className="text-xs text-ink-500 mt-1">{playing.duration} · Level {playing.level}</div>
                    <div className="text-xs text-ink-600 mt-3">No video URL available</div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 mb-3 px-1">
              <div className="min-w-0">
                <div className="font-semibold text-white truncate">{playing.title}</div>
                <div className="text-xs text-ink-500 mt-1">{playing.duration} · Level {playing.level}</div>
              </div>
            </div>
            <button onClick={() => setPlaying(null)} className="text-xs text-ink-500 hover:text-white transition-colors">✕ Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
