import React from 'react';
import { motion } from 'framer-motion';

/**
 * FlowBeamHybrid - Quantum Waterfall Flow Beam
 * 
 * Combines:
 * - Quantum Filament Flow: thin fiber-optic micro-lines
 * - Crypto Waterfall: droplet-like pulses swimming through the beam
 * 
 * Features:
 * - Neon green core (#35FF79) with aqua highlights (#00F6FF)
 * - Black chrome background (#0A0F0D)
 * - 2-4px fiber-optic lines
 * - Circular droplet particles with random timing
 * - Direction based on user role (sender/receiver)
 * - Speed based on interval (minute/hour/daily/monthly)
 * - GPU-friendly animations
 * - Responsive mobile-first design
 * - Reduced motion support
 * 
 * @component
 * @example
 * <FlowBeamHybrid
 *   sender="AU12..."
 *   receiver="AU34..."
 *   interval="hour"
 *   isSenderView={true}
 *   streamAmount="100"
 * />
 */

interface FlowBeamHybridProps {
  /** Sender wallet address */
  sender: string;
  /** Receiver wallet address */
  receiver: string;
  /** Stream interval type */
  interval: 'minute' | 'hour' | 'daily' | 'monthly';
  /** Whether logged-in wallet matches sender */
  isSenderView: boolean;
  /** Stream amount (display only) */
  streamAmount: string;
}

// Speed mapping based on interval
const getFlowSpeed = (interval: 'minute' | 'hour' | 'daily' | 'monthly'): number => {
  const speedMap = {
    minute: 0.6,   // Ultra fast
    hour: 1.2,     // Fast
    daily: 2.0,    // Medium
    monthly: 3.5,  // Slow
  };
  return speedMap[interval];
};

// Generate random delay for droplets
const getRandomDelay = (index: number): number => {
  return (index * 0.15) + (Math.random() * 0.3);
};

// Generate random acceleration curve
const getRandomEasing = (): string => {
  const easings = [
    'easeInOut',
    'easeIn',
    'easeOut',
    'linear',
  ];
  return easings[Math.floor(Math.random() * easings.length)];
};

export const FlowBeamHybrid: React.FC<FlowBeamHybridProps> = ({
  sender: _sender,
  receiver: _receiver,
  interval,
  isSenderView,
  streamAmount: _streamAmount,
}) => {
  const flowSpeed = getFlowSpeed(interval);
  const isReversed = !isSenderView; // Reverse if user is receiver

  return (
    <div
      className="flow-beam-hybrid-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '140px',
        background: '#0A0F0D',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-xl)',
      }}
    >
      {/* Sender Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(0, 246, 255, 0.2), rgba(53, 255, 121, 0.2))',
          border: '2px solid #00F6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          boxShadow: '0 0 25px rgba(0, 246, 255, 0.5)',
        }}
      >
        💎
      </div>

      {/* Quantum Filament Flow Container */}
      <div
        style={{
          position: 'absolute',
          left: '88px',
          right: '88px',
          height: '100%',
          top: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* Fiber-optic micro-lines (4 lines) */}
        {[0, 1, 2, 3].map((lineIndex) => {
          const yOffset = (lineIndex - 1.5) * 12; // Spread lines vertically
          const lineWidth = lineIndex % 2 === 0 ? '3px' : '2px';
          const lineColor = lineIndex % 2 === 0 ? '#35FF79' : '#00F6FF';
          const lineOpacity = 0.6 + (lineIndex * 0.1);

          return (
            <div
              key={`line-${lineIndex}`}
              style={{
                position: 'absolute',
                width: '100%',
                height: lineWidth,
                top: `calc(50% + ${yOffset}px)`,
                left: 0,
                overflow: 'hidden',
              }}
            >
              {/* Base line */}
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${lineColor}, transparent)`,
                  opacity: lineOpacity * 0.4,
                }}
              />

              {/* Animated energy pulse along line */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '60px',
                  height: '100%',
                  background: `linear-gradient(90deg, transparent, ${lineColor}, ${lineColor}, transparent)`,
                  boxShadow: `0 0 8px ${lineColor}`,
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  x: isReversed ? ['100%', '-100%'] : ['-100%', '100%'],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: flowSpeed * 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: lineIndex * 0.2,
                }}
              />
            </div>
          );
        })}

        {/* Waterfall droplets (8 particles) */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((dropletIndex) => {
          const dropletSize = 6 + (dropletIndex % 3) * 2; // Vary size 6-10px
          const yOffset = ((dropletIndex % 4) - 1.5) * 15; // Spread vertically
          const dropletColor = dropletIndex % 3 === 0 ? '#35FF79' : '#00F6FF';
          const randomDelay = getRandomDelay(dropletIndex);
          const randomEasing = getRandomEasing();

          return (
            <motion.div
              key={`droplet-${dropletIndex}`}
              style={{
                position: 'absolute',
                width: `${dropletSize}px`,
                height: `${dropletSize}px`,
                borderRadius: '50%',
                background: dropletColor,
                boxShadow: `0 0 12px ${dropletColor}, 0 0 6px ${dropletColor}`,
                top: `calc(50% + ${yOffset}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: isReversed ? ['100%', '-100%'] : ['-100%', '100%'],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: flowSpeed * (0.8 + Math.random() * 0.4), // Random acceleration
                repeat: Infinity,
                ease: randomEasing as any,
                delay: randomDelay,
              }}
            />
          );
        })}

        {/* Quantum glow overlay */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'radial-gradient(ellipse at center, rgba(53, 255, 121, 0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: flowSpeed * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Edge fiber highlights */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: 'calc(50% - 20px)',
            background: 'linear-gradient(90deg, transparent, #00F6FF 50%, transparent)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: flowSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: 'calc(50% + 20px)',
            background: 'linear-gradient(90deg, transparent, #00F6FF 50%, transparent)',
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: flowSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: flowSpeed * 0.5,
          }}
        />
      </div>

      {/* Receiver Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(53, 255, 121, 0.2), rgba(0, 246, 255, 0.2))',
          border: '2px solid #35FF79',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          boxShadow: '0 0 25px rgba(53, 255, 121, 0.5)',
        }}
      >
        🎯
      </div>

      {/* Flow direction indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-sm)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'var(--text-xs)',
          color: '#35FF79',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 10px rgba(53, 255, 121, 0.6)',
          zIndex: 3,
          fontWeight: 'bold',
          letterSpacing: '0.1em',
        }}
      >
        {isReversed ? '← RECEIVING' : 'SENDING →'}
      </div>

      {/* Speed indicator */}
      <div
        style={{
          position: 'absolute',
          top: 'var(--space-sm)',
          right: 'var(--space-md)',
          fontSize: 'var(--text-xs)',
          color: '#00F6FF',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 8px rgba(0, 246, 255, 0.6)',
          zIndex: 3,
          opacity: 0.8,
          textTransform: 'uppercase',
        }}
      >
        {interval}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .flow-beam-hybrid-container {
            height: 120px !important;
            padding: 0 var(--space-lg) !important;
          }
          
          .flow-beam-hybrid-container > div:first-child,
          .flow-beam-hybrid-container > div:nth-child(3) {
            width: 48px !important;
            height: 48px !important;
            font-size: 1.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .flow-beam-hybrid-container {
            height: 100px !important;
            padding: 0 var(--space-md) !important;
          }
          
          .flow-beam-hybrid-container > div:first-child,
          .flow-beam-hybrid-container > div:nth-child(3) {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.25rem !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .flow-beam-hybrid-container * {
            animation: none !important;
            transition: none !important;
          }
          
          .flow-beam-hybrid-container motion-div {
            animation: none !important;
          }
        }

        /* GPU acceleration hints */
        .flow-beam-hybrid-container {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default FlowBeamHybrid;
