import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Markets() {

  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    fetchMarkets();

    // REALTIME SUBSCRIPTION
    const channel = supabase
      .channel("markets-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "markets" },
        () => fetchMarkets()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  // Fetch markets
  const fetchMarkets = async () => {
    const { data } = await supabase
      .from("markets")
      .select("*")
      .order("created_at");

    setMarkets(data || []);
  };

  // Toggle Open / Close
  const toggleStatus = async (id, current) => {

    await supabase
      .from("markets")
      .update({ status: !current })
      .eq("id", id);
  };

  // Toggle Betting Lock
  const toggleLock = async (id, current) => {

    await supabase
      .from("markets")
      .update({ betting_locked: !current })
      .eq("id", id);
  };

  return (
    <div className="w-full">

      <h1 className="text-3xl font-bold mb-6">
        🎯 Markets Control
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {markets.map((m) => (

          <div
            key={m.id}
            className="bg-gray-800 p-6 rounded-xl shadow-lg space-y-4"
          >

            <h2 className="text-xl font-semibold">
              {m.name}
            </h2>

            <div className="text-sm text-gray-400">
              ⏰ {m.open_time} → {m.close_time}
            </div>

            {/* Status */}
            <div className="flex gap-3">

              <button
                onClick={() => toggleStatus(m.id, m.status)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  m.status
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {m.status ? "Open" : "Closed"}
              </button>

              <button
                onClick={() => toggleLock(m.id, m.betting_locked)}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  m.betting_locked
                    ? "bg-yellow-500"
                    : "bg-gray-600"
                }`}
              >
                {m.betting_locked ? "Locked" : "Unlocked"}
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}