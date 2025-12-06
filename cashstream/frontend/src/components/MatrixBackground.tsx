import React, { useEffect, useRef } from 'react';
import '../styles/matrix-background.css';

/**
 * MatrixBackground - Animated code rain background wrapper
 * 
 * Features:
 * - Vertical falling code rain (Matrix style)
 * - Dim neon green glow
 * - Subtle cyber grid overlay
 * - Non-interactive (pointer-events-none)
 * - Wraps any children without affecting layout
 * 
 * @component
 * @example
 * <MatrixBackground>
 *   <YourPage />
 * </MatrixBackground>
 */

interface MatrixBackgroundProps {
  children: React.ReactNode;
}

export const MatrixBackground: React.FC<MatrixBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    // Draw matrix rain
    const draw = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(10, 15, 13, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw characters
      ctx.fillStyle = '#35FF79';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="matrix-background-wrapper">
      {/* Matrix Code Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="matrix-canvas"
      />

      {/* Cyber Grid Overlay */}
      <div className="cyber-grid-overlay" />

      {/* Content */}
      <div className="matrix-content">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackground;
