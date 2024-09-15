'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./components/HeavyComponent'));

export default function Home() {
  const [isVisible, setVisible] = useState(false);
  return (
    <main>
      <button onClick={() => setVisible(true)}>Show</button>
      {isVisible && <HeavyComponent />}
    </main>
  );
}
