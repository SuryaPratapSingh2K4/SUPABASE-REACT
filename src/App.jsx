import React, { useEffect, useState } from 'react'
import TaskManager from './TaskManager'
import Auth from './auth'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignUp from './SignUp'
import { supabase } from './supabaseClient'

function App() {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    setSession(currentSession.data.session); // ✅ take the session object
    console.log(currentSession);
  };

  useEffect(() => {
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, []);

  return (
    <Router>
      <Routes>
        {session ? (
          <>
            <Route path='/tasks' element={<TaskManager session={session}/>} />
            <Route path='*' element={<TaskManager />} /> {/* default if logged in */}
          </>
        ) : (
          <>
            <Route path='/' element={<Auth />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='*' element={<Auth />} /> {/* default if not logged in */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
