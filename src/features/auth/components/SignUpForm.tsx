// src/features/auth/components/SignUpForm.tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match');
      return;
    }
    // TODO: wire to real API
    console.log('Sign-up:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <label className="text-sm font-semibold mb-1 block">Email</label>
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="text-sm font-semibold mb-1 block">Password</label>
        <Input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
        />
      </div>

      <div>
        <label className="text-sm font-semibold mb-1 block">Confirm Password</label>
        <Input
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
        />
      </div>

      <Button type="submit" className="w-full">
        Create Account
      </Button>
    </form>
  );
}
