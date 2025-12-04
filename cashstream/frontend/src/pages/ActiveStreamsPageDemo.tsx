import React from 'react';
import ActiveStreamsPage from './ActiveStreamsPage';
import type { WalletConnection } from '../lib/massaWallet';
import { Account, JsonRpcProvider } from '@massalabs/massa-web3';
import '../styles/design-system.css';

/**
 * ActiveStreamsPageDemo - Standalone demo with mock data
 * 
 * Features:
 * - Mock wallet and provider
 * - Mock stream data (no blockchain needed)
 * - Can be used for development and demos
 * 
 * @component
 * @example
 * import { ActiveStreamsPageDemo } from './pages';
 * function App() {
 *   return <ActiveStreamsPageDemo />;
 * }
 */

export const ActiveStreamsPageDemo: React.FC = () => {
  // Create mock wallet
  const mockWallet: WalletConnection = {
    account: {} as Account,
    provider: {} as JsonRpcProvider,
    address: 'AU12CzXE7mHZSvRxPrVxKFKqhNvVbKvNqHvHzHvKqNvVbKvNqHvHz',
    balance: '1234.5678',
  };

  const handleCreateStream = () => {
    console.log('➕ Create Stream clicked (demo)');
    alert('Create Stream functionality - navigate to create page');
  };

  const handleBack = () => {
    console.log('← Back clicked (demo)');
    alert('Back to Dashboard - navigate to dashboard');
  };

  return (
    <>
      <ActiveStreamsPage
        wallet={mockWallet}
        onCreateStream={handleCreateStream}
        onBack={handleBack}
      />

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
          <div>ActiveStreams Demo</div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
            Using mock data
          </div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
            Auto-refresh: 6s
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveStreamsPageDemo;
