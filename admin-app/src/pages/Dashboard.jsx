import { useEffect, useState } from "react"
import AdminLayout from "../layout/AdminLayout"
import { supabase } from "../lib/supabase"

export default function Dashboard() {

  const [users, setUsers] = useState(0)
  const [bets, setBets] = useState(0)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {

    // Users count
    const { data: usersData } =
      await supabase.from("users").select("*")

    // Bets
    const { data: betsData } =
      await supabase.from("bets").select("*")

    setUsers(usersData?.length || 0)
    setBets(betsData?.length || 0)

    // Revenue calculation example
    const total =
      betsData?.reduce(
        (sum, b) => sum + b.amount,
        0
      ) || 0

    setRevenue(total)

  }

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        📊 Dashboard
      </h1>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">

        <div className="bg-gray-800 p-6 rounded-xl">
          <p className="text-gray-400">Total Users</p>
          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {users}
          </h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <p className="text-gray-400">Total Bets</p>
          <h2 className="text-3xl font-bold text-yellow-400 mt-2">
            {bets}
          </h2>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <p className="text-gray-400">Revenue</p>
          <h2 className="text-3xl font-bold text-red-400 mt-2">
            ₹{revenue}
          </h2>
        </div>

      </div>

      {/* Placeholder for Charts */}
      <div className="grid gap-6 lg:grid-cols-2">

        <div className="bg-gray-800 p-6 rounded-xl h-64 flex items-center justify-center">
          📈 Revenue Chart (Next Step)
        </div>

        <div className="bg-gray-800 p-6 rounded-xl h-64 flex items-center justify-center">
          👥 Live Users Panel
        </div>

      </div>

    </AdminLayout>
  )
}