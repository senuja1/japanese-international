import React, { useEffect, useMemo, useState } from 'react'
import { FileText, Download, Search } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import {
  addDownloadedIdForUser,
  getContent,
  getDownloadedIdsForUser,
} from '../../services/portalStore'

export default function Downloads() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [levelFilter, setLevelFilter] = useState('All')
  const [downloaded, setDownloaded] = useState([])
  const [downloadingId, setDownloadingId] = useState(null)
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
    const content = getContent()
    setDownloads(content.downloads)
    if (user?.id) setDownloaded(getDownloadedIdsForUser(user.id))
  }, [user?.id])

  const filtered = useMemo(() => {
    const s = search.toLowerCase()
    return downloads.filter(d => {
      const ms = d.name.toLowerCase().includes(s)
      const ml = levelFilter === 'All' || d.level === levelFilter || d.level === 'All'
      return ms && ml
    })
  }, [downloads, search, levelFilter])

  const downloadPDF = async (url, fileName) => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const blob = await res.blob()
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = `${fileName}`.replace(/[^\w.-]+/g, '_') + '.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
    } catch {
      // Cross-origin download may fail; opening in a new tab keeps it "working".
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDownload = async (file) => {
    if (!file?.url) return
    setDownloadingId(file.id)
    try {
      downloadPDF(file.url, file.name)
      if (user?.id) {
        const next = addDownloadedIdForUser(user.id, file.id)
        setDownloaded(next)
      }
    } finally {
      setTimeout(() => setDownloadingId(null), 800)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-white">Downloads</h2>
        <p className="text-xs text-ink-500 mt-0.5">PDFs, past papers, vocabulary lists, and reference materials</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-8 text-xs" placeholder="Search files..." />
        </div>
        <select value={levelFilter} onChange={e => setLevelFilter(e.target.value)} className="input-field text-xs w-auto">
          {['All', 'N5', 'N4', 'N3', 'N2', 'N1', 'Special'].map(l => <option key={l} value={l}>Level: {l}</option>)}
        </select>
      </div>

      <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
        {filtered.map((file, i) => (
          <div key={file.id} className={`flex items-center gap-4 px-5 py-4 ${i < filtered.length - 1 ? 'border-b border-ink-800' : ''} hover:bg-ink-800/40 transition-colors`}>
            <div className="w-9 h-9 bg-primary-600/15 border border-primary-600/20 rounded-sm flex items-center justify-center shrink-0">
              <FileText size={16} className="text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{file.name}</div>
              <div className="text-[10px] text-ink-500 mt-0.5">{file.type} · {file.size} · {file.date}</div>
            </div>
            <span className="badge badge-blue text-[10px] shrink-0">{file.level}</span>
            <button
              onClick={() => handleDownload(file)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm transition-all duration-200 shrink-0 ${
                downloaded.includes(file.id)
                  ? 'bg-emerald-900/40 text-emerald-400 border border-emerald-800/40'
                  : 'bg-ink-800 text-ink-300 hover:text-white hover:bg-ink-700 border border-ink-700'
              }`}
            >
              <Download size={12} />
              {downloadingId === file.id ? 'Downloading…' : downloaded.includes(file.id) ? 'Downloaded' : 'PDF'}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-ink-500">No files found</div>
        )}
      </div>
    </div>
  )
}
