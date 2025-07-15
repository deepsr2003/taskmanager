import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
}

export default function SignInForm({ onSubmit, error }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="rounded-base border-2 border-black focus:ring-2 focus:ring-black"
      />
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
}
