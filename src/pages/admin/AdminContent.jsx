import React, { useEffect, useState } from 'react'
import { Upload, Trash2, Video, FileText, Link, Plus, X, CheckCircle2 } from 'lucide-react'
import {
  dateISO,
  getContent,
  setDownloads as persistDownloads,
  setVideos as persistVideos,
} from '../../services/portalStore'

const CONTENT_TABS = ['Videos', 'PDFs', 'Question Forms', 'Class Links', 'Course Updates']

const INITIAL_UPDATES = [
  { id: 1, title: 'April 2025 Intake Confirmed', body: 'Classes begin April 7. All enrolled students please check your portal.', date: '2025-03-15', published: true },
  { id: 2, title: 'New Video Lessons Added', body: 'N3 passive voice and causative lessons are now available.', date: '2025-03-10', published: true },
  { id: 3, title: 'JLPT Mock Test — March 29', body: 'A full JLPT N3 and N4 mock test will be held at Colombo center.', date: '2025-03-08', published: false },
]

function Section({ title, children }) {
  return (
    <div className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-ink-800 bg-ink-900/80">
        <h3 className="text-sm font-medium text-white">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState('Videos')
  const [videos, setVideos] = useState([])
  const [pdfs, setPdfs] = useState([])
  const [updates, setUpdates] = useState(INITIAL_UPDATES)
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [showAddPdf, setShowAddPdf] = useState(false)
  const [showAddUpdate, setShowAddUpdate] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', level: 'N5', url: '' })
  const [newPdf, setNewPdf] = useState({ name: '', level: 'All', url: '' })
  const [newUpdate, setNewUpdate] = useState({ title: '', body: '' })

  useEffect(() => {
    const content = getContent()
    setVideos(content.videos || [])
    setPdfs(content.downloads || [])
  }, [])

  const handleAddVideo = () => {
    const item = {
      id: Date.now(),
      title: newVideo.title,
      level: newVideo.level,
      embedUrl: newVideo.url,
      status: 'Published',
      date: dateISO(),
    }
    const next = [...videos, item]
    setVideos(next)
    persistVideos(next)
    setNewVideo({ title: '', level: 'N5', url: '' })
    setShowAddVideo(false)
  }

  const handleAddUpdate = () => {
    setUpdates(prev => [...prev, { id: Date.now(), ...newUpdate, date: new Date().toISOString().split('T')[0], published: true }])
    setNewUpdate({ title: '', body: '' })
    setShowAddUpdate(false)
  }

  const handleDeleteVideo = (id) => {
    const next = videos.filter(v => v.id !== id)
    setVideos(next)
    persistVideos(next)
  }

  const handleAddPdf = () => {
    if (!newPdf.name || !newPdf.url) return
    const item = {
      id: Date.now(),
      name: newPdf.name,
      type: 'PDF',
      size: '—',
      level: newPdf.level,
      date: dateISO(),
      url: newPdf.url,
      status: 'Active',
    }
    const next = [item, ...pdfs]
    setPdfs(next)
    persistDownloads(next)
    setNewPdf({ name: '', level: 'All', url: '' })
    setShowAddPdf(false)
  }

  const handleDeletePdf = (id) => {
    const next = pdfs.filter(p => p.id !== id)
    setPdfs(next)
    persistDownloads(next)
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-white">Content Management</h2>
        <p className="text-xs text-ink-500 mt-0.5">Upload PDFs, manage videos, update class links and system notices</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-ink-900 border border-ink-800 rounded-sm p-1 w-full overflow-x-auto">
        {CONTENT_TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm whitespace-nowrap transition-all duration-200 ${
              activeTab === tab ? 'bg-primary-600 text-white' : 'text-ink-400 hover:text-white'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Videos Tab */}
      {activeTab === 'Videos' && (
        <Section title="Video Lessons">
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowAddVideo(true)} className="btn-primary text-xs px-3 py-2">
              <Plus size={13} /> Add Video
            </button>
          </div>
          <div className="space-y-2">
            {videos.map(v => (
              <div key={v.id} className="flex items-center gap-3 p-3 bg-ink-800 rounded-sm hover:bg-ink-750 transition-colors">
                <div className="w-8 h-8 bg-primary-600/20 rounded flex items-center justify-center shrink-0">
                  <Video size={14} className="text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{v.title}</div>
                  <div className="text-[10px] text-ink-500 mt-0.5">Level {v.level} • {v.date}</div>
                </div>
                <span className={`badge text-[10px] ${v.status === 'Published' ? 'badge-green' : 'badge-yellow'}`}>{v.status || 'Draft'}</span>
                <button onClick={() => handleDeleteVideo(v.id)} className="text-ink-500 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {showAddVideo && (
            <div className="mt-4 border border-ink-700 rounded-sm p-4 bg-ink-800">
              <div className="space-y-3">
                <input value={newVideo.title} onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
                  className="input-field text-xs" placeholder="Video title" />
                <div className="grid grid-cols-2 gap-3">
                  <select value={newVideo.level} onChange={e => setNewVideo({ ...newVideo, level: e.target.value })} className="input-field text-xs">
                    {['N5', 'N4', 'N3', 'N2', 'N1', 'All'].map(l => <option key={l}>{l}</option>)}
                  </select>
                  <input value={newVideo.url} onChange={e => setNewVideo({ ...newVideo, url: e.target.value })}
                    className="input-field text-xs" placeholder="Embed URL (iframe src)" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowAddVideo(false)} className="btn-outline text-xs py-1.5 px-3">Cancel</button>
                  <button onClick={handleAddVideo} disabled={!newVideo.title} className="btn-primary text-xs py-1.5 px-3 disabled:opacity-50">Add</button>
                </div>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* PDFs Tab */}
      {activeTab === 'PDFs' && (
        <Section title="PDF Content">
          <div className="mb-4">
            <button
              type="button"
              className="flex items-center gap-3 cursor-pointer bg-ink-800 border border-dashed border-ink-600 hover:border-primary-600 rounded-sm p-4 transition-colors w-full text-left"
              onClick={() => setShowAddPdf(true)}
            >
              <Upload size={18} className="text-primary-400" />
              <div>
                <div className="text-sm text-white">Upload PDF</div>
                <div className="text-xs text-ink-500">Click to select files — PDFs up to 50MB</div>
              </div>
            </button>
          </div>

          {showAddPdf && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowAddPdf(false)}>
              <div className="w-full max-w-md bg-ink-900 border border-ink-700 rounded-sm p-6" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-white text-sm">Add PDF (URL)</h3>
                  <button onClick={() => setShowAddPdf(false)} className="text-ink-400 hover:text-white"><X size={17} /></button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-ink-500 mb-1">Name</label>
                    <input
                      value={newPdf.name}
                      onChange={e => setNewPdf({ ...newPdf, name: e.target.value })}
                      className="input-field text-xs"
                      placeholder="PDF title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-ink-500 mb-1">Level</label>
                      <select value={newPdf.level} onChange={e => setNewPdf({ ...newPdf, level: e.target.value })} className="input-field text-xs">
                        {['All', 'N5', 'N4', 'N3', 'N2', 'N1', 'Special'].map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-ink-500 mb-1">PDF URL</label>
                      <input
                        value={newPdf.url}
                        onChange={e => setNewPdf({ ...newPdf, url: e.target.value })}
                        className="input-field text-xs"
                        placeholder="https://.../file.pdf"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={() => setShowAddPdf(false)} className="btn-outline text-xs py-1.5 px-3 flex-1">Cancel</button>
                    <button
                      onClick={handleAddPdf}
                      disabled={!newPdf.name || !newPdf.url}
                      className="btn-primary text-xs py-1.5 px-3 flex-1 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {pdfs.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 bg-ink-800 rounded-sm">
                <FileText size={15} className="text-primary-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white truncate">{p.name}</div>
                  <div className="text-[10px] text-ink-500">Level {p.level} • {p.size} • {p.date}</div>
                </div>
                <span className="badge badge-green text-[10px]">{p.status || 'Active'}</span>
                <button onClick={() => handleDeletePdf(p.id)} className="text-ink-500 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Class Links Tab */}
      {activeTab === 'Class Links' && (
        <Section title="Live Class Links (Zoom / Google Meet)">
          <div className="space-y-3">
            {[
              { level: 'N5 Morning', link: 'https://zoom.us/j/123456789', schedule: 'Mon, Wed, Fri 8:00 AM' },
              { level: 'N4 Evening', link: 'https://zoom.us/j/987654321', schedule: 'Tue, Thu 6:00 PM' },
              { level: 'N3 Weekend', link: 'https://meet.google.com/abc-defg', schedule: 'Sat 10:00 AM' },
              { level: 'N2 Advanced', link: 'https://zoom.us/j/555555555', schedule: 'Mon–Thu 7:00 PM' },
            ].map(cls => (
              <div key={cls.level} className="flex items-center gap-3 p-3 bg-ink-800 rounded-sm">
                <Link size={14} className="text-primary-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-white">{cls.level}</div>
                  <div className="text-[10px] text-ink-500 font-mono truncate">{cls.link}</div>
                  <div className="text-[10px] text-ink-600">{cls.schedule}</div>
                </div>
                <button className="text-xs text-primary-400 hover:text-primary-300 transition-colors">Edit</button>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Course Updates Tab */}
      {activeTab === 'Course Updates' && (
        <Section title="System & Course Updates">
          <div className="flex justify-end mb-4">
            <button onClick={() => setShowAddUpdate(true)} className="btn-primary text-xs px-3 py-2">
              <Plus size={13} /> Post Update
            </button>
          </div>
          <div className="space-y-3">
            {updates.map(u => (
              <div key={u.id} className="border border-ink-700 rounded-sm p-4 hover:border-ink-600 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="text-xs font-medium text-white">{u.title}</div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`badge text-[10px] ${u.published ? 'badge-green' : 'badge-yellow'}`}>
                      {u.published ? 'Live' : 'Draft'}
                    </span>
                    <button onClick={() => setUpdates(p => p.filter(x => x.id !== u.id))} className="text-ink-500 hover:text-red-400 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-ink-400 leading-relaxed mb-1">{u.body}</p>
                <div className="text-[10px] text-ink-600">{u.date}</div>
              </div>
            ))}
          </div>

          {showAddUpdate && (
            <div className="mt-4 border border-ink-700 rounded-sm p-4 bg-ink-800">
              <div className="space-y-3">
                <input value={newUpdate.title} onChange={e => setNewUpdate({ ...newUpdate, title: e.target.value })}
                  className="input-field text-xs" placeholder="Update title" />
                <textarea value={newUpdate.body} onChange={e => setNewUpdate({ ...newUpdate, body: e.target.value })}
                  className="input-field text-xs resize-none" rows={3} placeholder="Update message..." />
                <div className="flex gap-2">
                  <button onClick={() => setShowAddUpdate(false)} className="btn-outline text-xs py-1.5 px-3">Cancel</button>
                  <button onClick={handleAddUpdate} disabled={!newUpdate.title} className="btn-primary text-xs py-1.5 px-3 disabled:opacity-50">Post</button>
                </div>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Question Forms Tab */}
      {activeTab === 'Question Forms' && (
        <Section title="MCQ Question Bank">
          <p className="text-xs text-ink-400 mb-4">Manage MCQ question sets for student practice tests across all levels.</p>
          <div className="space-y-2">
            {['N5 Vocabulary Set A', 'N5 Grammar Set A', 'N4 Vocabulary Set A', 'N4 Grammar Set A', 'N3 Reading Comprehension A', 'N3 Grammar Set A'].map(q => (
              <div key={q} className="flex items-center justify-between p-3 bg-ink-800 rounded-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span className="text-xs text-white">{q}</span>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs text-ink-400 hover:text-white transition-colors">Edit</button>
                  <button className="text-xs text-ink-400 hover:text-red-400 transition-colors">Delete</button>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 btn-primary text-xs px-3 py-2"><Plus size={13} /> New Question Set</button>
        </Section>
      )}
    </div>
  )
}
