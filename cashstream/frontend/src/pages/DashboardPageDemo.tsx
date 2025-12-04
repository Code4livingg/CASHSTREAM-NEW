import React from 'react';
import DashboardPage from './DashboardPage';
import type { WalletConnection } from '../lib/massaWallet';
import { Account, JsonRpcProvider } from '@massalabs/massa-web3';
import '../styles/design-system.css';

/**
 * DashboardPageDemo - Standalone demo with mock wallet data
 * 
 * Features:
 * - Mock wallet connection for testing
 * - Live preview of DashboardPage
 * - No actual blockchain connection needed
 * - Can be used for development and demos
 * 
 * @component
 * @example
 * // In App.tsx for testing
 * import { DashboardPageDemo } from './pages';
 * function App() {
 *   return <DashboardPageDemo />;
 * }
 */

export const DashboardPageDemo: React.FC = () => {
  // Create mock wallet connection for demo
  const mockWallet: WalletConnection = {
    account: {} as Account, // Mock account (not used in display)
    provider: {} as JsonRpcProvider, // Mock provider (not used in display)
    address: 'AU12CzXE7mHZSvRxPrVxKFKqhNvVbKvNqHvHzHvKqNvVbKvNqHvHz',
    balance: '1234.5678',
  };

  return (
    <>
      <DashboardPage wallet={mockWallet} />
      
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
          <div>Dashboard Demo</div>
          <div>Mock Wallet</div>
          <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)' }}>
            Using test data
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPageDemo;
