import React from 'react';
import { motion } from 'framer-motion';

/**
 * FlowBeam - Animated neon energy flow between sender and receiver
 * 
 * Features:
 * - Neon green energy flow (#35FF79) with blue edge highlights (#00F6FF)
 * - Pulse speed based on interval (minute=fast, hour=fast, daily=medium, monthly=slow)
 * - Reverses direction if user is receiver instead of sender
 * - Responsive design (mobile-first)
 * - Sits behind wallet icons
 * - Uses framer-motion for smooth animations
 * 
 * @component
 * @example
 * <FlowBeam
 *   senderAddress="AU12..."
 *   receiverAddress="AU34..."
 *   userAddress="AU12..."
 *   interval="3600"
 *   amount="100"
 * />
 */

interface FlowBeamProps {
  /** Sender wallet address */
  senderAddress: string;
  /** Receiver wallet address */
  receiverAddress: string;
  /** Current user's wallet address */
  userAddress: string;
  /** Stream interval in seconds or cycles */
  interval: string | number;
  /** Amount being streamed */
  amount: string | number;
}

// Speed mappings based on interval
const getAnimationSpeed = (interval: string | number): number => {
  const intervalNum = typeof interval === 'string' ? parseInt(interval) : interval;
  
  // Assume intervals are in seconds or cycles
  // Minute: 60s = super fast (0.8s)
  // Hour: 3600s = fast (1.5s)
  // Daily: 86400s = medium (2.5s)
  // Monthly: 2592000s = slow (4s)
  
  if (intervalNum <= 60) {
    return 0.8; // Super fast - minute
  } else if (intervalNum <= 3600) {
    return 1.5; // Fast - hour
  } else if (intervalNum <= 86400) {
    return 2.5; // Medium - daily
  } else {
    return 4; // Slow - monthly
  }
};

export const FlowBeam: React.FC<FlowBeamProps> = ({
  senderAddress: _senderAddress,
  receiverAddress,
  userAddress,
  interval,
  amount: _amount,
}) => {
  // Determine if flow should reverse (user is receiver)
  const isUserReceiver = userAddress.toLowerCase() === receiverAddress.toLowerCase();
  const animationSpeed = getAnimationSpeed(interval);

  return (
    <div
      className="flow-beam-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Sender Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(110, 231, 255, 0.15)',
          border: '2px solid #00F6FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 0 20px rgba(0, 246, 255, 0.4)',
        }}
      >
        👛
      </div>

      {/* Beam Container */}
      <div
        style={{
          position: 'absolute',
          left: '72px',
          right: '72px',
          height: '4px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        {/* Base beam glow */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(0, 246, 255, 0.3) 0%, rgba(53, 255, 121, 0.3) 50%, rgba(0, 246, 255, 0.3) 100%)',
            filter: 'blur(8px)',
            opacity: 0.6,
          }}
        />

        {/* Main beam line */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '2px',
            top: '1px',
            background: 'linear-gradient(90deg, #00F6FF 0%, #35FF79 50%, #00F6FF 100%)',
            boxShadow: '0 0 10px #35FF79',
          }}
        />

        {/* Animated energy particles */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            style={{
              position: 'absolute',
              width: '40px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #35FF79, transparent)',
              boxShadow: '0 0 15px #35FF79',
              filter: 'blur(1px)',
              top: 0,
            }}
            animate={{
              x: isUserReceiver 
                ? ['100%', '-100%'] // Reverse: right to left
                : ['-100%', '100%'], // Normal: left to right
            }}
            transition={{
              duration: animationSpeed,
              repeat: Infinity,
              ease: 'linear',
              delay: index * (animationSpeed / 3),
            }}
          />
        ))}

        {/* Pulsing energy orbs */}
        {[0, 1].map((index) => (
          <motion.div
            key={`orb-${index}`}
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#35FF79',
              boxShadow: '0 0 20px #35FF79, 0 0 40px rgba(53, 255, 121, 0.5)',
              top: '-4px',
            }}
            animate={{
              x: isUserReceiver 
                ? ['100%', '-100%'] // Reverse
                : ['-100%', '100%'], // Normal
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: animationSpeed,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * (animationSpeed / 2),
            }}
          />
        ))}

        {/* Edge highlights */}
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: 0,
            background: 'linear-gradient(90deg, transparent, #00F6FF, transparent)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: animationSpeed * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, #00F6FF, transparent)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: animationSpeed * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: animationSpeed * 0.25,
          }}
        />
      </div>

      {/* Receiver Icon */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(53, 255, 121, 0.15)',
          border: '2px solid #35FF79',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 0 20px rgba(53, 255, 121, 0.4)',
        }}
      >
        🎯
      </div>

      {/* Direction indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 'var(--space-sm)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 'var(--text-xs)',
          color: '#35FF79',
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 8px rgba(53, 255, 121, 0.5)',
          zIndex: 2,
        }}
      >
        {isUserReceiver ? '← Receiving' : 'Sending →'}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .flow-beam-container {
            height: 100px !important;
            padding: 0 var(--space-md) !important;
          }
          
          .flow-beam-container > div:first-child,
          .flow-beam-container > div:last-child {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.25rem !important;
          }
        }

        @media (max-width: 480px) {
          .flow-beam-container {
            height: 80px !important;
            padding: 0 var(--space-sm) !important;
          }
          
          .flow-beam-container > div:first-child,
          .flow-beam-container > div:last-child {
            width: 36px !important;
            height: 36px !important;
            font-size: 1rem !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .flow-beam-container * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default FlowBeam;
