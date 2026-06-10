import React from 'react'
import { Link } from 'react-router-dom'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('japanese ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink-950 flex items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="font-japanese text-6xl text-primary-600/20 mb-6">エラー</div>
            <h1 className="font-display text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-sm text-ink-400 mb-2 leading-relaxed">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className="text-xs text-ink-600 bg-ink-900 border border-ink-800 rounded-sm p-3 text-left mb-6 overflow-auto max-h-28">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
                className="btn-primary text-sm"
              >
                Reload Page
              </button>
              <Link to="/" className="btn-outline text-sm">
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
