'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface Game {
  id: string
  name: string
  time: string
  number1: string
  number2: string
  highlighted?: boolean
}

export default function TodayPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGames()
    const interval = setInterval(fetchGames, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games')
      const data = await response.json()
      setGames(data)
    } catch (error) {
      console.error('Failed to fetch games:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchGames()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Today Results</h1>
          <Button onClick={handleRefresh} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
            Refresh
          </Button>
        </div>
      </header>

      {/* Games List */}
      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="space-y-2">
          {games.map((game) => (
            <div
              key={game.id}
              className={`p-4 rounded-lg flex justify-between items-center ${
                game.highlighted
                  ? 'bg-yellow-400 border-2 border-yellow-500'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div>
                <h3 className={`font-bold text-lg ${game.highlighted ? 'text-black' : 'text-black'}`}>
                  {game.name}
                </h3>
                <p className={`text-sm ${game.highlighted ? 'text-gray-700' : 'text-gray-600'}`}>
                  at {game.time}
                </p>
                <Link href="#" className="text-blue-500 text-sm hover:underline">
                  Record Chart
                </Link>
              </div>
              <div className="flex gap-4 text-right">
                <div className="text-3xl font-bold text-black">{game.number1}</div>
                <div className="text-3xl font-bold text-black">{game.number2}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Message */}
        <div className="bg-yellow-400 p-4 rounded-lg text-center font-bold mt-8 text-black">
          Show Your Game Here
          <p className="text-sm">Contact us to show your game here</p>
        </div>
      </main>
    </div>
  )
}
