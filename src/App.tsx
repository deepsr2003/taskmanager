// src/App.tsx
// src/App.tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage   from '@/pages/Home';
import TaskBoard  from '@/pages/TaskBoard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

/* Magic-link redirect catcher */
// src/App.tsx
function AuthCallback() {
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) window.location.replace('/interface');
    });
  }, []);

  return <p>Logging you in…</p>;
}
