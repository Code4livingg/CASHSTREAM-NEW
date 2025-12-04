import React from 'react';
import '../styles/design-system.css';

/**
 * IntroPage - Production-ready landing page for CashStream
 * 
 * Features:
 * - Neon-pulsing CASHSTREAM title with cyan→purple gradient
 * - Animated floating background orbs
 * - Staggered fade-in-up animations
 * - Fullscreen centered responsive layout
 * - Pure CSS animations, zero dependencies
 * 
 * @component
 * @example
 * <IntroPage onGetStarted={() => navigate('/dashboard')} />
 */

interface IntroPageProps {
  /** Callback function triggered when "Get Started" button is clicked */
  onGetStarted?: () => void;
  /** Callback function triggered when "Demo Mode" button is clicked */
  onDemoMode?: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onGetStarted, onDemoMode }) => {
  return (
    <div
      className="intro-page-container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--gradient-bg)',
        padding: 'var(--space-xl)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background orbs */}
      <div
        className="intro-page-orb intro-page-orb-cyan"
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(110, 231, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'introPageFloat 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <div
        className="intro-page-orb intro-page-orb-purple"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(179, 136, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'introPageFloat 8s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      {/* Main content container */}
      <main
        className="intro-page-content animate-fade-in-up"
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow label */}
        <p 
          className="eyebrow animate-fade-in-up" 
          style={{ 
            marginBottom: 'var(--space-lg)',
            animationDelay: '0.1s',
          }}
        >
          WELCOME TO THE FUTURE
        </p>

        {/* Main title with neon pulse and gradient */}
        <h1
          className="text-display header-neon animate-neon-pulse animate-fade-in-up"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            marginBottom: 'var(--space-xl)',
            letterSpacing: '-0.02em',
            animationDelay: '0.2s',
          }}
        >
          CASHSTREAM
        </h1>

        {/* Subtitle */}
        <p
          className="text-h3 animate-fade-in-up"
          style={{
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-3xl)',
            lineHeight: 'var(--leading-relaxed)',
            fontWeight: 'var(--font-normal)',
            animationDelay: '0.3s',
          }}
        >
          Autonomous Crypto Payments. Powered by Massa.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="btn btn-primary btn-lg animate-fade-in-up"
            onClick={onGetStarted}
            aria-label="Get started with CashStream"
            style={{
              fontSize: 'var(--text-xl)',
              padding: 'var(--space-lg) var(--space-3xl)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              animationDelay: '0.4s',
            }}
          >
            Get Started
            <span style={{ fontSize: '1.2em' }} aria-hidden="true">→</span>
          </button>

          <button
            className="btn btn-secondary btn-lg animate-fade-in-up"
            onClick={onDemoMode}
            aria-label="Try demo mode"
            style={{
              fontSize: 'var(--text-xl)',
              padding: 'var(--space-lg) var(--space-3xl)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              animationDelay: '0.5s',
            }}
          >
            🎨 Demo Mode
          </button>
        </div>

        {/* Feature highlights */}
        <div
          className="intro-page-features"
          style={{
            marginTop: 'var(--space-3xl)',
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--space-2xl)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: '⚡', text: 'Autonomous', delay: '0.5s' },
            { icon: '🔒', text: 'Secure', delay: '0.6s' },
            { icon: '🚀', text: 'Fast', delay: '0.7s' },
          ].map((feature) => (
            <div
              key={feature.text}
              className="intro-page-feature animate-fade-in-up"
              style={{
                animationDelay: feature.delay,
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)',
                color: 'var(--color-text-tertiary)',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)',
              }}
            >
              <span 
                style={{ fontSize: 'var(--text-xl)' }} 
                aria-hidden="true"
              >
                {feature.icon}
              </span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Scoped animation keyframes */}
      <style>{`
        @keyframes introPageFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .intro-page-content {
            padding: var(--space-lg);
          }
          
          .intro-page-features {
            gap: var(--space-lg) !important;
          }
          
          .intro-page-orb {
            width: 200px !important;
            height: 200px !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .intro-page-orb,
          .animate-neon-pulse,
          .animate-fade-in-up {
            animation: none !important;
          }
          
          .intro-page-content,
          .intro-page-feature {
            opacity: 1 !important;
            transform: none !important;
          }
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .header-neon {
            text-shadow: none;
            color: var(--color-neon-cyan);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroPage;
