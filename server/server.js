require("dotenv").config()

const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

// ============================
// SUPABASE CONNECTION
// ============================

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ============================
// TEST ROUTE
// ============================

app.get("/", (req, res) => {
  res.send("API Running 🚀")
})


// ============================
// USERS API
// ============================

// Get all users
app.get("/users", async (req, res) => {

  const { data, error } = await supabase
    .from("users")
    .select("*")

  if (error) return res.status(500).json(error)

  res.json(data)
})


// ============================
// MARKETS API
// ============================

// Get markets
app.get("/markets", async (req, res) => {

  const { data, error } = await supabase
    .from("markets")
    .select("*")
    .order("created_at")

  if (error) return res.status(500).json(error)

  res.json(data)
})


// Toggle market open/close
app.post("/markets/toggle", async (req, res) => {

  const { id, status } = req.body

  const { error } = await supabase
    .from("markets")
    .update({ status })
    .eq("id", id)

  if (error) return res.status(500).json(error)

  res.json({ success: true })
})


// ============================
// BETS API
// ============================

// Place Bet
app.post("/bets/place", async (req, res) => {

  const { user_id, market_id, panna, amount } = req.body

  const { data, error } = await supabase
    .from("bets")
    .insert([
      {
        user_id,
        market_id,
        panna,
        amount
      }
    ])

  if (error) return res.status(500).json(error)

  res.json({
    success: true,
    data
  })
})


// Get Bets
app.get("/bets", async (req, res) => {

  const { data, error } = await supabase
    .from("bets")
    .select("*")

  if (error) return res.status(500).json(error)

  res.json(data)
})


// ============================
// RESULTS API
// ============================

// Declare Result
app.post("/results/declare", async (req, res) => {

  const { market_id, winning_number } = req.body

  const { error } = await supabase
    .from("results")
    .insert([
      {
        market_id,
        winning_number
      }
    ])

  if (error) return res.status(500).json(error)

  res.json({
    success: true
  })
})


// Get Results
app.get("/results", async (req, res) => {

  const { data, error } = await supabase
    .from("results")
    .select("*")

  if (error) return res.status(500).json(error)

  res.json(data)
})


// ============================
// SERVER START
// ============================

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})