import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ClientsOverview from './pages/Clients'; // Import Clients page
import { useAuthStore } from './store/authStore';
import { supabase } from './lib/supabase';
import LoadingScreen from './components/LoadingScreen';

export function App() {
  const { user, setUser, setSession, initialized } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setSession(null);
      }
    };

    initAuth();
  }, [setUser, setSession]);

  if (!initialized) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/clients" element={user ? <Navigate to="/clients" /> : <ClientsOverview /> } />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
        </Routes>
      </Router>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  );
}
