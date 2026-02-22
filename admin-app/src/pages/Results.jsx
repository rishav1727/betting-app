import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Results() {

  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [result, setResult] = useState("");
  const [resultsList, setResultsList] = useState([]);

  useEffect(() => {
    fetchMarkets();
    fetchResults();
  }, []);

  // Fetch markets
  const fetchMarkets = async () => {

    const { data } = await supabase
      .from("markets")
      .select("*");

    setMarkets(data || []);
  };

  // Fetch previous results
  const fetchResults = async () => {

    const { data } = await supabase
      .from("results")
      .select("*")
      .order("created_at", { ascending: false });

    setResultsList(data || []);
  };

  // Multiplier logic
  const getMultiplier = (game) => {

    switch (game) {
      case "single":
        return 10;
      case "jodi":
        return 90;
      case "singlePanna":
        return 150;
      case "doublePanna":
        return 300;
      case "triplePanna":
        return 600;
      default:
        return 0;
    }
  };

  // Declare result + payout
  const declareResult = async () => {

    if (!selectedMarket || !result) {
      alert("Select market & enter result");
      return;
    }

    // Save result
    await supabase.from("results").insert([
      {
        market_id: selectedMarket,
        result: result
      }
    ]);

    // Get all bets for this market
    const { data: bets } = await supabase
      .from("bets")
      .select("*")
      .eq("market_id", selectedMarket);

    for (let bet of bets) {

      // Winner condition
      if (bet.panna === result) {

        const multiplier = getMultiplier(bet.game_type);
        const winAmount = bet.amount * multiplier;

        // Get user wallet
        const { data: user } = await supabase
          .from("users")
          .select("wallet")
          .eq("id", bet.user_id)
          .single();

        const newWallet = user.wallet + winAmount;

        // Update wallet
        await supabase
          .from("users")
          .update({ wallet: newWallet })
          .eq("id", bet.user_id);
      }
    }

    alert("Result Declared & Winners Paid ✅");

    setResult("");
    fetchResults();
  };

  return (
    <div className="w-full">

      <h1 className="text-3xl font-bold mb-6">
        🏆 Result System
      </h1>

      {/* Declare Result */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8">

        <h2 className="text-xl mb-4">
          Declare Result
        </h2>

        <div className="flex flex-col md:flex-row gap-4">

          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            className="p-3 rounded bg-gray-700 w-full"
          >
            <option value="">Select Market</option>

            {markets.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}

          </select>

          <input
            value={result}
            onChange={(e) => setResult(e.target.value)}
            placeholder="Enter Result (Example 250)"
            className="p-3 rounded bg-gray-700 w-full"
          />

          <button
            onClick={declareResult}
            className="bg-green-500 px-6 py-3 rounded-lg"
          >
            Declare
          </button>

        </div>

      </div>

      {/* Previous Results */}
      <div className="bg-gray-800 p-6 rounded-xl">

        <h2 className="text-xl mb-4">
          Previous Results
        </h2>

        <div className="space-y-3">

          {resultsList.map((r) => (

            <div
              key={r.id}
              className="flex justify-between bg-gray-700 p-3 rounded"
            >
              <span>{r.market_id}</span>
              <span className="font-bold text-green-400">
                {r.result}
              </span>
            </div>

          ))}

        </div>

      </div>

    </div>
  );
}