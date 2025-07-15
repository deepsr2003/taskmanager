// src/App.tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/Home';
import TaskBoard from '@/pages/TaskBoard';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/interface"
          element={
            <ProtectedRoute>
              <TaskBoard />
            </ProtectedRoute>
          }
        />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Layout>
  );
}

/* Magic-link redirect catcher */
function AuthCallback() {
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) window.location.replace('/interface');
    });
  }, []);

  return <p className="text-white">Logging you in…</p>;
}
