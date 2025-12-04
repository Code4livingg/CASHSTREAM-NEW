import React, { useState, useEffect } from 'react';
import type { JsonRpcProvider } from '@massalabs/massa-web3';
import { strToBytes } from '@massalabs/massa-web3';
import type { WalletConnection } from '../lib/massaWallet';
import { formatAddress } from '../lib/massaWallet';
import '../styles/design-system.css';

/**
 * HistoryPage - Production-ready page for viewing stream history
 * 
 * Features:
 * - Fetches history from Massa blockchain
 * - Shows completed and canceled streams
 * - Timeline-style cards with status badges
 * - Auto-refreshes every 8 seconds
 * - Responsive grid layout
 * - Staggered fade-in animations
 * - Loading and empty states
 * - Design system integration
 * 
 * @component
 * @example
 * <HistoryPage wallet={wallet} provider={provider} onBack={() => navigate('/dashboard')} />
 */

interface HistoryEntry {
  receiver: string;
  amount: string;
  interval: string;
  counter: string;
  status: 'Completed' | 'Canceled';
  timestamp?: string;
  historyId: string;
  totalStreamed: number;
}

interface HistoryPageProps {
  /** Wallet connection from onboarding */
  wallet: WalletConnection;
  /** JSON RPC provider for blockchain queries */
  provider?: JsonRpcProvider;
  /** Callback when user wants to go back */
  onBack?: () => void;
  /** Callback when user wants to create a stream */
  onCreateStream?: () => void;
}

const CONTRACT_ADDRESS = import.meta.env.VITE_CASHSTREAM_ADDRESS ?? '';

export const HistoryPage: React.FC<HistoryPageProps> = ({
  wallet,
  provider,
  onBack,
  onCreateStream,
}) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch history from blockchain
  const fetchHistory = async (isRefresh = false) => {
    if (!CONTRACT_ADDRESS) {
      console.warn('Contract address not configured');
      setLoading(false);
      return;
    }

    if (isRefresh) {
      setRefreshing(true);
    }

    try {
      const rpcProvider = provider || wallet.provider;
      
      // Demo mode: Return empty history if no provider
      if (!rpcProvider) {
        console.log('🎨 Demo mode: No history to display');
        setHistory([]);
        setLoading(false);
        setRefreshing(false);
        return;
      }
      
      // Try to read STREAM_HISTORY or HISTORY key
      const historyKeys = [
        strToBytes('STREAM_HISTORY'),
        strToBytes('HISTORY'),
        strToBytes('COMPLETED_STREAMS'),
        strToBytes('CANCELED_STREAMS'),
      ];

      const historyStorage = await rpcProvider.readStorage(CONTRACT_ADDRESS, historyKeys);

      let parsedHistory: HistoryEntry[] = [];

      // Try parsing each key
      for (let i = 0; i < historyStorage.length; i++) {
        const storage = historyStorage[i];
        if (storage && storage.length > 0) {
          try {
            const raw = new TextDecoder().decode(storage);
            const parsed = JSON.parse(raw);
            
            if (Array.isArray(parsed)) {
              const entries: HistoryEntry[] = parsed.map((entry: any, idx: number) => ({
                receiver: String(entry.receiver || ''),
                amount: String(entry.amount || '0'),
                interval: String(entry.interval || '0'),
                counter: String(entry.counter || '0'),
                status: entry.status === 'Canceled' ? 'Canceled' : 'Completed',
                timestamp: entry.timestamp || undefined,
                historyId: entry.historyId || `history-${i}-${idx}`,
                totalStreamed: parseInt(entry.amount || '0') * parseInt(entry.counter || '0'),
              }));
              parsedHistory = [...parsedHistory, ...entries];
            }
          } catch (err) {
            console.warn(`Failed to parse history key ${i}`);
          }
        }
      }

      // Fallback: derive from completed/canceled streams if no history found
      if (parsedHistory.length === 0) {
        console.log('No history found in storage');
        // This is a fallback - in production, you'd have proper history storage
        // For now, we'll just show empty state if no history exists
      }

      setHistory(parsedHistory);
      console.log(`✅ Loaded ${parsedHistory.length} history entries`);
    } catch (error) {
      console.error('❌ Error fetching history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchHistory();
  }, []);

  // Auto-refresh every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchHistory(true);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Manual refresh
  const handleRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchHistory(true);
  };

  // Separate completed and canceled streams
  const completedStreams = history.filter((entry) => entry.status === 'Completed');
  const canceledStreams = history.filter((entry) => entry.status === 'Canceled');

  // Format timestamp
  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return 'No timestamp available';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return timestamp;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--gradient-bg)',
        padding: 'var(--space-xl)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <header
          className="animate-fade-in-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--space-2xl)',
            flexWrap: 'wrap',
            gap: 'var(--space-lg)',
          }}
        >
          <div>
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
              HISTORY
            </p>
            <h1 className="text-display header-neon" style={{ marginBottom: 'var(--space-md)' }}>
              History
            </h1>
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              Your completed and canceled payment streams
            </p>
          </div>

          <button
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={refreshing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-sm)',
            }}
          >
            {refreshing ? (
              <>
                <div className="spinner" style={{ width: '16px', height: '16px' }} />
                Refreshing...
              </>
            ) : (
              <>
                🔄 Refresh
              </>
            )}
          </button>
        </header>

        {/* Loading State */}
        {loading && (
          <div
            className="card animate-fade-in-up"
            style={{
              padding: 'var(--space-3xl)',
              textAlign: 'center',
              animationDelay: '0.1s',
            }}
          >
            <div className="spinner" style={{ width: '48px', height: '48px', margin: '0 auto var(--space-lg)' }} />
            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              Loading history from blockchain...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div
            className="card animate-fade-in-up"
            style={{
              padding: 'var(--space-3xl)',
              textAlign: 'center',
              animationDelay: '0.1s',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto var(--space-xl)',
                borderRadius: '50%',
                background: 'rgba(179, 136, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}
            >
              📜
            </div>
            <h2 className="text-h2" style={{ marginBottom: 'var(--space-md)' }}>
              No history yet
            </h2>
            <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
              Create your first stream to get started
            </p>
            {onCreateStream && (
              <button className="btn btn-primary btn-lg" onClick={onCreateStream}>
                ➕ Create Stream
              </button>
            )}
          </div>
        )}

        {/* History Content */}
        {!loading && history.length > 0 && (
          <div>
            {/* Completed Streams Section */}
            {completedStreams.length > 0 && (
              <div style={{ marginBottom: 'var(--space-3xl)' }}>
                <div
                  className="animate-fade-in-up"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-lg)',
                    animationDelay: '0.1s',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(57, 255, 20, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}
                  >
                    ✅
                  </div>
                  <div>
                    <h2 className="text-h2" style={{ marginBottom: 'var(--space-xs)' }}>
                      Completed Streams
                    </h2>
                    <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                      {completedStreams.length} stream{completedStreams.length !== 1 ? 's' : ''} completed successfully
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: 'var(--space-lg)',
                  }}
                >
                  {completedStreams.map((entry, index) => (
                    <div
                      key={entry.historyId}
                      className="card card-hover animate-fade-in-up"
                      style={{
                        animationDelay: `${0.2 + index * 0.1}s`,
                        borderLeft: '3px solid var(--color-success)',
                      }}
                    >
                      <div className="card-header">
                        <div>
                          <p className="eyebrow" style={{ marginBottom: 'var(--space-xs)' }}>
                            Completed Stream
                          </p>
                          <span className="badge badge-success">✅ Completed</span>
                        </div>
                      </div>

                      <div className="card-body">
                        {/* Receiver */}
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
                            {formatAddress(entry.receiver)}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 'var(--space-md)',
                            marginBottom: 'var(--space-md)',
                          }}
                        >
                          {/* Total Streamed */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Total Streamed
                            </p>
                            <p className="text-h3 text-gradient-primary" style={{ fontWeight: 'var(--font-bold)' }}>
                              {entry.totalStreamed}
                            </p>
                          </div>

                          {/* Interval */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Interval
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.interval} cycles
                            </p>
                          </div>

                          {/* Amount per Interval */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Amount/Interval
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.amount}
                            </p>
                          </div>

                          {/* Total Cycles */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Total Cycles
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.counter}
                            </p>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div
                          style={{
                            padding: 'var(--space-sm)',
                            background: 'rgba(57, 255, 20, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(57, 255, 20, 0.1)',
                          }}
                        >
                          <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                            🕐 {formatTimestamp(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Canceled Streams Section */}
            {canceledStreams.length > 0 && (
              <div>
                <div
                  className="animate-fade-in-up"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-md)',
                    marginBottom: 'var(--space-lg)',
                    animationDelay: `${0.1 + completedStreams.length * 0.1}s`,
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255, 107, 107, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                    }}
                  >
                    ❌
                  </div>
                  <div>
                    <h2 className="text-h2" style={{ marginBottom: 'var(--space-xs)' }}>
                      Canceled Streams
                    </h2>
                    <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                      {canceledStreams.length} stream{canceledStreams.length !== 1 ? 's' : ''} canceled
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: 'var(--space-lg)',
                  }}
                >
                  {canceledStreams.map((entry, index) => (
                    <div
                      key={entry.historyId}
                      className="card card-hover animate-fade-in-up"
                      style={{
                        animationDelay: `${0.2 + (completedStreams.length + index) * 0.1}s`,
                        borderLeft: '3px solid var(--color-error)',
                      }}
                    >
                      <div className="card-header">
                        <div>
                          <p className="eyebrow" style={{ marginBottom: 'var(--space-xs)' }}>
                            Canceled Stream
                          </p>
                          <span className="badge badge-error">❌ Canceled</span>
                        </div>
                      </div>

                      <div className="card-body">
                        {/* Receiver */}
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
                            {formatAddress(entry.receiver)}
                          </p>
                        </div>

                        {/* Stats Grid */}
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 'var(--space-md)',
                            marginBottom: 'var(--space-md)',
                          }}
                        >
                          {/* Total Streamed */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Total Streamed
                            </p>
                            <p className="text-h3" style={{ fontWeight: 'var(--font-bold)', color: 'var(--color-error)' }}>
                              {entry.totalStreamed}
                            </p>
                          </div>

                          {/* Interval */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Interval
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.interval} cycles
                            </p>
                          </div>

                          {/* Amount per Interval */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Amount/Interval
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.amount}
                            </p>
                          </div>

                          {/* Total Cycles */}
                          <div>
                            <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                              Total Cycles
                            </p>
                            <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                              {entry.counter}
                            </p>
                          </div>
                        </div>

                        {/* Timestamp */}
                        <div
                          style={{
                            padding: 'var(--space-sm)',
                            background: 'rgba(255, 107, 107, 0.05)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(255, 107, 107, 0.1)',
                          }}
                        >
                          <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                            🕐 {formatTimestamp(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Info Tip */}
            <div
              className="animate-fade-in-up"
              style={{
                marginTop: 'var(--space-2xl)',
                padding: 'var(--space-lg)',
                background: 'rgba(110, 231, 255, 0.05)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(110, 231, 255, 0.1)',
                animationDelay: `${0.2 + history.length * 0.1}s`,
              }}
            >
              <p className="text-small" style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
                ⚡ <strong style={{ color: 'var(--color-neon-cyan)' }}>Auto-refreshing:</strong> History data updates every 8 seconds automatically
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
