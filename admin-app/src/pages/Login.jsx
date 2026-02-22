import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      alert(error.message);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950">

      <div className="bg-gray-800 p-8 rounded-xl w-96 shadow-lg text-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          🔐 Admin Login
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-700"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-700"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}