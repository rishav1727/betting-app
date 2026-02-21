import { useState, useContext } from "react"
import { WalletContext } from "../context/WalletContext"

export default function Betting() {

  const { wallet, setWallet } = useContext(WalletContext)

  const [number, setNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [sorted, setSorted] = useState("")
  const [success, setSuccess] = useState(false)
  const [gameType, setGameType] = useState("Single Digit")

  // Panna sorting logic (0 is largest)
  const sortPanna = (num) => {
    const digits = num.split("").map(Number)

    digits.sort((a, b) => {
      const valA = a === 0 ? 10 : a
      const valB = b === 0 ? 10 : b
      return valA - valB
    })

    return digits.join("")
  }

  const handleSubmit = () => {

    if (number.length !== 3 || amount <= 0) {
      alert("Enter valid details")
      return
    }

    if (Number(amount) > wallet) {
      alert("Insufficient Balance ❌")
      return
    }

    const result = sortPanna(number)
    setSorted(result)

    // Deduct wallet safely
    setWallet(wallet - Number(amount))

    // Success UI
    setSuccess(true)

    setTimeout(() => {
      setSuccess(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-6">🎯 Place Your Bet</h1>

      <div className="bg-gray-800 p-6 rounded-xl max-w-md">

        {/* Wallet */}
        <div className="mb-4 text-green-400 font-semibold">
          Wallet: ₹{wallet}
        </div>

        {/* Game Type */}
        <label className="block mb-2 text-sm text-gray-400">
          Game Type
        </label>

        <select
          value={gameType}
          onChange={(e) => setGameType(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
        >
          <option>Single Digit</option>
          <option>Jodi</option>
          <option>Single Panna</option>
          <option>Double Panna</option>
          <option>Triple Panna</option>
        </select>

        {/* Number Input */}
        <label className="block mb-2 text-sm text-gray-400">
          Enter Number
        </label>

        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          placeholder="e.g. 502"
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
        />

        {/* Amount */}
        <label className="block mb-2 text-sm text-gray-400">
          Amount
        </label>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="₹"
          className="w-full p-3 rounded-lg bg-gray-700 mb-4"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 w-full py-3 rounded-lg font-semibold transition"
        >
          Submit Bet
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-4 bg-green-500/20 border border-green-500 p-3 rounded-lg text-green-400">
            ✅ Bet Placed Successfully
          </div>
        )}

        {/* Sorted Output */}
        {sorted && (
          <p className="mt-4 text-green-400">
            ✔ Sorted Panna: {sorted}
          </p>
        )}

      </div>

    </div>
  )
}