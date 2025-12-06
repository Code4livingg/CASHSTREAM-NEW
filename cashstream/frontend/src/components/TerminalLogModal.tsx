import React, { useState, useEffect } from 'react';
import '../styles/design-system.css';

/**
 * TerminalLogModal - Cyberpunk terminal log display with typing effect
 * 
 * Features:
 * - Dark terminal aesthetic
 * - Typing animation for log lines
 * - Displays transaction details (block number, tx hash)
 * - Close button
 * - Backdrop blur overlay
 * - Neon green terminal text
 * 
 * @component
 * @example
 * <TerminalLogModal
 *   isOpen={showModal}
 *   blockNumber="12345"
 *   txHash="0xabc123..."
 *   onClose={() => setShowModal(false)}
 * />
 */

interface TerminalLogModalProps {
  /** Whether the modal is visible */
  isOpen: boolean;
  /** Block number where transaction was confirmed */
  blockNumber?: string;
  /** Transaction hash */
  txHash?: string;
  /** Callback when modal is closed */
  onClose: () => void;
}

export const TerminalLogModal: React.FC<TerminalLogModalProps> = ({
  isOpen,
  blockNumber = '---',
  txHash = '---',
  onClose,
}) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [currentLineText, setCurrentLineText] = useState<string>('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Terminal log lines
  const logLines = [
    '[STREAM ACTIVE] Executing transmission...',
    `[BEGIN BLOCK ${blockNumber}]`,
    `[CONFIRMED TX: ${txHash}]`,
    '[STREAM SUCCESS]',
  ];

  // Reset animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setVisibleLines(0);
      setCurrentLineText('');
      setIsTypingComplete(false);
    }
  }, [isOpen]);

  // Typing animation effect
  useEffect(() => {
    if (!isOpen || visibleLines >= logLines.length) {
      if (visibleLines >= logLines.length) {
        setIsTypingComplete(true);
      }
      return;
    }

    const currentLine = logLines[visibleLines];
    const currentLength = currentLineText.length;

    if (currentLength < currentLine.length) {
      // Type next character
      const timeout = setTimeout(() => {
        setCurrentLineText(currentLine.slice(0, currentLength + 1));
      }, 30); // 30ms per character for fast typing

      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next line after brief pause
      const timeout = setTimeout(() => {
        setVisibleLines(visibleLines + 1);
        setCurrentLineText('');
      }, 400); // 400ms pause between lines

      return () => clearTimeout(timeout);
    }
  }, [isOpen, visibleLines, currentLineText, logLines]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-xl)',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      {/* Terminal Window */}
      <div
        className="terminal-log-modal"
        style={{
          maxWidth: '600px',
          width: '100%',
          background: '#0a0e14',
          border: '2px solid #39FF14',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 0 30px rgba(57, 255, 20, 0.3), 0 20px 60px rgba(0, 0, 0, 0.8)',
          overflow: 'hidden',
          animation: 'terminalSlideIn 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: 'var(--space-md)',
            background: '#0d1117',
            borderBottom: '1px solid #39FF14',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#39FF14',
                boxShadow: '0 0 8px #39FF14',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: '#39FF14',
                fontWeight: 'var(--font-semibold)',
              }}
            >
              CASHSTREAM_TERMINAL
            </span>
          </div>
          
          <button
            onClick={onClose}
            disabled={!isTypingComplete}
            style={{
              background: 'transparent',
              border: '1px solid #39FF14',
              color: '#39FF14',
              padding: 'var(--space-xs) var(--space-sm)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              cursor: isTypingComplete ? 'pointer' : 'not-allowed',
              opacity: isTypingComplete ? 1 : 0.5,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (isTypingComplete) {
                e.currentTarget.style.background = '#39FF14';
                e.currentTarget.style.color = '#0a0e14';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#39FF14';
            }}
          >
            [CLOSE]
          </button>
        </div>

        {/* Terminal Body */}
        <div
          style={{
            padding: 'var(--space-xl)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: '1.8',
            color: '#39FF14',
            minHeight: '200px',
            background: '#0a0e14',
          }}
        >
          {/* Render completed lines */}
          {logLines.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              style={{
                marginBottom: 'var(--space-sm)',
                textShadow: '0 0 8px rgba(57, 255, 20, 0.5)',
              }}
            >
              <span style={{ color: '#666', marginRight: 'var(--space-sm)' }}>{'>'}</span>
              {line}
            </div>
          ))}

          {/* Render currently typing line */}
          {visibleLines < logLines.length && currentLineText && (
            <div
              style={{
                marginBottom: 'var(--space-sm)',
                textShadow: '0 0 8px rgba(57, 255, 20, 0.5)',
              }}
            >
              <span style={{ color: '#666', marginRight: 'var(--space-sm)' }}>{'>'}</span>
              {currentLineText}
              <span
                className="terminal-cursor"
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  background: '#39FF14',
                  marginLeft: '2px',
                  animation: 'terminalBlink 1s step-end infinite',
                }}
              />
            </div>
          )}

          {/* Completion message */}
          {isTypingComplete && (
            <div
              style={{
                marginTop: 'var(--space-lg)',
                padding: 'var(--space-md)',
                background: 'rgba(57, 255, 20, 0.1)',
                border: '1px solid #39FF14',
                borderRadius: 'var(--radius-md)',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-out',
              }}
            >
              <span style={{ fontSize: 'var(--text-lg)' }}>✓</span> Stream deployed successfully
            </div>
          )}
        </div>
      </div>

      {/* Scoped animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes terminalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes terminalBlink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .terminal-log-modal {
            max-width: 100% !important;
            margin: var(--space-md);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .terminal-log-modal,
          .terminal-cursor {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TerminalLogModal;
