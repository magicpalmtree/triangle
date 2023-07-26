'use client';

import { ReactFlowProvider } from 'reactflow';
import TriangleBoard from '@/components/TriangleBoard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ReactFlowProvider>
        <TriangleBoard />
      </ReactFlowProvider>
    </main>
  );
}
