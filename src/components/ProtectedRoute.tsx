// src/components/ProtectedRoute.tsx
// src/components/ProtectedRoute.tsx
import { useState, useEffect } from 'react';
// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading…</p>;
  return user ? children : <Navigate to="/" replace />;
}
