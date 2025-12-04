import React from 'react';
import '../styles/design-system.css';

/**
 * CashStream Design System Showcase
 * Demonstrates all UI components and patterns
 */

export const DesignSystemShowcase: React.FC = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
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
            <span>Streams</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>📊</span>
            <span>Analytics</span>
          </a>
          <a href="#" className="sidebar-nav-item">
            <span>⚙️</span>
            <span>Settings</span>
          </a>
        </nav>
        
        <div style={{ marginTop: 'auto' }}>
          <div className="card">
            <div className="avatar">CS</div>
            <div style={{ marginTop: 'var(--space-md)' }}>
              <div className="text-small" style={{ fontWeight: 600 }}>
                0xAB12...CD34
              </div>
              <div className="text-caption">Connected</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header Section */}
          <section className="animate-fade-in-up">
            <p className="eyebrow">Design System</p>
            <h1 className="text-display header-neon">
              CashStream UI
            </h1>
            <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
              Premium fintech design with neon futuristic accents
            </p>
          </section>

          <div className="divider-gradient" />

          {/* Typography Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Typography</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <p className="text-caption">Display</p>
                <h1 className="text-display">The Future of Payments</h1>
              </div>
              <div>
                <p className="text-caption">Heading 1</p>
                <h1 className="text-h1">Autonomous Streaming</h1>
              </div>
              <div>
                <p className="text-caption">Heading 2</p>
                <h2 className="text-h2">Payment Analytics</h2>
              </div>
              <div>
                <p className="text-caption">Heading 3</p>
                <h3 className="text-h3">Stream Details</h3>
              </div>
              <div>
                <p className="text-caption">Body Text</p>
                <p className="text-body">
                  CashStream enables autonomous payment flows on the Massa blockchain
                  with self-executing smart contracts.
                </p>
              </div>
            </div>
          </section>

          {/* Buttons Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Buttons</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary Button</button>
              <button className="btn btn-ghost">Ghost Button</button>
              <button className="btn btn-danger">Danger Button</button>
              <button className="btn btn-primary" disabled>Disabled</button>
            </div>
            
            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
              <button className="btn btn-primary btn-sm">Small</button>
              <button className="btn btn-primary">Default</button>
              <button className="btn btn-primary btn-lg">Large</button>
              <button className="btn btn-primary btn-icon">🚀</button>
            </div>
          </section>

          {/* Inputs Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Form Inputs</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
              <div className="input-group">
                <label className="input-label">Receiver Address</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="0x1234...5678"
                />
                <span className="input-helper">Enter a valid Massa address</span>
              </div>
              
              <div className="input-group">
                <label className="input-label input-label-required">Amount</label>
                <input 
                  type="number" 
                  className="input" 
                  placeholder="1000"
                />
              </div>
              
              <div className="input-group">
                <label className="input-label">Interval (cycles)</label>
                <select className="input select">
                  <option>Every 10 cycles</option>
                  <option>Every 100 cycles</option>
                  <option>Every 1000 cycles</option>
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Error State</label>
                <input 
                  type="text" 
                  className="input input-error" 
                  placeholder="Invalid input"
                />
                <span className="input-error-message">This field is required</span>
              </div>
            </div>
            
            <div style={{ marginTop: 'var(--space-lg)' }}>
              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea 
                  className="input textarea" 
                  placeholder="Add a note about this stream..."
                />
              </div>
            </div>
          </section>

          {/* Cards Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Cards</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)' }}>
              {/* Basic Glass Card */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Glass Card</h3>
                  <span className="badge badge-primary">Active</span>
                </div>
                <div className="card-body">
                  <p className="text-body">
                    Basic glassmorphism card with frosted background and subtle border.
                  </p>
                </div>
              </div>
              
              {/* Hover Card */}
              <div className="card card-hover">
                <div className="card-header">
                  <h3 className="card-title">Hover Card</h3>
                  <span className="badge badge-success">Live</span>
                </div>
                <div className="card-body">
                  <p className="text-body">
                    Hover over this card to see the lift effect and neon glow.
                  </p>
                </div>
              </div>
              
              {/* Glow Card */}
              <div className="card card-glow card-hover">
                <div className="card-header">
                  <h3 className="card-title">Glow Card</h3>
                  <span className="badge badge-error">Hot</span>
                </div>
                <div className="card-body">
                  <p className="text-body">
                    Enhanced card with animated neon glow effect on hover.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Stream Card Example */}
            <div style={{ marginTop: 'var(--space-lg)' }}>
              <div className="card card-solid">
                <div className="card-header">
                  <div>
                    <p className="eyebrow">Payment Stream #1</p>
                    <h3 className="card-title text-gradient-primary">
                      Monthly Salary Stream
                    </h3>
                  </div>
                  <div className="spinner" />
                </div>
                <div className="card-body">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-md)' }}>
                    <div>
                      <p className="text-caption">Receiver</p>
                      <p className="text-body" style={{ fontWeight: 600 }}>0xAB12...CD34</p>
                    </div>
                    <div>
                      <p className="text-caption">Amount</p>
                      <p className="text-body" style={{ fontWeight: 600 }}>5,000 MASSA</p>
                    </div>
                    <div>
                      <p className="text-caption">Interval</p>
                      <p className="text-body" style={{ fontWeight: 600 }}>2,592,000 cycles</p>
                    </div>
                    <div>
                      <p className="text-caption">Status</p>
                      <span className="badge badge-success">Active</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button className="btn btn-ghost btn-sm">View Details</button>
                  <button className="btn btn-danger btn-sm">Cancel Stream</button>
                </div>
              </div>
            </div>
          </section>

          {/* Headers Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Neon Headers</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <h1 className="text-h1 header-neon">
                  Gradient Text Header
                </h1>
              </div>
              <div>
                <h1 className="text-h1 header-neon-glow">
                  Glowing Neon Header
                </h1>
              </div>
              <div>
                <h2 className="text-h2 header-underline">
                  Underlined Header
                </h2>
              </div>
              <div>
                <p className="eyebrow">Eyebrow Label</p>
                <h2 className="text-h2 text-gradient-primary">
                  Combined Style Header
                </h2>
              </div>
            </div>
          </section>

          {/* Animations Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Animations</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
              <div className="card animate-fade-in">
                <h3 className="text-h3">Fade In</h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Smooth opacity transition
                </p>
              </div>
              
              <div className="card animate-fade-in-up">
                <h3 className="text-h3">Fade In Up</h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Fade with upward motion
                </p>
              </div>
              
              <div className="card hover-lift">
                <h3 className="text-h3">Hover Lift</h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Elevates on hover
                </p>
              </div>
              
              <div className="card animate-neon-pulse">
                <h3 className="text-h3">Neon Pulse</h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Pulsing glow effect
                </p>
              </div>
              
              <div className="card">
                <div className="animate-shimmer" style={{ height: '4px', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-md)' }} />
                <h3 className="text-h3">Shimmer</h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Loading shimmer effect
                </p>
              </div>
              
              <div className="card">
                <h3 className="text-h3 animate-gradient-sweep text-gradient-primary">
                  Gradient Sweep
                </h3>
                <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                  Animated gradient text
                </p>
              </div>
            </div>
          </section>

          {/* Utilities Section */}
          <section style={{ marginTop: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Utilities</h2>
            
            {/* Badges */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>Badges</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                <span className="badge badge-primary">Primary</span>
                <span className="badge badge-success">Success</span>
                <span className="badge badge-error">Error</span>
              </div>
            </div>
            
            {/* Dividers */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>Dividers</h3>
              <div className="divider" />
              <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>Standard divider</p>
              <div className="divider-gradient" />
              <p className="text-small" style={{ color: 'var(--color-text-secondary)' }}>Gradient divider</p>
            </div>
            
            {/* Avatars */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>Avatars</h3>
              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <div className="avatar">CS</div>
                <div className="avatar">AB</div>
                <div className="avatar">XY</div>
              </div>
            </div>
            
            {/* Loading Spinner */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <h3 className="text-h3" style={{ marginBottom: 'var(--space-md)' }}>Loading States</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                <div className="spinner" />
                <div className="spinner" style={{ width: '32px', height: '32px' }} />
                <div className="spinner" style={{ width: '48px', height: '48px' }} />
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
            <h2 className="text-h2 header-underline">Color Palette</h2>
            <div style={{ marginTop: 'var(--space-xl)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-lg)' }}>
              <div>
                <div style={{ height: '100px', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-sm)' }} />
                <p className="text-small" style={{ fontWeight: 600 }}>Primary BG</p>
                <p className="text-caption">#0a0e27</p>
              </div>
              <div>
                <div style={{ height: '100px', background: 'var(--color-neon-cyan)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-sm)' }} />
                <p className="text-small" style={{ fontWeight: 600 }}>Neon Cyan</p>
                <p className="text-caption">#6ee7ff</p>
              </div>
              <div>
                <div style={{ height: '100px', background: 'var(--color-neon-purple)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-sm)' }} />
                <p className="text-small" style={{ fontWeight: 600 }}>Neon Purple</p>
                <p className="text-caption">#b388ff</p>
              </div>
              <div>
                <div style={{ height: '100px', background: 'var(--gradient-primary)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--space-sm)' }} />
                <p className="text-small" style={{ fontWeight: 600 }}>Primary Gradient</p>
                <p className="text-caption">Cyan → Purple</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default DesignSystemShowcase;
