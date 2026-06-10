import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ClipboardList, UserCheck, MapPin, Video, CreditCard,
  FileText, Plane, CheckCircle2, ArrowRight, ChevronDown
} from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

const STEPS = [
  {
    icon: ClipboardList,
    num: '01',
    title: 'Registration Form & Account',
    desc: 'Complete the online registration form with your personal details. Our team will create your student account and send login credentials within 24 hours.',
    details: ['Full name, NIC, contact details', 'Educational background', 'Japanese level self-assessment', 'Emergency contact'],
  },
  {
    icon: UserCheck,
    num: '02',
    title: 'NA Group Link & Level Assessment',
    desc: 'You\'ll be added to a WhatsApp group for your intake. We conduct a brief language level assessment to place you in the correct class.',
    details: ['WhatsApp NA group access', 'Online level test (30 mins)', 'Results within 48 hours', 'Class recommendation provided'],
  },
  {
    icon: Video,
    num: '03',
    title: 'Online Interview Practice Class',
    desc: 'Before formal enrollment, attend an online orientation and interview prep class. This is free for all prospective students.',
    details: ['Zoom-based orientation session', 'Meet your assigned instructor', 'Course overview walkthrough', 'Q&A with current students'],
  },
  {
    icon: MapPin,
    num: '04',
    title: 'Intake Selection & Location',
    desc: 'Choose your preferred class intake date and study location — Colombo, Kandy, or Online Distance Learning.',
    details: ['Morning / Evening batches', 'Colombo and Kandy centers', 'Full online option available', 'Flexible rescheduling policy'],
  },
  {
    icon: Video,
    num: '05',
    title: 'Interview Date & Status',
    desc: 'For students targeting Japan employment, a formal interview date is scheduled with partner company HR officers.',
    details: ['Interview scheduling by our team', 'Full preparation support', 'Mock interviews provided', 'Results communicated within 5 days'],
  },
  {
    icon: CreditCard,
    num: '06',
    title: 'Visa Processing',
    desc: 'Our dedicated visa team assists with all documentation required for Japan study or work visa applications.',
    details: ['Document checklist provided', 'Embassy appointment support', 'Medical fitness guidance', 'Processing time: 4–8 weeks'],
  },
  {
    icon: FileText,
    num: '07',
    title: 'Pre-assigned Office & HR Support',
    desc: 'Each student is assigned a dedicated office contact person who handles their file from enrollment to arrival in Japan.',
    details: ['Single point of contact', 'WhatsApp direct support', 'Document tracking system', 'Regular status updates'],
  },
  {
    icon: Plane,
    num: '08',
    title: 'Apply Vacancy via Call',
    desc: 'Once ready, our placement team helps you apply to suitable vacancies by coordinating with partner company HR.',
    details: ['Vacancy matching service', 'HR referral letters', 'Application review', 'Follow-up until offer received'],
  },
]

const FAQS = [
  {
    q: 'How long does the entire process take?',
    a: 'From registration to Japan departure typically takes 6–12 months depending on your starting level, visa processing, and available intake dates.',
  },
  {
    q: 'What documents do I need for registration?',
    a: 'National ID card copy, O/L or A/L certificate copies, recent passport-size photos, and any prior Japanese language certificates.',
  },
  {
    q: 'Is there an age limit?',
    a: 'japanese accepts students aged 18–45 for Japan-bound programs. Language classes alone have no age restriction.',
  },
  {
    q: 'Can I study online?',
    a: 'Yes. Full online distance learning is available. Students receive access to video lessons, live Zoom classes, and downloadable materials.',
  },
]

export default function ProcessPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="section-label">Enrollment</span>
            <h1 className="page-title mt-3 mb-4">Full Student Process &amp; How to Apply</h1>
            <p className="text-ink-300 text-base leading-relaxed">
              From your first inquiry to your first day in Japan — here's exactly how it works at japanese International.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mb-24">
            {/* Vertical line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-ink-800 hidden md:block" />
            <div className="space-y-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="flex gap-6 stagger-1" style={{ animationDelay: `${i * 0.06}s` }}>
                    {/* Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-sm bg-ink-900 border border-ink-700 flex items-center justify-center shrink-0 group-hover:border-primary-600 transition-colors">
                      <Icon size={18} className="text-primary-500" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-ink-900 border border-ink-800 rounded-sm p-5 hover:border-ink-700 transition-all duration-200">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <span className="font-mono text-xs text-ink-600 mr-2">{step.num}</span>
                          <span className="font-semibold text-white text-sm">{step.title}</span>
                        </div>
                      </div>
                      <p className="text-sm text-ink-400 leading-relaxed mb-4">{step.desc}</p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {step.details.map(d => (
                          <div key={d} className="flex items-center gap-1.5 text-xs text-ink-500">
                            <CheckCircle2 size={11} className="text-primary-600 shrink-0" />
                            {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-primary-900/30 to-ink-900 border border-primary-800/30 rounded-sm p-8 mb-16 text-center">
            <div className="font-japanese text-4xl text-primary-600/30 mb-3">始めましょう</div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Ready to Get Started?</h2>
            <p className="text-ink-400 text-sm mb-6">Fill in the registration form and our admissions team will contact you within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="btn-primary px-8">
                WhatsApp Us Now <ArrowRight size={16} />
              </a>
              <Link to="/contact" className="btn-outline px-8">Contact Form</Link>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2 max-w-2xl">
              {FAQS.map((faq, i) => (
                <div key={i} className="bg-ink-900 border border-ink-800 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown
                      size={15}
                      className={`text-ink-500 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-ink-400 leading-relaxed border-t border-ink-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
