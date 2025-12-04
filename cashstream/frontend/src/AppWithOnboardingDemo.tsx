import { useState } from 'react';
import { IntroPage, ConnectWalletPage } from './pages';
import { StreamDashboard } from './components';
import './styles/design-system.css';

/**
 * AppWithOnboardingDemo - Complete 3-step onboarding flow demonstration
 * 
 * This component demonstrates the full user journey:
 * 1. IntroPage - Welcome and "Get Started"
 * 2. ConnectWalletPage - Wallet connection
 * 3. StreamDashboard - Main application
 * 
 * Features:
 * - State-based navigation
 * - Smooth transitions with fade-in animations
 * - Console logging for debugging
 * - Dev mode debug panel
 * - Can be used for testing and demos
 * 
 * @component
 * @example
 * // In main.tsx or for testing
 * import AppWithOnboardingDemo from './AppWithOnboardingDemo';
 * 
 * function Root() {
 *   return <AppWithOnboardingDemo />;
 * }
 */

type OnboardingStep = 'intro' | 'connect' | 'dashboard';

export function AppWithOnboardingDemo() {
  const [step, setStep] = useState<OnboardingStep>('intro');
  const [navigationHistory, setNavigationHistory] = useState<OnboardingStep[]>(['intro']);

  const handleGetStarted = () => {
    console.log('🚀 User clicked "Get Started"');
    console.log('📍 Navigation: intro → connect');
    setStep('connect');
    setNavigationHistory(prev => [...prev, 'connect']);
  };

  const handleWalletConnected = () => {
    console.log('✅ Wallet connected successfully');
    console.log('📍 Navigation: connect → dashboard');
    setStep('dashboard');
    setNavigationHistory(prev => [...prev, 'dashboard']);
  };

  const handleRestart = () => {
    console.log('🔄 Restarting onboarding flow');
    setStep('intro');
    setNavigationHistory(['intro']);
  };

  return (
    <>
      {/* Main content with fade-in animation */}
      <div className="animate-fade-in">
        {step === 'intro' && (
          <IntroPage onGetStarted={handleGetStarted} />
        )}
        
        {step === 'connect' && (
          <ConnectWalletPage onConnected={handleWalletConnected} />
        )}
        
        {step === 'dashboard' && (
          <StreamDashboard />
        )}
      </div>

      {/* Debug panel (only visible in dev mode) */}
      {process.env.NODE_ENV === 'development' && (
        <div
          style={{
            position: 'fixed',
            bottom: 'var(--space-md)',
            right: 'var(--space-md)',
            padding: 'var(--space-md)',
            background: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: 'var(--radius-lg)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-neon-cyan)',
            fontFamily: 'var(--font-mono)',
            zIndex: 9999,
            border: '1px solid var(--color-neon-cyan)',
            minWidth: '200px',
          }}
        >
          <div style={{ 
            marginBottom: 'var(--space-sm)', 
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-neon-purple)',
          }}>
            Onboarding Demo
          </div>
          
          <div style={{ marginBottom: 'var(--space-xs)' }}>
            <strong>Current Step:</strong> {step}
          </div>
          
          <div style={{ marginBottom: 'var(--space-sm)' }}>
            <strong>Progress:</strong> {navigationHistory.length}/3
          </div>
          
          <div style={{ 
            marginBottom: 'var(--space-sm)',
            paddingTop: 'var(--space-sm)',
            borderTop: '1px solid rgba(110, 231, 255, 0.2)',
          }}>
            <strong>History:</strong>
            <div style={{ 
              marginTop: 'var(--space-xs)',
              fontSize: '10px',
              color: 'var(--color-text-tertiary)',
            }}>
              {navigationHistory.map((s, i) => (
                <div key={i}>
                  {i + 1}. {s}
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--space-xs)', marginTop: 'var(--space-sm)' }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleRestart}
              style={{ 
                fontSize: '10px',
                padding: 'var(--space-xs) var(--space-sm)',
              }}
            >
              Restart
            </button>
            
            {step !== 'intro' && (
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  const prevStep = step === 'dashboard' ? 'connect' : 'intro';
                  setStep(prevStep);
                  console.log(`⬅️ Back to ${prevStep}`);
                }}
                style={{ 
                  fontSize: '10px',
                  padding: 'var(--space-xs) var(--space-sm)',
                }}
              >
                Back
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AppWithOnboardingDemo;
