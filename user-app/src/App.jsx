import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Betting from "./pages/Betting"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bet" element={<Betting />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App