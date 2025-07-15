
// src/components/Layout.tsx
import React from 'react';
import { Squares } from '@/components/ui/squares-background';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Squares
        className="absolute inset-0 -z-10"
        direction="diagonal"
        speed={1}
        borderColor="#334155"
        hoverFillColor="#475569"
        squareSize={40}
      />
      <main className="relative z-0">{children}</main>
    </div>
  );
}
