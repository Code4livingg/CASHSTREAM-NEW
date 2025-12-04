import React, { useState } from 'react';
import '../styles/design-system.css';

/**
 * Example: Stream Dashboard using CashStream Design System
 * Demonstrates practical usage of all design system components
 */

interface Stream {
  id: string;
  receiver: string;
  amount: number;
  interval: number;
  status: 'active' | 'paused' | 'completed';
  cyclesCompleted: number;
}

export const StreamDashboard: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [streams] = useState<Stream[]>([
    {
      id: '1',
      receiver: '0xAB12...CD34',
      amount: 5000,
      interval: 2592000,
      status: 'active',
      cyclesCompleted: 12,
    },
    {
      id: '2',
      receiver: '0xEF56...GH78',
      amount: 1000,
      interval: 864000,
      status: 'active',
      cyclesCompleted: 45,
    },
  ]);

  return (
    <div className="layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <span>💰</span>
          <span className="text-gradient-primary">CashStream</span>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="sidebar-nav-item sidebar-nav-item-active">
            <span>🏠</span>
            <span>Dashboard</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>💸</span>
            <span>My Streams</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>📊</span>
            <span>Analytics</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>📜</span>
            <span>History</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div className="avatar">CS</div>
              <div>
                <div className="text-small" style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  0xAB12...CD34
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', marginTop: 'var(--space-xs)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-success)' }} />
                  <span className="text-caption">Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div className="animate-fade-in-up">
            <p className="eyebrow">Payment Streaming</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-sm)' }}>
              <h1 className="text-display header-neon">Dashboard</h1>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => setShowCreateModal(true)}
              >
                + Create Stream
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            marginTop: 'var(--space-2xl)', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 'var(--space-lg)' 
          }}>
            <div className="card card-hover animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-caption">Total Streams</p>
              <h2 className="text-h2 text-gradient-primary" style={{ marginTop: 'var(--space-sm)' }}>
                {streams.length}
              </h2>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-tertiary)' }}>
                Active payment flows
              </p>
            </div>

            <div className="card card-hover animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-caption">Total Streamed</p>
              <h2 className="text-h2" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-neon-cyan)' }}>
                105,000 MASSA
              </h2>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-success)' }}>
                +12.5% this month
              </p>
            </div>

            <div className="card card-hover animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-caption">Next Payment</p>
              <h2 className="text-h2" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-neon-purple)' }}>
                2.5 hours
              </h2>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-tertiary)' }}>
                Stream #1 payment
              </p>
            </div>

            <div className="card card-hover animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-caption">Gas Saved</p>
              <h2 className="text-h2 text-gradient-secondary" style={{ marginTop: 'var(--space-sm)' }}>
                45%
              </h2>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-tertiary)' }}>
                vs manual payments
              </p>
            </div>
          </div>

          <div className="divider-gradient" style={{ margin: 'var(--space-3xl) 0' }} />

          {/* Active Streams */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)' }}>
              <h2 className="text-h2 header-underline">Active Streams</h2>
              <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                <button className="btn btn-ghost btn-sm">Filter</button>
                <button className="btn btn-ghost btn-sm">Sort</button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {streams.map((stream, index) => (
                <div 
                  key={stream.id} 
                  className="card card-solid card-hover animate-fade-in-up"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className="card-header">
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                        <p className="eyebrow">Stream #{stream.id}</p>
                        <span className="badge badge-success">
                          {stream.status}
                        </span>
                      </div>
                      <h3 className="card-title" style={{ marginTop: 'var(--space-sm)' }}>
                        Payment Stream to {stream.receiver}
                      </h3>
                    </div>
                    <div className="spinner" />
                  </div>

                  <div className="card-body">
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: 'var(--space-lg)' 
                    }}>
                      <div>
                        <p className="text-caption">Amount per Cycle</p>
                        <p className="text-body" style={{ fontWeight: 600, marginTop: 'var(--space-xs)' }}>
                          {stream.amount.toLocaleString()} MASSA
                        </p>
                      </div>
                      <div>
                        <p className="text-caption">Interval</p>
                        <p className="text-body" style={{ fontWeight: 600, marginTop: 'var(--space-xs)' }}>
                          {stream.interval.toLocaleString()} cycles
                        </p>
                      </div>
                      <div>
                        <p className="text-caption">Cycles Completed</p>
                        <p className="text-body" style={{ fontWeight: 600, marginTop: 'var(--space-xs)' }}>
                          {stream.cyclesCompleted}
                        </p>
                      </div>
                      <div>
                        <p className="text-caption">Total Paid</p>
                        <p className="text-body text-gradient-primary" style={{ fontWeight: 600, marginTop: 'var(--space-xs)' }}>
                          {(stream.amount * stream.cyclesCompleted).toLocaleString()} MASSA
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                      <div style={{ 
                        height: '8px', 
                        background: 'rgba(255, 255, 255, 0.1)', 
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden'
                      }}>
                        <div 
                          className="animate-gradient-sweep"
                          style={{ 
                            width: '65%', 
                            height: '100%', 
                            background: 'var(--gradient-primary)',
                            borderRadius: 'var(--radius-full)'
                          }} 
                        />
                      </div>
                      <p className="text-caption" style={{ marginTop: 'var(--space-sm)' }}>
                        Next payment in 2,450 cycles
                      </p>
                    </div>
                  </div>

                  <div className="card-footer">
                    <button className="btn btn-ghost btn-sm">View Details</button>
                    <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                      <button className="btn btn-secondary btn-sm">Pause</button>
                      <button className="btn btn-danger btn-sm">Cancel</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Create Stream Modal */}
          {showCreateModal && (
            <div style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 'var(--space-xl)'
            }}>
              <div className="card animate-scale-in" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="card-header">
                  <h2 className="card-title text-gradient-primary">Create New Stream</h2>
                  <button 
                    className="btn btn-ghost btn-icon"
                    onClick={() => setShowCreateModal(false)}
                  >
                    ✕
                  </button>
                </div>

                <div className="card-body">
                  <div className="input-group">
                    <label className="input-label input-label-required">Receiver Address</label>
                    <input 
                      type="text" 
                      className="input" 
                      placeholder="0x1234...5678"
                    />
                    <span className="input-helper">Enter a valid Massa address</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label input-label-required">Amount per Cycle</label>
                    <input 
                      type="number" 
                      className="input" 
                      placeholder="1000"
                    />
                    <span className="input-helper">Amount in MASSA tokens</span>
                  </div>

                  <div className="input-group">
                    <label className="input-label input-label-required">Interval (cycles)</label>
                    <select className="input select">
                      <option>Every 10 cycles (~5 min)</option>
                      <option>Every 100 cycles (~50 min)</option>
                      <option>Every 1,000 cycles (~8 hours)</option>
                      <option>Every 10,000 cycles (~3 days)</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Description (optional)</label>
                    <textarea 
                      className="input textarea" 
                      placeholder="Add a note about this stream..."
                    />
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    className="btn btn-ghost"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary">
                    Create Stream
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StreamDashboard;
