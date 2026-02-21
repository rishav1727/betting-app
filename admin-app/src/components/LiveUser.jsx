import { useEffect, useState } from "react"

export default function LiveUsers() {

  const [count, setCount] = useState(120)

  useEffect(() => {

    const interval = setInterval(() => {
      setCount(prev => prev + Math.floor(Math.random() * 3))
    }, 3000)

    return () => clearInterval(interval)

  }, [])

  return (
    <div className="bg-gray-800 p-6 rounded-xl">

      <h2 className="text-lg">Live Users</h2>

      <p className="text-3xl font-bold text-green-400 mt-2">
        {count}
      </p>

    </div>
  )
}