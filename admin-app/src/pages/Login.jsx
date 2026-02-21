import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState(1)

  const navigate = useNavigate()

  // Send OTP
  const sendOTP = async () => {

    const { error } =
      await supabase.auth.signInWithOtp({
        phone: phone
      })

    if (error) {
      alert(error.message)
    } else {
      alert("OTP Sent ✅")
      setStep(2)
    }

  }

  // Verify OTP
  const verifyOTP = async () => {

    const { data, error } =
      await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: "sms"
      })

    if (error) {
      alert(error.message)
    } else {
      alert("Login Success 🎉")
      navigate("/dashboard")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-950">

      <div className="bg-gray-800 p-8 rounded-xl w-96 text-white">

        <h1 className="text-2xl font-bold mb-6 text-center">
          📱 Login with OTP
        </h1>

        {step === 1 && (
          <>
            <input
              placeholder="Enter Phone (+91XXXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 mb-4"
            />

            <button
              onClick={sendOTP}
              className="bg-blue-500 w-full py-3 rounded-lg"
            >
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 mb-4"
            />

            <button
              onClick={verifyOTP}
              className="bg-green-500 w-full py-3 rounded-lg"
            >
              Verify OTP
            </button>
          </>
        )}

      </div>

    </div>
  )
}