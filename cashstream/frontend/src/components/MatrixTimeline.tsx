import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * MatrixTimeline - Holographic vertical timeline for stream history
 * 
 * Features:
 * - Vertical timeline with neon green cyberpunk terminal aesthetic
 * - Success logs with green glow pulse
 * - Canceled logs with red electric distortion burst on hover
 * - Typewriter text animation on first render
 * - Hover reveals extra metadata (stream ID, blocks, total amount)
 * - Low-power glow effects (mobile-optimized)
 * - Monospace font (JetBrains Mono fallback)
 * - Respects reduced motion preferences
 * 
 * @component
 * @example
 * <MatrixTimeline entries={historyEntries} />
 */

interface HistoryEntry {
  receiver: string;
  amount: string;
  interval: string;
  counter: string;
  status: 'Completed' | 'Canceled';
  timestamp?: string;
  historyId: string;
  totalStreamed: number;
}

interface MatrixTimelineProps {
  /** Array of history entries to display */
  entries: HistoryEntry[];
  /** Callback to format addresses */
  formatAddress?: (address: string) => string;
  /** Callback to format timestamps */
  formatTimestamp?: (timestamp?: string) => string;
}

// Typewriter effect hook
const useTypewriter = (text: string, speed: number = 30) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Timeline entry component
const TimelineEntry: React.FC<{
  entry: HistoryEntry;
  index: number;
  formatAddress?: (address: string) => string;
  formatTimestamp?: (timestamp?: string) => string;
}> = ({ entry, index, formatAddress, formatTimestamp }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const isCompleted = entry.status === 'Completed';
  const primaryColor = isCompleted ? '#35FF79' : '#FF6B6B';
  const glowColor = isCompleted ? 'rgba(53, 255, 121, 0.3)' : 'rgba(255, 107, 107, 0.3)';

  // Typewriter for date and amount
  const dateText = formatTimestamp ? formatTimestamp(entry.timestamp) : (entry.timestamp || 'Unknown date');
  const amountText = `${entry.totalStreamed} MASSA`;
  
  const { displayText: displayDate, isComplete: dateComplete } = useTypewriter(
    hasAnimated ? dateText : '',
    20
  );
  const { displayText: displayAmount } = useTypewriter(
    hasAnimated && dateComplete ? amountText : '',
    20
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        paddingLeft: '48px',
        paddingBottom: 'var(--space-xl)',
      }}
    >
      {/* Timeline dot */}
      <motion.div
        style={{
          position: 'absolute',
          left: '0',
          top: '8px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: primaryColor,
          border: `2px solid ${primaryColor}`,
          boxShadow: `0 0 ${isHovered ? '20px' : '10px'} ${glowColor}`,
          zIndex: 2,
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          boxShadow: isCompleted
            ? [
                `0 0 10px ${glowColor}`,
                `0 0 20px ${glowColor}`,
                `0 0 10px ${glowColor}`,
              ]
            : `0 0 ${isHovered ? '25px' : '10px'} ${glowColor}`,
        }}
        transition={{
          scale: { duration: 0.2 },
          boxShadow: isCompleted
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 },
        }}
      />

      {/* Timeline line */}
      <div
        style={{
          position: 'absolute',
          left: '7px',
          top: '24px',
          bottom: '0',
          width: '2px',
          background: `linear-gradient(180deg, ${primaryColor} 0%, transparent 100%)`,
          opacity: 0.3,
        }}
      />

      {/* Data log chunk */}
      <motion.div
        style={{
          background: 'rgba(0, 0, 0, 0.6)',
          border: `1px solid ${primaryColor}`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-md)',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: 'var(--text-sm)',
          color: primaryColor,
          boxShadow: isHovered
            ? `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}`
            : `0 0 5px ${glowColor}`,
          position: 'relative',
          overflow: 'hidden',
        }}
        animate={{
          borderColor: isHovered && !isCompleted ? ['#FF6B6B', '#FF3333', '#FF6B6B'] : primaryColor,
        }}
        transition={{
          borderColor: { duration: 0.3, repeat: isHovered && !isCompleted ? Infinity : 0 },
        }}
      >
        {/* Distortion effect for canceled on hover */}
        {!isCompleted && isHovered && (
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 107, 107, 0.1) 50%, transparent 70%)',
              pointerEvents: 'none',
            }}
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Status header */}
        <div style={{ marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <span style={{ fontSize: '1rem' }}>{isCompleted ? '✓' : '✗'}</span>
          <span style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {entry.status}
          </span>
        </div>

        {/* Date with typewriter */}
        <div style={{ marginBottom: 'var(--space-xs)', opacity: 0.8 }}>
          <span style={{ color: '#888' }}>{'>'} </span>
          {displayDate}
          {!dateComplete && <span className="cursor-blink">_</span>}
        </div>

        {/* Amount with typewriter */}
        <div style={{ marginBottom: 'var(--space-sm)', fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
          <span style={{ color: '#888' }}>{'>'} </span>
          {displayAmount}
          {dateComplete && displayAmount.length < amountText.length && <span className="cursor-blink">_</span>}
        </div>

        {/* Receiver */}
        <div style={{ marginBottom: 'var(--space-xs)', opacity: 0.7, fontSize: 'var(--text-xs)' }}>
          <span style={{ color: '#666' }}>TO: </span>
          {formatAddress ? formatAddress(entry.receiver) : entry.receiver}
        </div>

        {/* Hover metadata */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{
            overflow: 'hidden',
            marginTop: isHovered ? 'var(--space-sm)' : 0,
            paddingTop: isHovered ? 'var(--space-sm)' : 0,
            borderTop: isHovered ? `1px solid ${primaryColor}` : 'none',
          }}
        >
          <div style={{ fontSize: 'var(--text-xs)', opacity: 0.6, lineHeight: 1.6 }}>
            <div>
              <span style={{ color: '#666' }}>STREAM_ID: </span>
              {entry.historyId}
            </div>
            <div>
              <span style={{ color: '#666' }}>INTERVAL: </span>
              {entry.interval} cycles
            </div>
            <div>
              <span style={{ color: '#666' }}>AMOUNT/CYCLE: </span>
              {entry.amount}
            </div>
            <div>
              <span style={{ color: '#666' }}>TOTAL_CYCLES: </span>
              {entry.counter}
            </div>
            <div>
              <span style={{ color: '#666' }}>TOTAL_STREAMED: </span>
              {entry.totalStreamed} MASSA
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scoped styles */}
      <style>{`
        @keyframes cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>
    </motion.div>
  );
};

export const MatrixTimeline: React.FC<MatrixTimelineProps> = ({
  entries,
  formatAddress,
  formatTimestamp,
}) => {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--space-lg)',
      }}
    >
      {/* Timeline header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          marginBottom: 'var(--space-xl)',
          padding: 'var(--space-md)',
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #35FF79',
          borderRadius: 'var(--radius-md)',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: 'var(--text-sm)',
          color: '#35FF79',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
        }}
      >
        <div style={{ marginBottom: 'var(--space-xs)' }}>
          ▼ MATRIX DATA TIMELINE ▼
        </div>
        <div style={{ fontSize: 'var(--text-xs)', opacity: 0.6 }}>
          {entries.length} TRANSACTION{entries.length !== 1 ? 'S' : ''} LOGGED
        </div>
      </motion.div>

      {/* Timeline entries */}
      <div style={{ position: 'relative' }}>
        {entries.map((entry, index) => (
          <TimelineEntry
            key={entry.historyId}
            entry={entry}
            index={index}
            formatAddress={formatAddress}
            formatTimestamp={formatTimestamp}
          />
        ))}
      </div>

      {/* Timeline footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: entries.length * 0.1 + 0.5 }}
        style={{
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-sm)',
          textAlign: 'center',
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: 'var(--text-xs)',
          color: '#666',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        ▲ END OF TIMELINE ▲
      </motion.div>

      {/* Responsive and accessibility styles */}
      <style>{`
        @media (max-width: 640px) {
          .matrix-timeline-entry {
            padding-left: 32px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MatrixTimeline;
