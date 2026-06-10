import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-ink-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-primary-600 rounded-sm flex items-center justify-center">
                <span className="font-japanese text-white text-sm">明</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-xl leading-none">Japanese International</div>
                <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink-500 mt-0.5">International</div>
              </div>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed mb-5">
              Premier Japanese language institute. Empowering students with language skills for JLPT, CELI, and global career opportunities.
            </p>
            <div className="flex items-center gap-1 text-ink-500">
              <span className="font-japanese text-2xl text-primary-600/60">日本語</span>
              <span className="font-mono text-xs ml-2 text-ink-600">明るい未来へ</span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="section-label mb-5">Programs</h4>
            <ul className="space-y-3">
              {[
                ['JLPT Preparation', '/exam-dates'],
                ['CELI Examinations', '/exam-dates'],
                ['Enrollment Process', '/process'],
                ['Class Dates & Schedule', '/class-dates'],
                ['Student Portal', '/login'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-ink-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-primary-600 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="section-label mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                ['About Japanese', '/about'],
                ['Our History', '/about#history'],
                ['Testimonials', '/#testimonials'],
                ['Vacancies', '/vacancies'],
                ['FAQ', '/faq'],
                ['Contact Us', '/contact'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-ink-400 hover:text-white transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-primary-600 rounded-full" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="section-label mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-ink-500 mb-0.5">Email</div>
                  <a href="mailto:info@japanese-international.com" className="text-sm text-ink-300 hover:text-white transition-colors">
                    info@japanese-international.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-ink-500 mb-0.5">Phone / WhatsApp</div>
                  <a href="tel:+94771234567" className="text-sm text-ink-300 hover:text-white transition-colors">
                    +94 77 123 4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-primary-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs text-ink-500 mb-0.5">Address</div>
                  <p className="text-sm text-ink-300 leading-relaxed">
                    123 Galle Road, Colombo 03,<br />Sri Lanka
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="divider pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-600">
            © {new Date().getFullYear()} japnese International Language Institute. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-ink-600 hover:text-ink-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs text-ink-600 hover:text-ink-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
