import React from 'react';
import { HistoryPage } from './HistoryPage';
import type { WalletConnection } from '../lib/massaWallet';
import type { JsonRpcProvider } from '@massalabs/massa-web3';
import '../styles/design-system.css';

/**
 * HistoryPageDemo - Demo version with mock history data
 * 
 * This demo shows the HistoryPage with mock completed and canceled streams.
 * Perfect for testing the UI without blockchain connection.
 * 
 * @component
 * @example
 * // In App.tsx or for testing:
 * import { HistoryPageDemo } from './pages';
 * <HistoryPageDemo />
 */

const HistoryPageDemo: React.FC = () => {
  // Mock wallet connection
  const mockWallet: WalletConnection = {
    address: 'AU12CzXE7mHZSvRxT9vGJKwP8bqKDeMHvPJYQHKvXJpgFKqJqQqN',
    balance: '1000000000',
    provider: undefined as any,
    account: undefined as any,
  };

  // Mock provider with readStorage that returns mock history data
  const mockProvider = {
    readStorage: async (_address: string, _keys: any[]) => {
      console.log('📖 Demo: Reading storage for history');
      
      // Return mock history data
      const mockHistory = [
        {
          receiver: 'AU12CzXE7mHZSvRxT9vGJKwP8bqKDeMHvPJYQHKvXJpgFKqJqQqN',
          amount: '1000',
          interval: '100',
          counter: '50',
          status: 'Completed',
          timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          historyId: 'history-1',
        },
        {
          receiver: 'AU1wN7mCZ8qQvJ3FxYzKvP9bqKDeMHvPJYQHKvXJpgFKqJqQqN',
          amount: '500',
          interval: '50',
          counter: '100',
          status: 'Completed',
          timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          historyId: 'history-2',
        },
        {
          receiver: 'AU1xY8nDZ9rRwK4GyZLwP0cqLEfNIwQKZRILwYKrYLrRsRtUvW',
          amount: '2000',
          interval: '200',
          counter: '25',
          status: 'Canceled',
          timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          historyId: 'history-3',
        },
        {
          receiver: 'AU1zZ9oEA0sSwL5HzAMxQ1drMFgOJxRLaSJMxZLsZMsSsTuVwX',
          amount: '750',
          interval: '75',
          counter: '10',
          status: 'Canceled',
          timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          historyId: 'history-4',
        },
      ];

      const encoded = new TextEncoder().encode(JSON.stringify(mockHistory));
      return [encoded, new Uint8Array(), new Uint8Array(), new Uint8Array()];
    },
  } as unknown as JsonRpcProvider;

  // Handlers
  const handleBack = () => {
    console.log('← Demo: Back button clicked');
    alert('Back clicked! In production, this would navigate to dashboard.');
  };

  const handleCreateStream = () => {
    console.log('➕ Demo: Create stream button clicked');
    alert('Create stream clicked! In production, this would navigate to create stream page.');
  };

  return (
    <div>
      {/* Demo Banner */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: 'var(--space-sm)',
          background: 'rgba(179, 136, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          zIndex: 9999,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p className="text-small" style={{ color: 'white', fontWeight: 'var(--font-semibold)' }}>
          🎨 DEMO MODE - Using mock history data (2 completed, 2 canceled)
        </p>
      </div>

      {/* Add padding to account for fixed banner */}
      <div style={{ paddingTop: '48px' }}>
        <HistoryPage
          wallet={mockWallet}
          provider={mockProvider}
          onBack={handleBack}
          onCreateStream={handleCreateStream}
        />
      </div>
    </div>
  );
};

export default HistoryPageDemo;
