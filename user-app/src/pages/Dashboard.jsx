import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { WalletContext } from "../context/WalletContext"

export default function Dashboard() {

  const navigate = useNavigate()
  const { wallet } = useContext(WalletContext)

  const [timeLeft, setTimeLeft] = useState(3600)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60

    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-950 text-white p-6">

      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        🎮 Betting Dashboard
      </h1>

      {/* Wallet */}
      <div className="bg-gray-800 p-4 rounded-xl mb-6 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-gray-400 text-sm">Wallet Balance</p>
          <h2 className="text-2xl font-bold text-green-400">₹{wallet}</h2>
        </div>

        <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition">
          Add Money
        </button>
      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Market 1 */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-green-500 
        hover:scale-105 transition duration-300 hover:shadow-green-500/50 animate-pulse">

          <h2 className="text-xl font-semibold">Laxmi Morning</h2>
          <p className="text-green-400 mt-2 font-medium">Open</p>
          <p className="text-sm text-gray-400">09:00 AM - 12:00 PM</p>

          <p className="text-yellow-400 text-sm mt-2">
            ⏳ Time Left: {formatTime(timeLeft)}
          </p>

          <button
            onClick={() => navigate("/bet")}
            className="mt-4 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Place Bet
          </button>
        </div>

        {/* Market 2 */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-red-500 
        hover:scale-105 transition duration-300 hover:shadow-red-500/40">

          <h2 className="text-xl font-semibold">Shridevi Morning</h2>
          <p className="text-red-400 mt-2 font-medium">Closed</p>
          <p className="text-sm text-gray-400">01:00 PM - 03:00 PM</p>

          <button className="mt-4 bg-red-500 px-4 py-2 rounded-lg text-sm font-semibold">
            Closed
          </button>
        </div>

        {/* Market 3 */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-500 
        hover:scale-105 transition duration-300 hover:shadow-gray-500/40">

          <h2 className="text-xl font-semibold">Karnatak Day</h2>
          <p className="text-gray-400 mt-2 font-medium">Upcoming</p>
          <p className="text-sm text-gray-400">04:00 PM - 07:00 PM</p>

          <button className="mt-4 bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold">
            Coming Soon
          </button>
        </div>

      </div>

    </div>
  )
} 