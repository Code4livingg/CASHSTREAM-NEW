import { useEffect, useState } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 800);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'splash-screen--fade' : ''}`}>
      <div className="splash-content">
        <div className="cash-stream-animation">
          <div className="coin coin-1">💰</div>
          <div className="coin coin-2">💰</div>
          <div className="coin coin-3">💰</div>
          <div className="stream-line"></div>
        </div>
        <h1 className="splash-title">
          <span className="cash">Cash</span>
          <span className="stream">Stream</span>
        </h1>
        <p className="splash-tagline">Autonomous Payments on Massa</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
}
