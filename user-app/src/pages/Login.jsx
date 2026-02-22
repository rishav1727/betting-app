import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // SEND OTP
  const sendOtp = async () => {

    if (!phone) return alert("Enter mobile number");

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone: "+91" + phone
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("OTP Sent");
      setStep(2);
    }
  };

  // VERIFY OTP
  const verifyOtp = async () => {

    setLoading(true);

    const { error } = await supabase.auth.verifyOtp({
      phone: "+91" + phone,
      token: otp,
      type: "sms"
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Login Success");
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-black">

      <div className="bg-gray-900 p-8 rounded-2xl w-96 shadow-xl">

        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          📱 Mobile Login
        </h1>

        {step === 1 && (
          <>
            <input
              type="number"
              placeholder="Enter Mobile"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-500 py-3 rounded-lg font-bold"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white mb-4"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-blue-500 py-3 rounded-lg font-bold"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

      </div>
    </div>
  );
}