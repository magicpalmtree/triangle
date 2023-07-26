'use client';

import { ReactFlowProvider } from 'reactflow';
import TriangleBoard from '@/components/TriangleBoard';
import { Transition } from '@headlessui/react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <ReactFlowProvider>
        <TriangleBoard />
      </ReactFlowProvider>
    </main>
  );
}
