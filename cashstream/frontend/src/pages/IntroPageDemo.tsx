import React, { useState } from 'react';
import IntroPage from './IntroPage';
import '../styles/design-system.css';

/**
 * IntroPageDemo - Standalone demo with interactive preview
 * 
 * Features:
 * - Live preview of IntroPage
 * - Console logging for debugging
 * - Demo alert on button click
 * - Can be used for testing and development
 * 
 * @component
 * @example
 * // In App.tsx
 * import { IntroPageDemo } from './pages';
 * function App() {
 *   return <IntroPageDemo />;
 * }
 */

export const IntroPageDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);

  const handleGetStarted = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    console.log('🚀 Get Started clicked!', {
      timestamp: new Date().toISOString(),
      clickCount: newCount,
    });
    
    alert(
      `Welcome to CashStream! 🚀\n\n` +
      `✨ Autonomous Crypto Payments\n` +
      `⚡ Powered by Massa Blockchain\n\n` +
      `This would navigate to the main dashboard.\n\n` +
      `Click count: ${newCount}`
    );
  };

  return (
    <>
      <IntroPage onGetStarted={handleGetStarted} />
      
      {/* Debug info (only visible in dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--space-md)',
            right: 'var(--space-md)',
            padding: 'var(--space-sm) var(--space-md)',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-md)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neon-cyan)',
            fontFamily: 'var(--font-mono)',
            zIndex: 9999,
            border: '1px solid var(--color-neon-cyan)',
          }}
        >
          <div>IntroPage Demo</div>
          <div>Clicks: {clickCount}</div>
        </div>
      )}
    </>
  );
};

export default IntroPageDemo;
