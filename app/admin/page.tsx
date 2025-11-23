'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

interface Game {
  id: string
  name: string
  time: string
  number1: string
  number2: string
  highlighted?: boolean
}

export default function AdminPage() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValues, setEditValues] = useState({ number1: '', number2: '' })

  useEffect(() => {
    fetchGames()
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

  const handleEdit = (game: Game) => {
    setEditingId(game.id)
    setEditValues({ number1: game.number1, number2: game.number2 })
  }

  const handleSave = async (gameId: string) => {
    try {
      const response = await fetch('/api/games', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: gameId,
          ...editValues,
        }),
      })
      if (response.ok) {
        setEditingId(null)
        fetchGames()
      }
    } catch (error) {
      console.error('Failed to save game:', error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
  }

  const toggleHighlight = async (gameId: string, currentHighlight: boolean) => {
    try {
      const response = await fetch('/api/games', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: gameId,
          highlighted: !currentHighlight,
        }),
      })
      if (response.ok) {
        fetchGames()
      }
    } catch (error) {
      console.error('Failed to update highlight:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-blue-600 text-white p-4 rounded-lg mb-8">
          <h2 className="text-xl font-bold">Manage Game Results</h2>
          <p className="text-sm mt-2">Update the numbers for each game below</p>
        </div>

        {/* Games Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 border-b-2 border-gray-300">
                <th className="p-4 text-left font-bold">Game Name</th>
                <th className="p-4 text-center font-bold">Time</th>
                <th className="p-4 text-center font-bold">Number 1</th>
                <th className="p-4 text-center font-bold">Number 2</th>
                <th className="p-4 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold text-lg">{game.name}</div>
                  </td>
                  <td className="p-4 text-center text-gray-600">{game.time}</td>
                  <td className="p-4 text-center">
                    {editingId === game.id ? (
                      <input
                        type="text"
                        maxLength="2"
                        value={editValues.number1}
                        onChange={(e) =>
                          setEditValues({ ...editValues, number1: e.target.value })
                        }
                        className="w-16 p-2 border-2 border-blue-500 rounded text-center font-bold text-lg"
                      />
                    ) : (
                      <span className="text-2xl font-bold">{game.number1}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {editingId === game.id ? (
                      <input
                        type="text"
                        maxLength="2"
                        value={editValues.number2}
                        onChange={(e) =>
                          setEditValues({ ...editValues, number2: e.target.value })
                        }
                        className="w-16 p-2 border-2 border-blue-500 rounded text-center font-bold text-lg"
                      />
                    ) : (
                      <span className="text-2xl font-bold">{game.number2}</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {editingId === game.id ? (
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => handleSave(game.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => handleEdit(game)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => toggleHighlight(game.id, game.highlighted || false)}
                          className={`px-3 py-1 ${
                            game.highlighted
                              ? 'bg-yellow-500 hover:bg-yellow-600'
                              : 'bg-gray-400 hover:bg-gray-500'
                          } text-white`}
                        >
                          {game.highlighted ? 'Highlighted' : 'Highlight'}
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Game Section */}
        <div className="bg-blue-600 text-white p-6 rounded-lg mt-8">
          <h3 className="text-lg font-bold mb-4">Add New Game</h3>
          <p className="text-sm">Games are pre-configured. Contact admin to add new games.</p>
        </div>
      </main>
    </div>
  )
}
