'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-yellow-500">♔</div>
            <div>
              <h1 className="text-2xl font-bold text-black">SATTA-KING</h1>
              <p className="text-sm text-gray-600">Fast Results</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Admin Panel</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Disclaimer */}
        <div className="bg-red-500 text-white p-6 rounded-lg mb-8">
          <h2 className="font-bold mb-2">DISCLAIMER</h2>
          <p className="text-sm">This website is an independent media portal for informational and journalistic purposes only. As a non-transactional service, we are not affiliated with any entity mentioned.</p>
        </div>

        {/* Update Time */}
        <div className="bg-green-500 text-white p-4 rounded-lg mb-8 text-center">
          <p className="font-semibold">Updated: {new Date().toLocaleDateString('en-IN')} {currentTime} IST</p>
        </div>

        {/* Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
          <Link href="/today">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-lg">Today Results</Button>
          </Link>
          <Link href="/monthly">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 text-lg">Monthly Chart</Button>
          </Link>
        </div>

        {/* Featured Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg mb-8 text-center">
          <h3 className="text-xl font-bold">Latest Satta King Results</h3>
          <p className="text-sm mt-2">Click below to view latest lottery results</p>
        </div>
      </main>
    </div>
  )
}
