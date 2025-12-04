import React, { useState } from 'react';
import type { JsonRpcProvider } from '@massalabs/massa-web3';
import { Args, Address } from '@massalabs/massa-web3';
import type { WalletConnection } from '../lib/massaWallet';
import { formatAddress } from '../lib/massaWallet';
import '../styles/design-system.css';

/**
 * CreateStreamPage - Production-ready page for creating payment streams
 * 
 * Features:
 * - Form with receiver, amount, interval inputs
 * - Input validation
 * - Neon focus states
 * - Creates stream on Massa blockchain
 * - Loading states
 * - Success animation
 * - Error handling
 * - Design system integration
 * 
 * @component
 * @example
 * <CreateStreamPage
 *   wallet={wallet}
 *   provider={provider}
 *   onStreamCreated={() => navigate('/streams')}
 *   onBack={() => navigate('/dashboard')}
 * />
 */

interface CreateStreamPageProps {
  /** Wallet connection */
  wallet: WalletConnection;
  /** JSON RPC provider */
  provider?: JsonRpcProvider;
  /** Callback when stream is created successfully */
  onStreamCreated?: (streamData?: { receiver: string; amount: string; interval: string }) => void;
  /** Callback to go back */
  onBack?: () => void;
}

const CONTRACT_ADDRESS = import.meta.env.VITE_CASHSTREAM_ADDRESS ?? '';
const RPC_URL = import.meta.env.VITE_MASSA_RPC_URL;

export const CreateStreamPage: React.FC<CreateStreamPageProps> = ({
  wallet,
  provider,
  onStreamCreated,
  onBack,
}) => {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [interval, setInterval] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdStream, setCreatedStream] = useState<{
    receiver: string;
    amount: string;
    interval: string;
  } | null>(null);

  // Auto-fill receiver with wallet address
  const handleAutoFill = () => {
    setReceiver(wallet.address);
    console.log('📋 Auto-filled receiver with wallet address');
  };

  // Validate inputs
  const validateInputs = (): string | null => {
    if (!receiver.trim()) {
      return 'Receiver address is required';
    }

    // Only validate address format if we have a provider (not in demo mode)
    if (provider) {
      try {
        Address.fromString(receiver.trim());
      } catch {
        return 'Invalid receiver address format';
      }
    } else {
      // In demo mode, just check if it looks like an address (starts with AU)
      if (!receiver.trim().startsWith('AU')) {
        return 'Address should start with AU';
      }
    }

    const amountNum = parseInt(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return 'Amount must be a positive number';
    }

    const intervalNum = parseInt(interval);
    if (isNaN(intervalNum) || intervalNum <= 0) {
      return 'Interval must be a positive number';
    }

    return null;
  };

  // Create stream on blockchain
  const handleCreateStream = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate inputs
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!CONTRACT_ADDRESS) {
      setError('Contract address not configured');
      return;
    }

    setLoading(true);

    try {
      console.log('🚀 Creating stream...');
      console.log('Receiver:', receiver);
      console.log('Amount:', amount);
      console.log('Interval:', interval);

      // Demo mode: Skip blockchain call if no provider
      if (!provider) {
        console.log('🎨 Demo mode: Simulating stream creation...');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('✅ Demo: Stream created successfully!');
      } else {
        // Real mode: Call blockchain
        // Build Args
        const args = new Args()
          .addString(receiver.trim())
          .addU64(BigInt(amount))
          .addU64(BigInt(interval));

        // Call smart contract
        const mw3: any = require('@massalabs/massa-web3');
        const WalletClient = mw3.WalletClient ?? mw3.Wallet;
        const walletClient = new WalletClient(RPC_URL, wallet.account);

        const result = await walletClient.callSmartContract({
          targetAddress: CONTRACT_ADDRESS,
          functionName: 'createStream',
          parameter: args.serialize(),
          maxGas: 100000000,
          fee: BigInt(100000000),
          coins: 0n,
        });

        console.log('✅ Stream created successfully!', result);
      }

      // Store created stream data
      const streamData = {
        receiver: receiver.trim(),
        amount,
        interval,
      };
      
      setCreatedStream(streamData);

      // Show success state
      setSuccess(true);
      setLoading(false);

      // Clear form
      setReceiver('');
      setAmount('');
      setInterval('');

      // Navigate after 1 second (faster redirect)
      setTimeout(() => {
        if (onStreamCreated) {
          onStreamCreated(streamData);
        }
      }, 1000);
    } catch (err) {
      console.error('❌ Failed to create stream:', err);
      setError(err instanceof Error ? err.message : 'Failed to create stream');
      setLoading(false);
    }
  };

  // Success state
  if (success && createdStream) {
    return (
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
            maxWidth: '600px',
            width: '100%',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
          }}
        >
          <div
            className="animate-neon-pulse"
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
              boxShadow: '0 0 30px rgba(57, 255, 20, 0.5)',
            }}
          >
            ✅
          </div>

          <h2 className="text-h2 text-gradient-primary" style={{ marginBottom: 'var(--space-md)' }}>
            Stream Created!
          </h2>

          <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            Your autonomous payment stream is now active on the Massa blockchain
          </p>

          <div
            style={{
              padding: 'var(--space-lg)',
              background: 'rgba(110, 231, 255, 0.05)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(110, 231, 255, 0.2)',
              textAlign: 'left',
            }}
          >
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                Receiver
              </p>
              <p
                className="text-body"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-neon-cyan)',
                  fontWeight: 'var(--font-semibold)',
                  wordBreak: 'break-all',
                }}
              >
                {formatAddress(createdStream.receiver)}
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-md)',
              }}
            >
              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Amount
                </p>
                <p className="text-h3 text-gradient-primary" style={{ fontWeight: 'var(--font-bold)' }}>
                  {createdStream.amount}
                </p>
              </div>

              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Interval
                </p>
                <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                  {createdStream.interval} cycles
                </p>
              </div>
            </div>
          </div>

          <p className="text-small" style={{ marginTop: 'var(--space-lg)', color: 'var(--color-text-tertiary)' }}>
            Redirecting to streams...
          </p>
        </div>
      </div>
    );
  }

  // Form state
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-bg)',
        padding: 'var(--space-xl)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <header className="animate-fade-in-up" style={{ marginBottom: 'var(--space-2xl)' }}>
          {onBack && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={onBack}
              style={{ marginBottom: 'var(--space-sm)' }}
            >
              ← Back to Dashboard
            </button>
          )}
          <p className="eyebrow" style={{ marginBottom: 'var(--space-sm)' }}>
            NEW STREAM
          </p>
          <h1 className="text-display header-neon" style={{ marginBottom: 'var(--space-md)' }}>
            Create Stream
          </h1>
          <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
            Configure and launch an autonomous payment stream
          </p>
        </header>

        {/* Form Card */}
        <div className="card card-glow animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="card-header">
            <h2 className="card-title">Stream Configuration</h2>
          </div>

          <form onSubmit={handleCreateStream}>
            <div className="card-body">
              {/* Error Message */}
              {error && (
                <div
                  className="animate-fade-in-up"
                  style={{
                    marginBottom: 'var(--space-lg)',
                    padding: 'var(--space-md)',
                    background: 'rgba(255, 107, 107, 0.1)',
                    border: '1px solid var(--color-error)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <p className="text-small" style={{ color: 'var(--color-error)' }}>
                    ⚠️ {error}
                  </p>
                </div>
              )}

              {/* Receiver Address */}
              <div className="input-group" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="input-label input-label-required">Receiver Address</label>
                <input
                  type="text"
                  className="input"
                  value={receiver}
                  onChange={(e) => setReceiver(e.target.value)}
                  placeholder="AU12CzXE7mHZSvRx..."
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={handleAutoFill}
                  disabled={loading}
                  style={{ marginTop: 'var(--space-xs)' }}
                >
                  📋 Use my wallet address
                </button>
              </div>

              {/* Amount */}
              <div className="input-group" style={{ marginBottom: 'var(--space-lg)' }}>
                <label className="input-label input-label-required">Amount (u64)</label>
                <input
                  type="number"
                  className="input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1000"
                  min="1"
                  required
                  disabled={loading}
                />
                <span className="input-helper">Amount to send per interval</span>
              </div>

              {/* Interval */}
              <div className="input-group">
                <label className="input-label input-label-required">Interval (u64 cycles)</label>
                <input
                  type="number"
                  className="input"
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  placeholder="100"
                  min="1"
                  required
                  disabled={loading}
                />
                <span className="input-helper">Number of cycles between payments</span>
              </div>
            </div>

            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-sm)',
                }}
              >
                {loading ? (
                  <>
                    <div className="spinner" style={{ width: '20px', height: '20px' }} />
                    Creating Stream...
                  </>
                ) : (
                  '🚀 Create Stream'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Tip */}
        <div
          className="animate-fade-in-up"
          style={{
            marginTop: 'var(--space-xl)',
            padding: 'var(--space-lg)',
            background: 'rgba(110, 231, 255, 0.05)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(110, 231, 255, 0.1)',
            animationDelay: '0.2s',
          }}
        >
          <p className="text-small" style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            💡 <strong style={{ color: 'var(--color-neon-cyan)' }}>Pro Tip:</strong> Once created, your stream will execute autonomously on-chain without manual intervention
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateStreamPage;
