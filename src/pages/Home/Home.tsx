import { useState } from 'react';
import { X } from 'lucide-react';  
import { supabase } from '@/lib/supabase';
import { Squares } from '@/components/ui/squares-background';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import SignInForm  from '@/features/auth/components/SignInForm';
import SignUpForm  from '@/features/auth/components/SignUpForm';

export default function HomePage() {

// ---- inside component ---- 
  
const [email, setEmail]   = useState('');
const [pass, setPass]     = useState('');
const [error, setError]   = useState<string | null>(null);

const handleSignUp = async () => {
  setError(null);
  const { data, error } = await signUp(email, pass);
  if (error?.message.includes('already registered'))
    setError('Email already exists');
  else if (error)
    setError(error.message);
  // on success: magic link email sent
};

const handleSignIn = async () => {
  setError(null);
  const { error } = await signIn(email, pass);
  if (error) setError('Invalid credentials');
  // otherwise ProtectedRoute redirects to /interface
};

/* inside the form */
{error && <p className="text-red-600 text-sm mt-2">{error}</p>}


const [mode, setMode] = useState<'signin' | 'signup' | null>(null);

const open = (m: 'signin' | 'signup') => setMode(m);   // always open that mode
const close = () => setMode(null);                     // only used by × button
  return (
    <div className="relative min-h-screen">
      {/* animated grid background */}
      <Squares
        className="fixed inset-0 -z-10"
        direction="diagonal"
        speed={1}
        borderColor="#334155"
        hoverFillColor="#475569"
        squareSize={40}
      />

      <main className="relative z-0 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Hero */}
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Task Monitor
        </h1>
        

        {/* Toggle buttons */}
        
<div className="flex gap-4 mb-6">
  <button
    onClick={() => open('signin')}
  //  onClick={() => setMode(mode === 'signin' ? null : 'signin')}
    className="
      inline-flex items-center justify-center
      h-10 px-4 py-2
      rounded-base border-2 border-black
      shadow-[4px_4px_0_#000]
      bg-white text-black font-semibold
      hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000]
      transition-all
    "
  >
    Sign In
  </button>

  <button
    onClick={() => open('signup')}
  //  onClick={() => setMode(mode === 'signup' ? null : 'signup')}
    className="
      inline-flex items-center justify-center
      h-10 px-4 py-2
      rounded-base border-2 border-black
      shadow-[4px_4px_0_#000]
      bg-white text-black font-semibold
      hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0_#000]
      transition-all
    "
  >
    Sign Up
  </button>
</div>

        {/* Form card */}
        {mode && (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">
                {mode === 'signin' ? 'Welcome back' : 'Create account'}
              </CardTitle>
              <CardDescription>
                {mode === 'signin'
                  ? 'Enter your credentials below'
                  : 'Fill in the details to get started'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {mode === 'signin' ? <SignInForm /> : <SignUpForm />}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
