import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

  }, []);

  if (!session) return <Login />;

  return <Dashboard />;
}

export default App;
await supabase.auth.signOut();
window.location.reload();