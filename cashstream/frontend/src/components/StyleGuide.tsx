import React from 'react';
import '../styles/design-system.css';

/**
 * Visual Style Guide - Print-friendly reference
 * Shows colors, typography, spacing, and components at a glance
 */

export const StyleGuide: React.FC = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'var(--gradient-bg)',
      padding: 'var(--space-2xl)'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-display header-neon">CashStream Style Guide</h1>
          <p className="text-body" style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-md)' }}>
            Visual reference for the complete design system
          </p>
        </div>

        <div className="divider-gradient" />

        {/* Color Swatches */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Color Palette</h2>
          
          <div style={{ marginTop: 'var(--space-xl)' }}>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-lg)' }}>Primary Colors</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-lg)' }}>
              {[
                { name: 'Deep Indigo', var: '--color-bg-primary', hex: '#0a0e27' },
                { name: 'Neon Cyan', var: '--color-neon-cyan', hex: '#6ee7ff' },
                { name: 'Neon Purple', var: '--color-neon-purple', hex: '#b388ff' },
                { name: 'Neon Pink', var: '--color-neon-pink', hex: '#ff6ec7' },
                { name: 'Success Green', var: '--color-success', hex: '#39ff14' },
                { name: 'Error Red', var: '--color-error', hex: '#ff6b6b' },
              ].map((color) => (
                <div key={color.name} className="card">
                  <div style={{ 
                    height: '120px', 
                    background: `var(${color.var})`,
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-md)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }} />
                  <p className="text-body" style={{ fontWeight: 600 }}>{color.name}</p>
                  <p className="text-small" style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--space-xs)' }}>
                    {color.hex}
                  </p>
                  <code className="text-caption" style={{ 
                    display: 'block',
                    marginTop: 'var(--space-xs)',
                    padding: 'var(--space-xs)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    var({color.var})
                  </code>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-2xl)' }}>
            <h3 className="text-h3" style={{ marginBottom: 'var(--space-lg)' }}>Gradients</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 'var(--space-lg)' }}>
              {[
                { name: 'Primary', var: '--gradient-primary', desc: 'Cyan → Purple' },
                { name: 'Secondary', var: '--gradient-secondary', desc: 'Purple → Pink' },
                { name: 'Success', var: '--gradient-success', desc: 'Green → Cyan' },
                { name: 'Danger', var: '--gradient-danger', desc: 'Red → Pink' },
              ].map((gradient) => (
                <div key={gradient.name} className="card">
                  <div style={{ 
                    height: '100px', 
                    background: `var(${gradient.var})`,
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: 'var(--space-md)'
                  }} />
                  <p className="text-body" style={{ fontWeight: 600 }}>{gradient.name} Gradient</p>
                  <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                    {gradient.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Scale */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Typography Scale</h2>
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              {[
                { class: 'text-display', size: '48px', label: 'Display' },
                { class: 'text-h1', size: '36px', label: 'Heading 1' },
                { class: 'text-h2', size: '30px', label: 'Heading 2' },
                { class: 'text-h3', size: '24px', label: 'Heading 3' },
                { class: 'text-xl', size: '20px', label: 'XL Text' },
                { class: 'text-body', size: '16px', label: 'Body' },
                { class: 'text-small', size: '14px', label: 'Small' },
                { class: 'text-caption', size: '12px', label: 'Caption' },
              ].map((type) => (
                <div key={type.class} style={{ 
                  display: 'flex', 
                  alignItems: 'baseline',
                  gap: 'var(--space-xl)',
                  paddingBottom: 'var(--space-md)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{ minWidth: '120px' }}>
                    <p className="text-small" style={{ color: 'var(--color-text-tertiary)' }}>
                      {type.label}
                    </p>
                    <code className="text-caption" style={{ 
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-neon-cyan)'
                    }}>
                      {type.size}
                    </code>
                  </div>
                  <p className={type.class}>
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Spacing Scale */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Spacing Scale</h2>
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {[
                { name: 'XS', var: '--space-xs', px: '4px' },
                { name: 'SM', var: '--space-sm', px: '8px' },
                { name: 'MD', var: '--space-md', px: '16px' },
                { name: 'LG', var: '--space-lg', px: '24px' },
                { name: 'XL', var: '--space-xl', px: '32px' },
                { name: '2XL', var: '--space-2xl', px: '48px' },
                { name: '3XL', var: '--space-3xl', px: '64px' },
              ].map((space) => (
                <div key={space.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                  <div style={{ minWidth: '100px' }}>
                    <p className="text-small" style={{ fontWeight: 600 }}>{space.name}</p>
                    <code className="text-caption" style={{ 
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-tertiary)'
                    }}>
                      {space.px}
                    </code>
                  </div>
                  <div style={{ 
                    height: '24px',
                    width: `var(${space.var})`,
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Button Showcase */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Button Variants</h2>
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              {[
                { label: 'Primary', class: 'btn-primary' },
                { label: 'Secondary', class: 'btn-secondary' },
                { label: 'Ghost', class: 'btn-ghost' },
                { label: 'Danger', class: 'btn-danger' },
              ].map((btn) => (
                <div key={btn.label}>
                  <p className="text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-tertiary)' }}>
                    {btn.label}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', alignItems: 'center' }}>
                    <button className={`btn ${btn.class} btn-sm`}>Small</button>
                    <button className={`btn ${btn.class}`}>Default</button>
                    <button className={`btn ${btn.class} btn-lg`}>Large</button>
                    <button className={`btn ${btn.class}`} disabled>Disabled</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Card Variants */}
        <section style={{ marginTop: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Card Variants</h2>
          <div style={{ 
            marginTop: 'var(--space-xl)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)'
          }}>
            <div className="card">
              <h3 className="text-h3">Basic Card</h3>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                Standard glass card with frosted background
              </p>
            </div>
            <div className="card card-hover">
              <h3 className="text-h3">Hover Card</h3>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                Lifts and glows on hover
              </p>
            </div>
            <div className="card card-glow card-hover">
              <h3 className="text-h3">Glow Card</h3>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                Enhanced neon glow effect
              </p>
            </div>
            <div className="card card-solid">
              <h3 className="text-h3">Solid Card</h3>
              <p className="text-small" style={{ marginTop: 'var(--space-sm)', color: 'var(--color-text-secondary)' }}>
                Solid background variant
              </p>
            </div>
          </div>
        </section>

        {/* Badges & Utilities */}
        <section style={{ marginTop: 'var(--space-3xl)', marginBottom: 'var(--space-3xl)' }}>
          <h2 className="text-h2 header-underline">Badges & Utilities</h2>
          <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
              <div>
                <p className="text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-tertiary)' }}>
                  Badges
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-success">Success</span>
                  <span className="badge badge-error">Error</span>
                </div>
              </div>
              
              <div>
                <p className="text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-tertiary)' }}>
                  Avatars
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                  <div className="avatar">CS</div>
                  <div className="avatar">AB</div>
                  <div className="avatar">XY</div>
                </div>
              </div>
              
              <div>
                <p className="text-small" style={{ marginBottom: 'var(--space-md)', color: 'var(--color-text-tertiary)' }}>
                  Loading Spinners
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)' }}>
                  <div className="spinner" style={{ width: '20px', height: '20px' }} />
                  <div className="spinner" />
                  <div className="spinner" style={{ width: '32px', height: '32px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default StyleGuide;
