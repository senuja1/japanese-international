import React, { useState } from 'react'
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <PublicLayout>
      <div className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <span className="section-label">Contact</span>
            <h1 className="page-title mt-3 mb-4">Get in Touch</h1>
            <p className="text-ink-300 text-base leading-relaxed">
              Have a question about enrollment, exams, or vacancies? Our team responds within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-4 text-sm">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: 'Email', value: 'info@japanese.international', href: 'mailto:info@japanese.international' },
                    { icon: Phone, label: 'Phone / WhatsApp', value: '+94 77 123 4567', href: 'tel:+94771234567' },
                    { icon: MapPin, label: 'Colombo Office', value: '123 Galle Road, Colombo 03' },
                    { icon: MapPin, label: 'Kandy Branch', value: '45 Peradeniya Road, Kandy' },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-3">
                      <Icon size={16} className="text-primary-500 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs text-ink-500 mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} className="text-sm text-ink-300 hover:text-white transition-colors">{value}</a>
                        ) : (
                          <div className="text-sm text-ink-300">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="section-label mb-2">Office Hours</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-ink-400">Mon – Fri</span>
                    <span className="text-white">8:30 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Saturday</span>
                    <span className="text-white">9:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-400">Sunday</span>
                    <span className="text-ink-600">Closed</span>
                  </div>
                </div>
              </div>

              <div className="card bg-primary-600/10 border-primary-600/30">
                <MessageSquare size={18} className="text-primary-400 mb-2" />
                <div className="text-sm font-medium text-white mb-1">WhatsApp Us</div>
                <p className="text-xs text-ink-400 mb-3">Quick responses on WhatsApp for enrollment queries.</p>
                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs px-4 py-2 w-full justify-center"
                >
                  Open WhatsApp
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <div className="card flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={48} className="text-emerald-400 mb-4" />
                  <h3 className="font-display text-xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-ink-400 text-sm max-w-sm">
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                    className="mt-6 text-sm text-primary-400 hover:text-primary-300 transition-colors">
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="card">
                  <h3 className="font-semibold text-white mb-6 text-base">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ink-500 mb-1.5">Full Name *</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          className="input-field"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ink-500 mb-1.5">Email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          className="input-field"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-ink-500 mb-1.5">Phone</label>
                        <input
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                          className="input-field"
                          placeholder="+94 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-ink-500 mb-1.5">Subject *</label>
                        <select
                          required
                          value={form.subject}
                          onChange={e => setForm({ ...form, subject: e.target.value })}
                          className="input-field"
                        >
                          <option value="">Select subject...</option>
                          <option>Enrollment Inquiry</option>
                          <option>JLPT / CELI Exams</option>
                          <option>Job Vacancies</option>
                          <option>Student Portal</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-ink-500 mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Describe your inquiry in detail..."
                      />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>Send Message <Send size={15} /></>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
