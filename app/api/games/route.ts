import { NextRequest, NextResponse } from 'next/server'

// In-memory database (will reset on server restart)
let gamesData: any[] = [
  { id: '1', name: 'PARIS BAZAR', time: '08:00 PM', number1: '40', number2: 'XX', highlighted: false },
  { id: '2', name: 'GALI DISAWAR MIX', time: '08:15 PM', number1: '45', number2: 'XX', highlighted: true },
  { id: '3', name: 'WHITE GOLD', time: '08:15 PM', number1: '37', number2: 'XX', highlighted: false },
  { id: '4', name: 'UP BAZAR', time: '08:15 PM', number1: '10', number2: 'XX', highlighted: false },
  { id: '5', name: 'NEW DELHI DARBAR', time: '08:30 PM', number1: '58', number2: 'XX', highlighted: false },
  { id: '6', name: 'BRIJ RANI', time: '09:00 PM', number1: '73', number2: 'XX', highlighted: false },
  { id: '7', name: 'SHRI VISHNU', time: '09:15 PM', number1: '59', number2: 'XX', highlighted: false },
  { id: '8', name: 'GHAZIABAD', time: '09:25 PM', number1: '79', number2: 'XX', highlighted: true },
  { id: '9', name: 'GHAZIABAD 2', time: '09:35 PM', number1: '64', number2: 'XX', highlighted: false },
  { id: '10', name: 'BALA JI DADRI', time: '10:15 PM', number1: '21', number2: 'XX', highlighted: false },
  { id: '11', name: 'JAISALMER', time: '10:15 PM', number1: '47', number2: 'XX', highlighted: false },
  { id: '12', name: 'CHOTI GALI', time: '10:50 PM', number1: '33', number2: 'XX', highlighted: false },
]

// Monthly data storage
let monthlyData: any = {
  '11': {
    '2025': {
      'DSWR': { '01': 'XX', '02': '37', '03': '89', '04': '29', '05': '92', '06': '68', '07': '94', '08': '85', '09': '08' },
      'FRBD': { '01': '26', '02': '08', '03': '28', '04': '74', '05': '02', '06': '60', '07': '05', '08': '17', '09': 'XX' },
      'GZBD': { '01': '89', '02': '69', '03': '35', '04': '20', '05': '92', '06': '06', '07': '08', '08': '79', '09': 'XX' },
      'GALI': { '01': '40', '02': '75', '03': '07', '04': '79', '05': '80', '06': '73', '07': '19', '08': '53', '09': 'XX' },
    },
  },
}

export async function GET() {
  return NextResponse.json(gamesData)
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, number1, number2, highlighted } = body

    const gameIndex = gamesData.findIndex((g) => g.id === id)
    if (gameIndex === -1) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 })
    }

    if (number1 !== undefined) gamesData[gameIndex].number1 = number1
    if (number2 !== undefined) gamesData[gameIndex].number2 = number2
    if (highlighted !== undefined) gamesData[gameIndex].highlighted = highlighted

    return NextResponse.json(gamesData[gameIndex])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 })
  }
}
