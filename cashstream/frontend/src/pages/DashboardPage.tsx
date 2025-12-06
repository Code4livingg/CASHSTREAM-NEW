import React from 'react';
import type { WalletConnection } from '../lib/massaWallet';
import { formatAddress, formatBalance } from '../lib/massaWallet';
import { MatrixBackground, FlowBeamHybrid } from '../components';
import '../styles/design-system.css';

/**
 * DashboardPage - Production-ready main dashboard for CashStream
 * 
 * Features:
 * - Welcome heading with neon effects
 * - Wallet information card (address, balance, network)
 * - Analytics cards (streams, amount, next payment)
 * - Quick action buttons
 * - Responsive grid layout
 * - Staggered fade-in animations
 * - Design system integration
 * 
 * @component
 * @example
 * <DashboardPage wallet={walletConnection} />
 */

interface DashboardPageProps {
  /** Wallet connection from onboarding flow */
  wallet: WalletConnection;
  /** Callback when user wants to view active streams */
  onViewStreams?: () => void;
  /** Callback when user wants to create a stream */
  onCreateStream?: () => void;
  /** Callback when user wants to view history */
  onViewHistory?: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  wallet,
  onViewStreams,
  onCreateStream,
  onViewHistory,
}) => {
  // Mock data for analytics (replace with real data from blockchain)
  const analytics = {
    totalStreams: 3,
    totalStreamed: '12,450.00',
    nextPayment: '2.5 hours',
  };

  // Mock active stream data for FlowBeamHybrid demo
  const activeStream = {
    sender: wallet.address,
    receiver: 'AU12CzXE7mHZSvRxPrVxKFKqhNvVbKvNqHvHzHvKqNvVbKvNqHvHz',
    amount: '100',
    interval: 'hour' as const, // hour = fast animation
    isSenderView: true, // User is the sender
  };

  const handleCreateStreamClick = () => {
    console.log('🎯 Create Stream clicked');
    if (onCreateStream) {
      onCreateStream();
    }
  };

  const handleViewStreamsClick = () => {
    console.log('📋 View Active Streams clicked');
    if (onViewStreams) {
      onViewStreams();
    }
  };

  const handleViewHistoryClick = () => {
    console.log('📜 View History clicked');
    if (onViewHistory) {
      onViewHistory();
    }
  };

  return (
    <MatrixBackground>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--gradient-bg)',
          padding: 'var(--space-xl)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Welcome Header */}
        <header className="animate-fade-in-up" style={{ marginBottom: 'var(--space-2xl)' }}>
          <p className="eyebrow" style={{ marginBottom: 'var(--space-sm)' }}>
            DASHBOARD
          </p>
          <h1 className="text-display header-neon" style={{ marginBottom: 'var(--space-md)' }}>
            Welcome to CashStream
          </h1>
          <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
            Manage your autonomous payment streams on Massa blockchain
          </p>
        </header>

        {/* Wallet Card */}
        <div
          className="card card-glow animate-fade-in-up"
          style={{
            marginBottom: 'var(--space-2xl)',
            animationDelay: '0.1s',
          }}
        >
          <div className="card-header">
            <h2 className="card-title">Connected Wallet</h2>
            <span className="badge badge-success">Connected</span>
          </div>
          
          <div className="card-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {/* Address */}
              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Wallet Address
                </p>
                <p
                  className="text-body"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--color-neon-cyan)',
                    fontWeight: 'var(--font-semibold)',
                  }}
                >
                  {formatAddress(wallet.address)}
                </p>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(wallet.address);
                    console.log('📋 Address copied to clipboard');
                  }}
                  style={{ marginTop: 'var(--space-xs)', fontSize: 'var(--text-xs)' }}
                >
                  Copy Full Address
                </button>
              </div>

              {/* Balance */}
              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Balance
                </p>
                <p className="text-h3 text-gradient-primary" style={{ fontWeight: 'var(--font-bold)' }}>
                  {formatBalance(wallet.balance)}
                </p>
              </div>

              {/* Network */}
              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Network
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--color-success)',
                      boxShadow: '0 0 8px var(--color-success)',
                    }}
                  />
                  <p className="text-body" style={{ fontWeight: 'var(--font-semibold)' }}>
                    Massa Buildnet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Stream Flow Card with FlowBeam */}
        <div
          className="card card-glow animate-fade-in-up"
          style={{
            marginBottom: 'var(--space-2xl)',
            animationDelay: '0.15s',
            overflow: 'hidden',
          }}
        >
          <div className="card-header">
            <h2 className="card-title">Active Stream Flow</h2>
            <span className="badge badge-success">Live</span>
          </div>
          
          <div className="card-body" style={{ padding: 0 }}>
            {/* FlowBeamHybrid - Quantum Waterfall Animation */}
            <FlowBeamHybrid
              sender={activeStream.sender}
              receiver={activeStream.receiver}
              interval={activeStream.interval}
              isSenderView={activeStream.isSenderView}
              streamAmount={activeStream.amount}
            />

            {/* Stream Details */}
            <div
              style={{
                padding: 'var(--space-lg)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--space-md)',
                background: 'rgba(0, 0, 0, 0.2)',
                borderTop: '1px solid rgba(110, 231, 255, 0.1)',
              }}
            >
              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  From
                </p>
                <p
                  className="text-small"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#00F6FF',
                    fontWeight: 'var(--font-semibold)',
                  }}
                >
                  {formatAddress(activeStream.sender)}
                </p>
              </div>

              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  To
                </p>
                <p
                  className="text-small"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#35FF79',
                    fontWeight: 'var(--font-semibold)',
                  }}
                >
                  {formatAddress(activeStream.receiver)}
                </p>
              </div>

              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Amount
                </p>
                <p className="text-body text-gradient-primary" style={{ fontWeight: 'var(--font-bold)' }}>
                  {activeStream.amount} MASSA
                </p>
              </div>

              <div>
                <p className="text-caption" style={{ marginBottom: 'var(--space-xs)' }}>
                  Interval
                </p>
                <p className="text-body" style={{ fontWeight: 'var(--font-semibold)', color: 'var(--color-success)', textTransform: 'capitalize' }}>
                  {activeStream.interval}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          {/* Total Active Streams */}
          <div
            className="card card-hover animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(110, 231, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                💸
              </div>
              <div>
                <p className="text-caption">Total Active Streams</p>
                <p className="text-h2 text-gradient-primary" style={{ fontWeight: 'var(--font-bold)' }}>
                  {analytics.totalStreams}
                </p>
              </div>
            </div>
            <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
              Autonomous payment flows running
            </p>
          </div>

          {/* Total Amount Streamed */}
          <div
            className="card card-hover animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(179, 136, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                💰
              </div>
              <div>
                <p className="text-caption">Total Amount Streamed</p>
                <p className="text-h2" style={{ color: 'var(--color-neon-purple)', fontWeight: 'var(--font-bold)' }}>
                  {analytics.totalStreamed}
                </p>
              </div>
            </div>
            <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
              MASSA tokens distributed
            </p>
          </div>

          {/* Next Autonomous Payment */}
          <div
            className="card card-hover animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-lg)',
                  background: 'rgba(57, 255, 20, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                ⚡
              </div>
              <div>
                <p className="text-caption">Next Autonomous Payment</p>
                <p className="text-h2" style={{ color: 'var(--color-success)', fontWeight: 'var(--font-bold)' }}>
                  {analytics.nextPayment}
                </p>
              </div>
            </div>
            <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
              Self-executing smart contract
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card card-solid animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <div className="card-header">
            <h2 className="card-title">Quick Actions</h2>
          </div>
          
          <div className="card-body">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {/* Create Stream */}
              <button
                className="btn btn-primary"
                onClick={handleCreateStreamClick}
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>➕</span>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  Create Stream
                </span>
                <span style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
                  Set up a new payment flow
                </span>
              </button>

              {/* View Active Streams */}
              <button
                className="btn btn-secondary"
                onClick={handleViewStreamsClick}
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>📋</span>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  View Active Streams
                </span>
                <span style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
                  Manage your payment flows
                </span>
              </button>

              {/* View History */}
              <button
                className="btn btn-ghost"
                onClick={handleViewHistoryClick}
                style={{
                  padding: 'var(--space-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-sm)',
                }}
              >
                <span style={{ fontSize: '2rem' }}>📜</span>
                <span style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' }}>
                  View History
                </span>
                <span style={{ fontSize: 'var(--text-sm)', opacity: 0.9 }}>
                  Completed & canceled streams
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div
          className="animate-fade-in-up"
          style={{
            marginTop: 'var(--space-2xl)',
            padding: 'var(--space-lg)',
            background: 'rgba(110, 231, 255, 0.05)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(110, 231, 255, 0.1)',
            animationDelay: '0.6s',
          }}
        >
          <p className="text-small" style={{ color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            💡 <strong style={{ color: 'var(--color-neon-cyan)' }}>Pro Tip:</strong> Your payment streams execute autonomously on-chain. No manual intervention needed!
          </p>
        </div>
        </div>
      </div>
    </MatrixBackground>
  );
};

export default DashboardPage;
