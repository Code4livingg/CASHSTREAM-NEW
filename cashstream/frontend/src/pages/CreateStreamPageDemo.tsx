import React from 'react';
import { CreateStreamPage } from './CreateStreamPage';
import type { WalletConnection } from '../lib/massaWallet';
import '../styles/design-system.css';

/**
 * CreateStreamPageDemo - Demo version with mock data
 * 
 * This demo shows the CreateStreamPage with mock wallet and provider.
 * Perfect for testing the UI without blockchain connection.
 * 
 * @component
 * @example
 * // In App.tsx or for testing:
 * import { CreateStreamPageDemo } from './pages';
 * <CreateStreamPageDemo />
 */

const CreateStreamPageDemo: React.FC = () => {
  // Mock wallet connection
  const mockWallet: WalletConnection = {
    address: 'AU12CzXE7mHZSvRxT9vGJKwP8bqKDeMHvPJYQHKvXJpgFKqJqQqN',
    balance: '1000000000',
    provider: undefined as any,
    account: undefined as any,
  };

  // Mock provider (optional - CreateStreamPage handles undefined)
  const mockProvider = undefined;

  // Handlers
  const handleStreamCreated = () => {
    console.log('✅ Demo: Stream created successfully!');
    alert('Stream created! In production, this would navigate to active streams.');
  };

  const handleBack = () => {
    console.log('← Demo: Back button clicked');
    alert('Back clicked! In production, this would navigate to dashboard.');
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
          background: 'rgba(255, 107, 107, 0.9)',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          zIndex: 9999,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p className="text-small" style={{ color: 'white', fontWeight: 'var(--font-semibold)' }}>
          🎨 DEMO MODE - Using mock wallet and provider
        </p>
      </div>

      {/* Add padding to account for fixed banner */}
      <div style={{ paddingTop: '48px' }}>
        <CreateStreamPage
          wallet={mockWallet}
          provider={mockProvider}
          onStreamCreated={handleStreamCreated}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default CreateStreamPageDemo;
