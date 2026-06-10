import React from 'react'
import { Calendar, Clock, Users, MapPin, CheckCircle2 } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const INTAKES = [
  {
    intake: 'April 2025 Intake',
    deadline: 'March 25, 2025',
    status: 'Enrolling',
    batches: [
      { time: 'Morning  8:00 – 10:00 AM', days: 'Mon, Wed, Fri', location: 'Colombo', seats: 15 },
      { time: 'Evening  6:00 – 8:00 PM', days: 'Mon, Wed, Fri', location: 'Colombo', seats: 20 },
      { time: 'Weekend  9:00 AM – 1:00 PM', days: 'Sat & Sun', location: 'Kandy', seats: 18 },
      { time: 'Online   Flexible', days: 'Self-paced + Live Sat', location: 'Distance', seats: 40 },
    ],
  },
  {
    intake: 'July 2025 Intake',
    deadline: 'June 20, 2025',
    status: 'Open',
    batches: [
      { time: 'Morning  8:00 – 10:00 AM', days: 'Mon, Wed, Fri', location: 'Colombo', seats: 25 },
      { time: 'Evening  6:00 – 8:00 PM', days: 'Tue, Thu', location: 'Colombo', seats: 25 },
      { time: 'Weekend  9:00 AM – 1:00 PM', days: 'Sat & Sun', location: 'Kandy', seats: 20 },
      { time: 'Online   Flexible', days: 'Self-paced + Live Sat', location: 'Distance', seats: 50 },
    ],
  },
  {
    intake: 'September 2025 Intake',
    deadline: 'August 20, 2025',
    status: 'Upcoming',
    batches: [
      { time: 'Morning  8:00 – 10:00 AM', days: 'Mon, Wed, Fri', location: 'Colombo', seats: 30 },
      { time: 'Evening  6:00 – 8:00 PM', days: 'Mon, Wed, Fri', location: 'Colombo', seats: 30 },
      { time: 'Online   Flexible', days: 'Self-paced + Live Sat', location: 'Distance', seats: 60 },
    ],
  },
]

const IMPORTANT = [
  'All students must attend at least 80% of scheduled classes',
  'First class is free — attend before committing to full enrollment',
  'Course duration: 6 months (N5), 8 months (N4), 10 months (N3), 12 months (N2/N1)',
  'Holiday schedule follows Sri Lanka national calendar with additional Japan holidays noted',
  'Make-up classes are available for missed sessions by appointment',
]

export default function ClassDatesPage() {
  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-14">
            <span className="section-label">Schedule</span>
            <h1 className="page-title mt-3 mb-4">Class Start Dates &amp; Available Slots</h1>
            <p className="text-ink-300 text-base leading-relaxed">
              Choose the intake and batch that fits your lifestyle. Morning, evening, weekend, and fully online options are available.
            </p>
          </div>

          <div className="space-y-10 mb-16">
            {INTAKES.map((intake) => (
              <div key={intake.intake} className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-ink-800 bg-ink-900/80">
                  <div className="flex items-center gap-4">
                    <Calendar size={18} className="text-primary-500" />
                    <div>
                      <h3 className="font-semibold text-white text-sm">{intake.intake}</h3>
                      <p className="text-xs text-ink-500">Registration deadline: {intake.deadline}</p>
                    </div>
                  </div>
                  <span className={`badge ${
                    intake.status === 'Enrolling' ? 'badge-green' :
                    intake.status === 'Open' ? 'badge-blue' : 'badge-yellow'
                  }`}>
                    {intake.status}
                  </span>
                </div>

                {/* Batches */}
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {intake.batches.map((batch) => (
                    <div key={batch.time} className="bg-ink-800 rounded-sm p-4 hover:bg-ink-750 transition-colors">
                      <div className="text-xs font-mono text-primary-400 mb-2">
                        {batch.time.split('  ')[0]}
                      </div>
                      <div className="text-sm text-white font-medium mb-2">
                        {batch.time.split('  ')[1]}
                      </div>
                      <div className="space-y-1 text-xs text-ink-400">
                        <div className="flex items-center gap-1.5">
                          <Clock size={10} className="text-ink-600" /> {batch.days}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={10} className="text-ink-600" /> {batch.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={10} className="text-ink-600" /> {batch.seats} seats
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="card mb-12 max-w-2xl">
            <h3 className="font-semibold text-white text-sm mb-4">Important Notes</h3>
            <ul className="space-y-2.5">
              {IMPORTANT.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-ink-400">
                  <CheckCircle2 size={14} className="text-primary-500 mt-0.5 shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* Course Duration Quick Reference */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Course Duration Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-ink-900 border border-ink-800 rounded-sm">
                <thead>
                  <tr className="border-b border-ink-800">
                    {['Level', 'Duration', 'Classes/Week', 'Total Hours', 'Exam'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-mono tracking-widest text-ink-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['N5 (Beginner)', '6 months', '3×/week', '144 hrs', 'JLPT N5'],
                    ['N4 (Elementary)', '8 months', '3×/week', '192 hrs', 'JLPT N4'],
                    ['N3 (Intermediate)', '10 months', '3×/week', '240 hrs', 'JLPT N3'],
                    ['N2 (Upper-Int.)', '12 months', '4×/week', '320 hrs', 'JLPT N2'],
                    ['N1 (Advanced)', '14 months', '4×/week', '380 hrs', 'JLPT N1'],
                  ].map(row => (
                    <tr key={row[0]} className="table-row">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-5 py-3.5 ${i === 0 ? 'font-medium text-white' : 'text-ink-400'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
