import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * VaultScanOverlay - Matrix Hacker Terminal themed animation overlay
 * 
 * Style: Neon green (#35FF79), cyber-aqua (#00F6FF), black chrome (#0A0F0D)
 * 
 * Animation Flow:
 * Phase 1: Digital Lock Grid (hex scramble) - 1.6s
 * Phase 2: Laser Scan Gate - 1.6s
 * Phase 3: Confirm Button - User action required
 * 
 * @component
 */

interface VaultScanOverlayProps {
  open: boolean;
  walletAddress: string;
  receiverAddress: string;
  amountLabel: string;
  onCancel: () => void;
  onExecute: () => void;
}

// Helper: Generate random hex string (4 chars)
const generateRandomHex = (): string => {
  return Math.random().toString(16).substr(2, 4).toUpperCase();
};

// Helper: Shorten address for display
const shortenAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const VaultScanOverlay: React.FC<VaultScanOverlayProps> = ({
  open,
  walletAddress,
  receiverAddress,
  amountLabel,
  onCancel,
  onExecute,
}) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [hexGrid, setHexGrid] = useState<string[]>([]);

  // Initialize hex grid
  useEffect(() => {
    if (open) {
      setPhase(1);
      setHexGrid(Array.from({ length: 36 }, () => generateRandomHex()));
    }
  }, [open]);

  // Auto-transition phases
  useEffect(() => {
    if (!open) return;

    if (phase === 1) {
      const timer = setTimeout(() => setPhase(2), 1600);
      return () => clearTimeout(timer);
    }

    if (phase === 2) {
      const timer = setTimeout(() => setPhase(3), 1600);
      return () => clearTimeout(timer);
    }
  }, [phase, open]);

  // Scramble hex grid animation
  useEffect(() => {
    if (phase === 1) {
      const interval = setInterval(() => {
        setHexGrid(Array.from({ length: 36 }, () => generateRandomHex()));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [phase]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #0A0F0D 0%, #000000 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '700px', padding: '2rem' }}>
            {/* Phase 1: Digital Lock Grid */}
            {phase === 1 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #35FF79, #00F6FF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '2rem',
                    letterSpacing: '2px',
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔐 INITIALIZING SECURE VAULT
                </motion.h2>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, 1fr)',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                  }}
                >
                  {hexGrid.map((hex, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(53, 255, 121, 0.05)',
                        border: '1px solid #35FF79',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        color: '#35FF79',
                        fontWeight: 'bold',
                        boxShadow: '0 0 10px rgba(53, 255, 121, 0.3)',
                      }}
                    >
                      {hex}
                    </motion.div>
                  ))}
                </div>

                <motion.p
                  style={{
                    color: '#00F6FF',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  &gt; ENCRYPTING TRANSACTION DATA...
                </motion.p>
              </motion.div>
            )}

            {/* Phase 2: Laser Scan Gate */}
            {phase === 2 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    background: 'linear-gradient(90deg, #00F6FF, #35FF79)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '2rem',
                    letterSpacing: '2px',
                  }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🔍 SCANNING AUTHORIZATION
                </motion.h2>

                <div
                  style={{
                    position: 'relative',
                    width: '400px',
                    height: '400px',
                    margin: '0 auto 2rem',
                    border: '3px solid #00F6FF',
                    borderRadius: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 30px rgba(0, 246, 255, 0.5)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Laser Scan Bar */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, transparent, #35FF79, transparent)',
                      boxShadow: '0 0 20px #35FF79',
                    }}
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 1.6, ease: 'easeInOut' }}
                  />

                  {/* Scan Data */}
                  <div style={{ zIndex: 1, textAlign: 'center', padding: '1rem' }}>
                    <motion.div
                      style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      🔐
                    </motion.div>

                    <div style={{ color: '#35FF79', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <strong>WALLET:</strong> {shortenAddress(walletAddress)}
                    </div>
                    <div style={{ color: '#00F6FF', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      <strong>RECEIVER:</strong> {shortenAddress(receiverAddress)}
                    </div>
                    <div style={{ color: '#35FF79', fontSize: '1rem', fontWeight: 'bold' }}>
                      <strong>AMOUNT:</strong> {amountLabel}
                    </div>
                  </div>
                </div>

                <motion.p
                  style={{
                    color: '#00F6FF',
                    fontSize: '1rem',
                    letterSpacing: '1px',
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  &gt; VERIFYING BLOCKCHAIN CREDENTIALS...
                </motion.p>
              </motion.div>
            )}

            {/* Phase 3: Confirm Button */}
            {phase === 3 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h2
                  style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#35FF79',
                    marginBottom: '2rem',
                    letterSpacing: '2px',
                    textShadow: '0 0 20px rgba(53, 255, 121, 0.8)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ✅ AUTHORIZATION COMPLETE
                </motion.h2>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    padding: '2rem',
                    background: 'rgba(53, 255, 121, 0.05)',
                    border: '2px solid #35FF79',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    boxShadow: '0 0 30px rgba(53, 255, 121, 0.3)',
                  }}
                >
                  <div style={{ color: '#00F6FF', fontSize: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
                    <strong style={{ color: '#35FF79' }}>WALLET:</strong>
                    <br />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {shortenAddress(walletAddress)}
                    </span>
                  </div>

                  <div style={{ color: '#00F6FF', fontSize: '1rem', marginBottom: '1rem', textAlign: 'left' }}>
                    <strong style={{ color: '#35FF79' }}>RECEIVER:</strong>
                    <br />
                    <span style={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      {shortenAddress(receiverAddress)}
                    </span>
                  </div>

                  <div style={{ color: '#00F6FF', fontSize: '1rem', textAlign: 'left' }}>
                    <strong style={{ color: '#35FF79' }}>AMOUNT:</strong>
                    <br />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#35FF79' }}>
                      {amountLabel}
                    </span>
                  </div>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onExecute}
                  style={{
                    width: '100%',
                    padding: '1.25rem 2rem',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#0A0F0D',
                    background: 'linear-gradient(135deg, #35FF79, #00F6FF)',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    letterSpacing: '2px',
                    boxShadow: '0 0 30px rgba(53, 255, 121, 0.6)',
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  🚀 EXECUTE STREAM TRANSMISSION
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onCancel}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#00F6FF',
                    background: 'transparent',
                    border: '2px solid #00F6FF',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  ABORT MISSION
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VaultScanOverlay;
