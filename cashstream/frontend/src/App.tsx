import { useState } from 'react';
import { IntroPage, ConnectWalletPage, DashboardPage, ActiveStreamsPage, CreateStreamPage, HistoryPage } from './pages';
import type { WalletConnection } from './lib/massaWallet';
import './styles/design-system.css';
import './App.css';

/**
 * App - Main application with onboarding and navigation
 * 
 * Steps:
 * 1. intro - Welcome page with "Get Started" CTA
 * 2. connect - Wallet connection page with real Massa integration
 * 3. dashboard - Main dashboard with wallet access
 * 4. active-streams - View and manage active payment streams
 * 5. create-stream - Create new payment stream
 * 6. history - View completed and canceled streams
 * 
 * Features:
 * - Smooth transitions between steps
 * - Real Massa wallet integration
 * - Wallet state management
 * - Navigation between pages
 * - Design system integration
 * - Clean component separation
 */

type AppStep = 'intro' | 'connect' | 'dashboard' | 'active-streams' | 'create-stream' | 'history';

// Demo stream interface
interface DemoStream {
  receiver: string;
  amount: string;
  interval: string;
  counter: string;
  streamId: string;
}

function App() {
  // State management for app navigation
  const [step, setStep] = useState<AppStep>('intro');
  
  // Wallet connection state
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  
  // Demo mode: In-memory streams storage
  const [demoStreams, setDemoStreams] = useState<DemoStream[]>([]);
  
  // Demo mode: In-memory history storage
  const [demoHistory, setDemoHistory] = useState<any[]>([]);

  // Step 1: Intro Page
  const handleGetStarted = () => {
    console.log('📍 Navigation: intro → connect');
    setStep('connect');
  };

  // Demo mode: Skip wallet connection with mock data
  const handleDemoMode = () => {
    console.log('📍 Navigation: intro → dashboard (demo mode)');
    const mockWallet: WalletConnection = {
      address: 'AU12CzXE7mHZSvRxT9vGJKwP8bqKDeMHvPJYQHKvXJpgFKqJqQqN',
      balance: '1000.0000',
      provider: undefined as any,
      account: undefined as any,
    };
    setWallet(mockWallet);
    setStep('dashboard');
  };

  // Step 2: Connect Wallet Page
  const handleWalletConnected = (walletConnection: WalletConnection) => {
    console.log('📍 Navigation: connect → dashboard');
    console.log('💼 Wallet stored:', {
      address: walletConnection.address,
      balance: walletConnection.balance,
    });
    
    setWallet(walletConnection);
    setStep('dashboard');
  };

  // Navigate to Active Streams
  const handleViewStreams = () => {
    console.log('📍 Navigation: dashboard → active-streams');
    setStep('active-streams');
  };

  // Navigate to Create Stream
  const handleCreateStream = () => {
    console.log('📍 Navigation: → create-stream');
    setStep('create-stream');
  };

  // Navigate to History
  const handleViewHistory = () => {
    console.log('📍 Navigation: dashboard → history');
    setStep('history');
  };

  // Handle stream created successfully
  const handleStreamCreated = (streamData?: { receiver: string; amount: string; interval: string }) => {
    console.log('📍 Navigation: create-stream → active-streams');
    
    // If in demo mode and stream data provided, add to demo streams
    if (streamData && !wallet?.provider) {
      const newStream: DemoStream = {
        receiver: streamData.receiver,
        amount: streamData.amount,
        interval: streamData.interval,
        counter: '0',
        streamId: `demo-stream-${Date.now()}`,
      };
      setDemoStreams(prev => [...prev, newStream]);
      console.log('🎨 Demo: Added stream to demo storage', newStream);
    }
    
    setStep('active-streams');
  };

  // Handle stream canceled
  const handleCancelStream = (streamId: string) => {
    console.log('🗑️ Canceling stream:', streamId);
    
    // Find the stream being canceled
    const canceledStream = demoStreams.find(s => s.streamId === streamId);
    
    if (canceledStream) {
      // Add to history as canceled
      const historyEntry = {
        ...canceledStream,
        status: 'Canceled',
        timestamp: new Date().toISOString(),
        historyId: `history-${Date.now()}`,
        totalStreamed: parseInt(canceledStream.amount) * parseInt(canceledStream.counter),
      };
      
      setDemoHistory(prev => [...prev, historyEntry]);
      console.log('🎨 Demo: Added to history as canceled');
    }
    
    // Remove from active streams
    setDemoStreams(prev => prev.filter(s => s.streamId !== streamId));
    console.log('🎨 Demo: Removed stream from active streams');
  };

  // Navigate back to Dashboard
  const handleBackToDashboard = () => {
    console.log('📍 Navigation: → dashboard');
    setStep('dashboard');
  };

  // Render current step with fade-in animation
  return (
    <div className="animate-fade-in">
      {step === 'intro' && <IntroPage onGetStarted={handleGetStarted} onDemoMode={handleDemoMode} />}

      {step === 'connect' && <ConnectWalletPage onConnected={handleWalletConnected} />}

      {step === 'dashboard' && wallet && (
        <DashboardPage
          wallet={wallet}
          onViewStreams={handleViewStreams}
          onCreateStream={handleCreateStream}
          onViewHistory={handleViewHistory}
        />
      )}

      {step === 'active-streams' && wallet && (
        <ActiveStreamsPage
          wallet={wallet}
          provider={wallet.provider}
          onCreateStream={handleCreateStream}
          onBack={handleBackToDashboard}
          demoStreams={demoStreams}
          onCancelStream={handleCancelStream}
        />
      )}

      {step === 'create-stream' && wallet && (
        <CreateStreamPage
          wallet={wallet}
          provider={wallet.provider}
          onStreamCreated={handleStreamCreated}
          onBack={handleBackToDashboard}
        />
      )}

      {step === 'history' && wallet && (
        <HistoryPage
          wallet={wallet}
          provider={wallet.provider}
          onBack={handleBackToDashboard}
          onCreateStream={handleCreateStream}
          demoHistory={demoHistory}
        />
      )}
    </div>
  );
}

export default App;

