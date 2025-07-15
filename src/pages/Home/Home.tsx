//Home.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Squares } from '@/components/ui/squares-background';
import SignInForm from '@/features/auth/components/SignInForm';
import SignUpForm from '@/features/auth/components/SignUpForm';
import { signIn, signUp } from '@/lib/auth';




export default function HomePage() {
  const [mode, setMode] = useState<'signin' | 'signup' | null>(null);
  const [error, setError] = useState<string | undefined>();

  const handleSignIn = async (email: string, password: string) => {
    setError(undefined);
    const { error } = await signIn(email, password);
    if (error) setError('Invalid credentials');
  };

  const handleSignUp = async (email: string, password: string) => {
    setError(undefined);
    const { error } = await signUp(email, password);
    if (error?.message.includes('already registered'))
      setError('Email already exists');
    else if (error) setError(error.message);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#060606]">
      <Squares
        className="absolute inset-0 -z-10"
        direction="diagonal"
        speed={1}
        borderColor="#334155"
        hoverFillColor="#475569"
        squareSize={40}
      />
      <main className="relative z-10 flex flex-col items-center justify-center h-full p-4 space-y-6">
        <h1 className="text-4xl font-bold text-white drop-shadow">Task Manager</h1>

        <div className="flex gap-4">
          <Button onClick={() => setMode('signin')} variant={mode === 'signin' ? 'reverse' : 'default'}>
            Sign In
          </Button>
          <Button onClick={() => setMode('signup')} variant={mode === 'signup' ? 'reverse' : 'default'}>
            Sign Up
          </Button>
        </div>

        {mode && (
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>{mode === 'signin' ? 'Welcome back' : 'Create account'}</CardTitle>
            </CardHeader>
            <CardContent>
              {mode === 'signin' ? (
                <SignInForm onSubmit={handleSignIn} error={error} />
              ) : (
                <SignUpForm onSubmit={handleSignUp} error={error} />
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
