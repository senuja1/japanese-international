import React, { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import { MOCK_QUESTIONS } from '../../utils/mockData'
import { useAuth } from '../../context/AuthContext'
import { addTestResultForUser } from '../../services/portalStore'

export default function MCQTests() {
  const { user, setStudentProgress } = useAuth()
  const [levelFilter, setLevelFilter] = useState('N5')
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  const questions = MOCK_QUESTIONS.filter(q => q.level === levelFilter)

  const handleAnswer = (qId, idx) => {
    if (submitted) return
    setAnswers(prev => ({ ...prev, [qId]: idx }))
  }

  const handleSubmit = () => {
    let correct = 0
    questions.forEach(q => {
      if (answers[q.id] === q.answer) correct++
    })
    setScore(correct)
    setSubmitted(true)

    const total = questions.length || 1
    const pct = Math.round((correct / total) * 100)
    if (user?.id) {
      addTestResultForUser(user.id, {
        id: Date.now(),
        level: levelFilter,
        score: correct,
        total,
        pct,
        submittedAt: new Date().toISOString(),
      })

      // Simple “realistic” progress logic: never decrease progress from tests.
      const currentProgress = typeof user.progress === 'number' ? user.progress : Number(user.progress || 0)
      const nextProgress = Math.max(currentProgress, pct)
      setStudentProgress(Math.min(100, nextProgress))
    }
  }

  const handleReset = () => {
    setAnswers({})
    setSubmitted(false)
    setScore(null)
  }

  const answered = Object.keys(answers).length
  const pct = submitted ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold text-white">MCQ Practice Tests</h2>
        <p className="text-xs text-ink-500 mt-0.5">Online multiple choice assessments for all JLPT levels</p>
      </div>

      {/* Level selector */}
      <div className="flex gap-2">
        {['N5', 'N4', 'N3'].map(l => (
          <button key={l} onClick={() => { setLevelFilter(l); handleReset() }}
            className={`px-4 py-1.5 text-xs font-medium rounded-sm border transition-all ${
              levelFilter === l ? 'bg-primary-600 border-primary-500 text-white' : 'border-ink-700 text-ink-400 hover:text-white hover:border-ink-600'
            }`}>
            {l} ({MOCK_QUESTIONS.filter(q => q.level === l).length} Q)
          </button>
        ))}
      </div>

      {/* Score Banner */}
      {submitted && (
        <div className={`rounded-sm border p-5 text-center ${pct >= 70 ? 'bg-emerald-900/20 border-emerald-800/40' : 'bg-red-900/20 border-red-800/40'}`}>
          <Trophy size={28} className={`mx-auto mb-2 ${pct >= 70 ? 'text-gold' : 'text-red-400'}`} />
          <div className="font-display text-3xl font-bold text-white">{score}/{questions.length}</div>
          <div className={`text-sm mt-1 ${pct >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>
            {pct}% — {pct >= 70 ? 'Great work!' : 'Keep practicing!'}
          </div>
          <button onClick={handleReset} className="mt-3 text-xs text-ink-400 hover:text-white flex items-center gap-1 mx-auto transition-colors">
            <RotateCcw size={12} /> Retry Test
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, i) => {
          const userAns = answers[q.id]
          const correct = submitted && userAns === q.answer
          const wrong = submitted && userAns !== undefined && userAns !== q.answer
          return (
            <div key={q.id} className={`bg-ink-900 border rounded-sm p-5 transition-colors ${
              submitted ? (correct ? 'border-emerald-800/50' : wrong ? 'border-red-800/50' : 'border-ink-800') : 'border-ink-800'
            }`}>
              <div className="flex items-start gap-3 mb-4">
                <span className="font-mono text-xs text-ink-600 shrink-0 mt-0.5">Q{i + 1}</span>
                <div>
                  <div className="text-xs text-ink-500 mb-1">{q.category}</div>
                  <p className="text-sm font-medium text-white">{q.question}</p>
                </div>
                {submitted && (
                  correct ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5 ml-auto" /> :
                  wrong ? <XCircle size={16} className="text-red-400 shrink-0 mt-0.5 ml-auto" /> : null
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, idx) => {
                  let cls = 'border border-ink-700 text-ink-300 hover:border-ink-600 hover:text-white cursor-pointer'
                  if (!submitted) {
                    if (userAns === idx) cls = 'border border-primary-500 bg-primary-600/20 text-white'
                  } else {
                    if (idx === q.answer) cls = 'border border-emerald-600 bg-emerald-900/30 text-emerald-300'
                    else if (userAns === idx && idx !== q.answer) cls = 'border border-red-600 bg-red-900/30 text-red-300'
                    else cls = 'border border-ink-800 text-ink-500 cursor-not-allowed'
                  }
                  return (
                    <button key={idx} onClick={() => handleAnswer(q.id, idx)}
                      className={`text-left px-3 py-2.5 rounded-sm text-xs transition-all duration-150 ${cls}`}>
                      <span className="font-mono text-ink-600 mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submit */}
      {!submitted && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-ink-500">{answered}/{questions.length} answered</span>
          <button
            onClick={handleSubmit}
            disabled={answered < questions.length}
            className="btn-primary text-sm px-6 disabled:opacity-50"
          >
            Submit Test
          </button>
        </div>
      )}
    </div>
  )
}
