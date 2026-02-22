import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Markets from "./pages/Markets";
import AdminLayout from "./layout/AdminLayout";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Get session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();

  }, []);

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (!session) {
    return <Login />;
  }

  // ✅ ADMIN PROTECTION
  if (session.user.email !== "rishavofficials1727@gmail.com") {
    return <h1 className="text-white p-10">Access Denied ❌</h1>;
  }

  return (
    <AdminLayout>

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>

    </AdminLayout>
  );
}

export default App;