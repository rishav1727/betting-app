const express = require("express")
const cors = require("cors")
require("dotenv").config()

const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

/* ================================
   SUPABASE CONNECTION
================================ */

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

/* ================================
   ROOT
================================ */

app.get("/", (req, res) => {
  res.send("API Running 🚀")
})

/* ================================
   PLACE BET API
================================ */

app.post("/place-bet", async (req, res) => {

  const { user_id, market_id, panna, amount } = req.body

  try {

    // Check market
    const { data: market } = await supabase
      .from("markets")
      .select("*")
      .eq("id", market_id)
      .single()

    if (!market || !market.status || market.betting_locked)
      return res.status(400).json({ error: "Betting closed" })

    // Check user wallet
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id)
      .single()

    if (!user || user.wallet < amount)
      return res.status(400).json({ error: "Insufficient balance" })

    // Deduct wallet
    await supabase
      .from("users")
      .update({
        wallet: user.wallet - amount
      })
      .eq("id", user_id)

    // Insert bet
    await supabase
      .from("bets")
      .insert({
        user_id,
        market_id,
        panna,
        amount
      })

    res.json({ success: true })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

/* ================================
   DECLARE RESULT + WINNING SYSTEM
================================ */

app.post("/declare-result", async (req, res) => {

  const { market_id, result_number } = req.body

  try {

    // Save result
    await supabase
      .from("results")
      .insert({
        market_id,
        result_number
      })

    // Get all bets of this market
    const { data: bets } = await supabase
      .from("bets")
      .select("*")
      .eq("market_id", market_id)

    // Winning logic
    for (const bet of bets) {

      if (bet.panna === result_number) {

        const winAmount = bet.amount * 90

        // Get user
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .eq("id", bet.user_id)
          .single()

        // Update wallet
        await supabase
          .from("users")
          .update({
            wallet: user.wallet + winAmount
          })
          .eq("id", bet.user_id)

      }

    }

    res.json({ success: true })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

/* ================================
   MARKET AUTO OPEN / CLOSE SYSTEM
================================ */

setInterval(async () => {

  const { data: markets } = await supabase
    .from("markets")
    .select("*")

  if (!markets) return

  const now = new Date()
  const currentTime = now.toTimeString().slice(0, 5)

  for (const market of markets) {

    const shouldOpen =
      currentTime >= market.open_time &&
      currentTime < market.close_time

    if (shouldOpen !== market.status) {

      await supabase
        .from("markets")
        .update({ status: shouldOpen })
        .eq("id", market.id)

    }

  }

}, 30000) // every 30 seconds

/* ================================
   GET DASHBOARD STATS
================================ */

app.get("/stats", async (req, res) => {

  try {

    const { count: users } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })

    const { data: bets } = await supabase
      .from("bets")
      .select("amount")

    const totalRevenue = bets?.reduce((a, b) => a + b.amount, 0) || 0

    res.json({
      users,
      bets: bets?.length || 0,
      revenue: totalRevenue
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }

})

/* ================================
   SERVER START
================================ */

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`)
})