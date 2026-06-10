import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PublicLayout from '../../components/layout/PublicLayout'

export default function NotFoundPage() {
  return (
    <PublicLayout noFooter>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="font-japanese text-[120px] text-primary-600/10 leading-none mb-4 select-none">
            404
          </div>
          <div className="font-mono text-xs tracking-widest text-primary-500 uppercase mb-4">
            Page Not Found
          </div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            This page doesn't exist
          </h1>
          <p className="text-ink-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            The page you're looking for may have been moved, deleted, or never existed.
          </p>
          <Link to="/" className="btn-primary px-6">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </PublicLayout>
  )
}
