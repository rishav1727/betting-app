import { useEffect, useState } from "react"

export default function ThemeToggle() {

  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="bg-gray-700 px-3 py-2 rounded-lg"
    >
      {dark ? "🌙 Dark" : "☀ Light"}
    </button>
  )
}