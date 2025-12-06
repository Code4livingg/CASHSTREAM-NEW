import React, { useState } from 'react';
import ConnectWalletPage from './ConnectWalletPage';
import { MatrixBackground } from '../components';
import '../styles/design-system.css';

/**
 * ConnectWalletPageDemo - Standalone demo with interactive preview
 * 
 * Features:
 * - Live preview of ConnectWalletPage
 * - Simulated wallet connection flow
 * - Console logging for debugging
 * - Success state display
 * - Can be used for testing and development
 * 
 * @component
 * @example
 * // In App.tsx
 * import { ConnectWalletPageDemo } from './pages';
 * function App() {
 *   return <ConnectWalletPageDemo />;
 * }
 */

export const ConnectWalletPageDemo: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);

  const handleConnected = () => {
    const newCount = connectionCount + 1;
    setConnectionCount(newCount);
    
    console.log('✅ Wallet connected!', {
      timestamp: new Date().toISOString(),
      connectionCount: newCount,
      status: 'success',
    });
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      
      alert(
        `🎉 Wallet Connected Successfully!\n\n` +
        `✅ Massa Wallet Connected\n` +
        `🔐 Secure Connection Established\n` +
        `⚡ Ready for Autonomous Payments\n\n` +
        `Connection count: ${newCount}`
      );
      
      // Reset after 3 seconds for demo purposes
      setTimeout(() => {
        setIsConnected(false);
      }, 3000);
    }, 500);
  };

  if (isConnected) {
    return (
      <MatrixBackground>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--gradient-bg)',
            padding: 'var(--space-xl)',
          }}
        >
        <div
          className="card animate-scale-in"
          style={{
            maxWidth: '500px',
            width: '100%',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto var(--space-xl)',
              borderRadius: '50%',
              background: 'var(--gradient-success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              animation: 'pulse 1s ease-in-out',
            }}
          >
            ✅
          </div>
          
          <h2 className="text-h2 text-gradient-primary" style={{ marginBottom: 'var(--space-md)' }}>
            Wallet Connected!
          </h2>
          
          <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
            Your Massa wallet is now connected and ready for autonomous payments.
          </p>
          
          <p className="text-small" style={{ marginTop: 'var(--space-lg)', color: 'var(--color-text-tertiary)' }}>
            Resetting demo in 3 seconds...
          </p>
        </div>
        </div>
      </MatrixBackground>
    );
  }

  return (
    <>
      <ConnectWalletPage onConnected={handleConnected} />
      
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
          <div>ConnectWallet Demo</div>
          <div>Connections: {connectionCount}</div>
          <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
        </div>
      )}
    </>
  );
};

export default ConnectWalletPageDemo;
