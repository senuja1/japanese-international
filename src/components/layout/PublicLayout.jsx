import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PublicLayout({ children, noFooter }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      {!noFooter && <Footer />}
    </div>
  )
}
