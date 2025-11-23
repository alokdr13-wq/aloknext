'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

interface MonthlyData {
  [key: string]: {
    [key: string]: string
  }
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i)

const games = ['DSWR', 'FRBD', 'GZBD', 'GALI']

export default function MonthlyPage() {
  const [selectedMonth, setSelectedMonth] = useState('January')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [data, setData] = useState<MonthlyData>({})
  const [loading, setLoading] = useState(false)

  const fetchMonthlyData = async () => {
    setLoading(true)
    try {
      const monthNum = months.indexOf(selectedMonth) + 1
      const response = await fetch(
        `/api/monthly?month=${monthNum}&year=${selectedYear}`
      )
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Failed to fetch monthly data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGo = () => {
    fetchMonthlyData()
  }

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(months.indexOf(selectedMonth) + 1, selectedYear)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Monthly Chart</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Info Box */}
        <div className="bg-yellow-400 p-6 rounded-lg mb-8 text-center">
          <p className="font-semibold text-black">
            Select a month and year to view the combined chart for Gali, Desawar, Ghaziabad, and Faridabad.
          </p>
        </div>

        {/* Selection Controls */}
        <div className="bg-yellow-400 p-6 rounded-lg mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-black">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-bold text-lg"
              >
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-black">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-300 rounded-lg font-bold text-lg"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleGo}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 text-lg"
            >
              {loading ? 'Loading...' : 'Go'}
            </Button>
          </div>
        </div>

        {/* Chart Display */}
        {Object.keys(data).length > 0 && (
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="bg-green-500 text-white p-4 text-center font-bold text-lg">
              Monthly Satta King Result Chart of {selectedMonth} {selectedYear} for {games.join(', ')}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-yellow-400">
                    <th className="border border-gray-300 p-3 font-bold text-left text-red-600">DATE</th>
                    {games.map((game) => (
                      <th key={game} className="border border-gray-300 p-3 font-bold">
                        {game}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <tr key={day} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-3 font-bold text-red-600">
                        {String(day).padStart(2, '0')}
                      </td>
                      {games.map((game) => (
                        <td
                          key={`${day}-${game}`}
                          className="border border-gray-300 p-3 text-center font-semibold"
                        >
                          {data[game]?.[String(day).padStart(2, '0')] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
