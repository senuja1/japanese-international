import React, { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const FAQS = [
  {
    category: 'Enrollment',
    items: [
      { q: 'How do I register at japanese International?', a: 'You can register through our website form, WhatsApp, or visit either of our centers. Our admissions team will guide you through the entire process and create your student account within 24 hours.' },
      { q: 'What is the minimum age for enrollment?', a: 'For standard language courses, there is no minimum age. For Japan employment programs, applicants must be between 18–45 years old.' },
      { q: 'Can I start learning Japanese with zero prior knowledge?', a: 'Absolutely. Our N5 course is designed for complete beginners. We start from hiragana, katakana, and basic grammar and build systematically from there.' },
      { q: 'What documents are required for registration?', a: 'You will need a copy of your National Identity Card, recent O/L or A/L certificates, 2 passport-size photos, and any prior language certificates if applicable.' },
    ],
  },
  {
    category: 'Courses & Learning',
    items: [
      { q: 'What courses does japanese offer?', a: 'We offer JLPT preparation (N5 through N1), CELI examination prep, JPT Business Japanese, and specialty programs including CDL/Patrol driver language certification and Japan-specific workplace Japanese.' },
      { q: 'Is online learning available?', a: 'Yes. Full online distance learning includes recorded video lessons, live Zoom sessions every Saturday, downloadable PDFs and past papers, and MCQ self-assessment tests through your student portal.' },
      { q: 'How long does it take to reach JLPT N3?', a: 'From absolute beginner, reaching N3 typically requires 18–24 months of regular study. Students with some prior exposure can reach N3 in 12–18 months.' },
      { q: 'Do classes follow a set curriculum or textbook?', a: 'Yes. We follow the Minna no Nihongo and Genki series supplemented by original japanese materials, past exam papers, and custom listening exercises.' },
    ],
  },
  {
    category: 'JLPT & Exams',
    items: [
      { q: 'When is the JLPT held in Sri Lanka?', a: 'The JLPT is held twice a year in Sri Lanka — in July and December. Seats are limited, and japanese students receive priority registration assistance.' },
      { q: 'What is japanese\'s JLPT pass rate?', a: 'Our enrolled students achieve a 94% first-attempt pass rate across all JLPT levels, significantly above the global average of around 30–50%.' },
      { q: 'Does japanese help with exam registration?', a: 'Yes. Our team handles the complete registration process — collecting documents, submitting applications, and paying fees on behalf of students where applicable.' },
    ],
  },
  {
    category: 'Japan Employment',
    items: [
      { q: 'Does japanese help students find jobs in Japan?', a: 'Yes. We have 12 active partner companies in Japan across manufacturing, care services, construction, and logistics. Our placement team assists from application through visa processing to arrival.' },
      { q: 'What JLPT level is needed for Japan employment?', a: 'Most entry-level positions require N4 minimum. Skilled technical roles often require N3. Management or professional positions typically require N2 or N1.' },
      { q: 'How does the visa process work?', a: 'Once you receive a job offer, our dedicated visa team provides a full document checklist, assists with embassy appointments, medical check coordination, and tracks your application to approval.' },
      { q: 'Are there fees charged for job placement?', a: 'Placement support is included as part of our enrollment service. We do not charge separate placement fees. Visa processing fees are government/embassy charges passed through at cost.' },
    ],
  },
]

export default function FAQPage() {
  const [openItem, setOpenItem] = useState(null)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = FAQS.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat =>
    (activeCategory === 'All' || cat.category === activeCategory) && cat.items.length > 0
  )

  const totalResults = filtered.reduce((sum, cat) => sum + cat.items.length, 0)

  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="section-label">Help Center</span>
            <h1 className="page-title mt-3 mb-4">Frequently Asked Questions</h1>
            <p className="text-ink-300 text-base">Everything you need to know about japanese International.</p>

            {/* Search */}
            <div className="relative mt-6">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-10 text-center"
                placeholder="Search questions..."
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', ...FAQS.map(f => f.category)].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-primary-600 border-primary-500 text-white'
                    : 'border-ink-700 text-ink-400 hover:border-ink-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {search && (
            <p className="text-xs text-ink-500 text-center mb-6">{totalResults} result{totalResults !== 1 ? 's' : ''} for "{search}"</p>
          )}

          {/* FAQs */}
          <div className="max-w-3xl mx-auto space-y-10">
            {filtered.map((cat) => (
              <div key={cat.category}>
                <h2 className="section-label mb-4">{cat.category}</h2>
                <div className="space-y-2">
                  {cat.items.map((item, i) => {
                    const key = `${cat.category}-${i}`
                    return (
                      <div key={key} className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
                        <button
                          onClick={() => setOpenItem(openItem === key ? null : key)}
                          className="w-full flex items-start justify-between px-5 py-4 text-left gap-4 group"
                        >
                          <span className="text-sm font-medium text-white group-hover:text-primary-300 transition-colors leading-relaxed">
                            {item.q}
                          </span>
                          <ChevronDown
                            size={15}
                            className={`text-ink-500 shrink-0 mt-0.5 transition-transform duration-200 ${openItem === key ? 'rotate-180 text-primary-500' : ''}`}
                          />
                        </button>
                        {openItem === key && (
                          <div className="px-5 pb-5 text-sm text-ink-400 leading-relaxed border-t border-ink-800 pt-4">
                            {item.a}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="max-w-2xl mx-auto mt-16 text-center">
            <div className="card">
              <h3 className="font-semibold text-white mb-2">Still have questions?</h3>
              <p className="text-sm text-ink-400 mb-4">Our admissions team is happy to help you personally.</p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm px-5 py-2.5">
                  WhatsApp Us
                </a>
                <a href="mailto:info@japanese.international" className="btn-outline text-sm px-5 py-2.5">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
