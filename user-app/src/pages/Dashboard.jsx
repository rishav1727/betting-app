import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Bet from "../components/Bet";

export default function Dashboard() {

  const [markets, setMarkets] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [now, setNow] = useState(new Date());

  useEffect(() => {

    fetchMarkets();
    fetchWallet();

    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);

  }, []);

  const fetchMarkets = async () => {

    const { data } = await supabase
      .from("markets")
      .select("*")
      .order("created_at");

    setMarkets(data || []);
  };

  const fetchWallet = async () => {

    const { data: userData } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("users")
      .select("wallet")
      .eq("id", userData.user.id)
      .single();

    setWallet(data.wallet);
  };

  const isMarketOpen = (market) => {

    const current = now.toTimeString().slice(0,5);

    return current >= market.open_time &&
           current < market.close_time;
  };

  const getRemainingTime = (closeTime) => {

    const [h, m] = closeTime.split(":");

    const close = new Date();
    close.setHours(h);
    close.setMinutes(m);
    close.setSeconds(0);

    const diff = close - now;

    if (diff <= 0) return "Closed";

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">

      {/* Wallet */}
      <div className="bg-blue-600 p-4 rounded-xl mb-6 flex justify-between">

        <h2 className="text-lg font-bold">
          💰 Wallet Balance
        </h2>

        <div className="text-xl font-bold">
          ₹ {wallet}
        </div>

      </div>

      <h1 className="text-2xl font-bold mb-6">
        🎮 Live Markets
      </h1>

      <div className="grid gap-6">

        {markets.map((m) => {

          const open = isMarketOpen(m);

          return (
            <div
              key={m.id}
              className={`p-5 rounded-xl shadow-lg ${
                open ? "bg-green-600 animate-pulse" : "bg-gray-700"
              }`}
            >

              <div className="flex justify-between">

                <div>
                  <h2 className="text-xl font-semibold">
                    {m.name}
                  </h2>

                  <p className="text-sm">
                    {m.open_time} → {m.close_time}
                  </p>
                </div>

                <div>

                  {open
                    ? <span>⏳ {getRemainingTime(m.close_time)}</span>
                    : <span className="text-red-300">Closed</span>
                  }

                </div>

              </div>

              {open && (
                <div className="mt-4">
                  <Bet
                    market={m}
                    wallet={wallet}
                    setWallet={setWallet}
                  />
                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}