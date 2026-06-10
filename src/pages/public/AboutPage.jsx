import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Clock, Globe, Users } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const TIMELINE = [
  { year: '2008', event: 'japanese International founded in Colombo, Sri Lanka' },
  { year: '2011', event: 'First batch of JLPT N2 graduates secured employment in Japan' },
  { year: '2014', event: 'Introduced online distance learning platform for outstation students' },
  { year: '2016', event: 'Launched CELI examination preparation curriculum' },
  { year: '2019', event: 'Opened second branch in Kandy; passed 500 total graduates' },
  { year: '2021', event: 'Full LMS portal launched for student remote learning' },
  { year: '2023', event: 'Crossed 2,000 graduate milestone; introduced CDL/Patrol driver program' },
  { year: '2024', event: 'New student portal with live classes, MCQ testing and progress tracking' },
]

const TEAM = [
  { name: 'Yoshiko Tanaka', role: 'Academic Director', initials: 'YT', years: 'Native Japanese, 18+ yrs experience' },
  { name: 'Priya Mendis', role: 'Head of Admissions', initials: 'PM', years: 'JLPT N1 certified, 12 yrs' },
  { name: 'Kenji Sato', role: 'Senior Instructor', initials: 'KS', years: 'JPT certified, Business Japanese specialist' },
  { name: 'Nirosha Perera', role: 'Career Counsellor', initials: 'NP', years: 'HR specialist, Japan placement expert' },
]

export default function AboutPage() {
  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="max-w-3xl mb-20">
            <span className="section-label">About Us</span>
            <h1 className="page-title mt-3 mb-6">
              More Than a Language School.{' '}
              <span className="text-primary-500">A Gateway.</span>
            </h1>
            <p className="text-ink-300 text-lg leading-relaxed">
              japanese International has been shaping the futures of Sri Lankan students since 2008.
              Our mission is simple — deliver world-class Japanese language education that opens real doors to real opportunities.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
            {[
              { icon: Award, label: 'Academic Excellence', desc: '94% JLPT pass rate' },
              { icon: Clock, label: '15+ Years', desc: 'Established 2008' },
              { icon: Globe, label: 'Japan-Linked', desc: '12 partner companies' },
              { icon: Users, label: 'Community', desc: '2,400+ graduates' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="card text-center py-8">
                <Icon size={24} className="text-primary-500 mx-auto mb-3" />
                <div className="font-semibold text-white text-sm">{label}</div>
                <div className="text-xs text-ink-500 mt-1">{desc}</div>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <span className="section-label">Our Mission</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2 mb-5">
                Language as a Career Catalyst
              </h2>
              <div className="space-y-4 text-ink-300 text-sm leading-relaxed">
                <p>
                  At japanese International, we believe that language proficiency is the most powerful career investment a person can make.
                  We deliver not just language instruction, but a complete pathway — from enrollment to employment.
                </p>
                <p>
                  Our programs are designed in alignment with JLPT, JPT, and CELI examination standards, ensuring that every student who walks out of our doors is certified, prepared, and job-ready.
                </p>
                <p>
                  With direct partnerships with Japanese corporations and a dedicated placement team, we are with our students every step — from their first hiragana to their first payday in Japan.
                </p>
              </div>
            </div>
            <div className="bg-ink-900 border border-ink-800 rounded-sm p-8">
              <div className="font-japanese text-6xl text-primary-600/30 mb-4 leading-none">使命</div>
              <blockquote className="font-display text-xl text-white italic leading-relaxed mb-4">
                "Every student deserves a teacher who believes in their potential more than they believe in their own limitations."
              </blockquote>
              <div className="text-sm text-ink-500">— japanese International Founding Principle</div>
            </div>
          </div>

          {/* History Timeline */}
          <div id="history" className="mb-24">
            <div className="text-center mb-12">
              <span className="section-label">Our History</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2">A Journey of Growth</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className="flex gap-6 mb-6 stagger-1" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-sm bg-ink-900 border border-ink-700 flex items-center justify-center font-mono text-xs font-bold text-primary-400 shrink-0">
                      {item.year}
                    </div>
                    {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-ink-800 mt-2" />}
                  </div>
                  <div className="pb-6 pt-3">
                    <p className="text-sm text-ink-300 leading-relaxed">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div id="atlas" className="mb-16">
            <div className="text-center mb-12">
              <span className="section-label">Faculty</span>
              <h2 className="font-display text-3xl font-bold text-white mt-2">Meet Our Team</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <div key={member.name} className="card text-center stagger-2" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 to-ink-700 flex items-center justify-center mx-auto mb-4 text-xl font-bold text-white">
                    {member.initials}
                  </div>
                  <div className="font-semibold text-white text-sm">{member.name}</div>
                  <div className="text-xs text-primary-400 mt-0.5 mb-2">{member.role}</div>
                  <div className="text-xs text-ink-500 leading-relaxed">{member.years}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact" className="btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
