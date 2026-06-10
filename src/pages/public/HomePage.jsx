import { Briefcase } from "lucide-react"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Play, Star, ChevronDown, BookOpen,
  Award, Globe, Users, Calendar, MessageSquare, CheckCircle2
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const STATS = [
  { value: '2,400+', label: 'Graduates' },
  { value: '94%', label: 'JLPT Pass Rate' },
  { value: '15+', label: 'Years Experience' },
  { value: '12', label: 'Partner Companies' },
]

const COURSES = [
  {
    tag: 'JLPT',
    title: 'JLPT N5 — N1',
    desc: 'Structured preparation for all JLPT levels. Covers grammar, vocabulary, kanji, reading, and listening comprehension.',
    color: 'from-red-900/30 to-transparent',
    accent: 'text-red-400',
  },
  {
    tag: 'CELI',
    title: 'CELI Examination',
    desc: 'Certified European Language Institute prep. Ideal for students targeting Italian certification alongside Japanese.',
    color: 'from-blue-900/30 to-transparent',
    accent: 'text-blue-400',
  },
  {
    tag: 'JPT',
    title: 'JPT Business',
    desc: 'Japanese Proficiency Test for professional settings. Workplace communication, business etiquette, and formal writing.',
    color: 'from-amber-900/30 to-transparent',
    accent: 'text-amber-400',
  },
  {
    tag: 'AS/AN',
    title: 'AN / JIT Special',
    desc: 'Advanced spoken Japanese, CDL/Patrol Driving language proficiency, and industry-specific courses.',
    color: 'from-emerald-900/30 to-transparent',
    accent: 'text-emerald-400',
  },
]

const TESTIMONIALS = [
  {
    name: 'Kavindra Perera',
    role: 'JLPT N2 Certified',
    avatar: 'K',
    text: 'japanese\'s structured curriculum and experienced teachers helped me pass N2 on my first attempt. The online materials and practice tests were invaluable.',
    stars: 5,
  },
  {
    name: 'Dilrukshi Fernando',
    role: 'Employed in Osaka',
    avatar: 'D',
    text: 'Within 8 months I had my JLPT N3 and a job offer in Japan. The interview preparation and visa guidance from Atsuko made all the difference.',
    stars: 5,
  },
  {
    name: 'Ruwan Silva',
    role: 'Business Japanese',
    avatar: 'R',
    text: 'The JPT Business course transformed my confidence in workplace Japanese. The live sessions and recordings are perfectly structured.',
    stars: 5,
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Registration', desc: 'Fill the online registration form and create your student account.' },
  { num: '02', title: 'Level Selection', desc: 'Our team assesses your current level and recommends the right course.' },
  { num: '03', title: 'Location & Intake', desc: 'Choose your preferred intake date and study location.' },
  { num: '04', title: 'Interview', desc: 'Brief online or in-person interview to confirm enrollment.' },
  { num: '05', title: 'Visa Processing', desc: 'We assist with documentation for Japan study / work visas.' },
  { num: '06', title: 'Begin Learning', desc: 'Access your student portal and start your Japanese journey.' },
]

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  return (
    <PublicLayout>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gold/3 rounded-full blur-3xl pointer-events-none" />

        {/* Japanese character decoration */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="font-japanese text-[180px] font-light text-white/[0.025] select-none leading-none">
            日本語
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <div className="hero-line">
              <span className="section-label">Welcome to japanese International</span>
            </div>

            <h1 className="page-title mt-4 mb-6 hero-line" style={{ animationDelay: '0.1s' }}>
              Master Japanese.{' '}
              <br />
              <span className="text-primary-500">Unlock</span> a World{' '}
              <br />
              of Opportunity.
            </h1>

            <p className="text-ink-300 text-lg leading-relaxed max-w-xl mb-8 hero-line" style={{ animationDelay: '0.2s' }}>
              Sri Lanka's leading Japanese language institute offering JLPT, CELI, and business Japanese programs with proven career pathways.
            </p>

            <div className="flex flex-wrap items-center gap-4 hero-line" style={{ animationDelay: '0.3s' }}>
              <Link to="/process" className="btn-primary px-8 py-3.5 text-sm">
                Start Enrollment
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => setVideoModalOpen(true)}
                className="flex items-center gap-3 text-sm text-ink-300 hover:text-white transition-colors group"
              >
                <div className="w-10 h-10 rounded-full border border-ink-700 group-hover:border-primary-600 flex items-center justify-center transition-colors">
                  <Play size={14} className="text-primary-500 ml-0.5" />
                </div>
                Watch Introduction
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 hero-line" style={{ animationDelay: '0.4s' }}>
              {STATS.map(({ value, label }) => (
                <div key={label} className="border-l-2 border-primary-600/50 pl-4">
                  <div className="font-display text-2xl font-bold text-white">{value}</div>
                  <div className="text-xs text-ink-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-600 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase font-mono">Scroll</span>
          <ChevronDown size={14} />
        </div>
      </section>

      {/* ─── COURSES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label">Our Programs</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
                Every Level. Every Goal.
              </h2>
            </div>
            <Link to="/exam-dates" className="text-sm text-primary-400 hover:text-primary-300 flex items-center gap-1 transition-colors">
              View exam dates <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {COURSES.map((c, i) => (
              <div
                key={c.tag}
                className={`relative bg-gradient-to-b ${c.color} bg-ink-900 border border-ink-800 rounded-sm p-6 hover:border-ink-700 transition-all duration-300 group cursor-pointer`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`section-label ${c.accent} mb-3`}>{c.tag}</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-sm text-ink-400 leading-relaxed">{c.desc}</p>
                <div className={`mt-5 flex items-center gap-1 text-xs ${c.accent} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn more <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS OVERVIEW ─── */}
      <section className="py-24 px-6 bg-ink-900/30 border-y border-ink-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">How It Works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
              Your Path to Japanese Fluency
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-4 stagger-1" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="font-mono text-5xl font-bold text-ink-800 leading-none shrink-0 mt-1">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white mb-1">{step.title}</h3>
                  <p className="text-sm text-ink-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/process" className="btn-primary">
              View Full Process <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VACANCIES TEASER ─── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label">Career Opportunities</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2 mb-5">
                Land Your Dream Job in Japan
              </h2>
              <p className="text-ink-300 text-base leading-relaxed mb-6">
                We maintain active partnerships with Japanese companies seeking skilled Sri Lankan professionals. Our placement team provides end-to-end career support.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Active job vacancy listings updated weekly',
                  'Online interview practice sessions',
                  'Pre-assigned HR officer support',
                  'Visa processing guidance',
                  'CDL / Patrol driver language certification',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-300">
                    <CheckCircle2 size={15} className="text-primary-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/vacancies" className="btn-primary">
                View Vacancies <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Globe, label: 'Japan Placements', value: '180+', accent: 'text-blue-400' },
                { icon: Briefcase, label: 'Partner Companies', value: '12', accent: 'text-amber-400' },
                { icon: Award, label: 'Avg Salary ¥', value: '250K+', accent: 'text-emerald-400' },
                { icon: Users, label: 'Placed This Year', value: '64', accent: 'text-primary-400' },
              ].map(({ icon: Icon, label, value, accent }) => (
                <div key={label} className="stat-card text-center py-8">
                  <Icon size={22} className={`${accent} mx-auto mb-3`} />
                  <div className={`font-display text-2xl font-bold text-white`}>{value}</div>
                  <div className="text-xs text-ink-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="testimonials" className="py-24 px-6 bg-ink-900/30 border-y border-ink-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Student Stories</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="card hover:border-ink-700 transition-all duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm text-ink-300 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-sm font-bold text-white">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-xs text-ink-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-japanese text-5xl text-primary-600/30 mb-4">始めましょう</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-ink-400 text-base mb-8 max-w-lg mx-auto">
            Join over 2,400 graduates who transformed their careers through japanese International.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/process" className="btn-primary px-8">
              Start Enrollment <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-outline px-8">
              <MessageSquare size={16} /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setVideoModalOpen(false)}>
          <div className="w-full max-w-3xl aspect-video bg-ink-900 border border-ink-700 rounded-sm flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="text-center">
              <Play size={48} className="text-primary-500 mx-auto mb-3" />
              <p className="text-ink-400 text-sm">Video introduction would play here</p>
              <button onClick={() => setVideoModalOpen(false)} className="mt-4 text-xs text-ink-600 hover:text-white transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  )
}
