import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Markets from "./pages/Markets"
import Results from "./pages/Results"
import Users from "./pages/Users"

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/markets" element={<Markets />} />
      <Route path="/results" element={<Results />} />
      <Route path="/users" element={<Users />} />

    </Routes>
  )
}

export default App