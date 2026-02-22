import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Bet({ market, wallet, setWallet }) {

  const [game, setGame] = useState("single");
  const [panna, setPanna] = useState("");
  const [amount, setAmount] = useState("");

  const suggestions = {
    single: ["0","1","2","3","4","5","6","7","8","9"],
    jodi: ["10","12","45","67","89"],
    singlePanna: ["120","130","140","230"],
    doublePanna: ["112","223","334","445"],
    triplePanna: ["111","222","333","777"]
  };

  const isMarketOpen = () => {

    const now = new Date().toTimeString().slice(0,5);

    return now >= market.open_time && now < market.close_time;
  };

  const placeBet = async () => {

    if (!isMarketOpen()) {
      alert("Market Closed ❌");
      return;
    }

    if (!amount || amount <= 0) {
      alert("Enter valid amount");
      return;
    }

    if (amount > wallet) {
      alert("Insufficient Balance ❌");
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    // Insert bet
    await supabase.from("bets").insert({
      user_id: userData.user.id,
      market_id: market.id,
      game_type: game,
      panna,
      amount: Number(amount)
    });

    // Deduct wallet
    const newWallet = wallet - amount;

    await supabase
      .from("users")
      .update({ wallet: newWallet })
      .eq("id", userData.user.id);

    setWallet(newWallet);

    alert("Bet Placed ✅");

    setPanna("");
    setAmount("");
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg space-y-3">

      <h2 className="font-bold text-lg">
        🎯 Place Bet — {market.name}
      </h2>

      <select
        value={game}
        onChange={(e)=>setGame(e.target.value)}
        className="w-full p-2 rounded"
      >
        <option value="single">Single Digit</option>
        <option value="jodi">Jodi</option>
        <option value="singlePanna">Single Panna</option>
        <option value="doublePanna">Double Panna</option>
        <option value="triplePanna">Triple Panna</option>
      </select>

      <input
        value={panna}
        onChange={(e)=>setPanna(e.target.value)}
        placeholder="Enter Number"
        className="w-full p-2 rounded"
        list="pannaList"
      />

      <datalist id="pannaList">
        {suggestions[game].map(p=>(
          <option key={p} value={p}/>
        ))}
      </datalist>

      <input
        type="number"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 rounded"
      />

      <button
        onClick={placeBet}
        className="w-full bg-green-500 p-2 rounded font-bold"
      >
        Place Bet
      </button>

    </div>
  );
}