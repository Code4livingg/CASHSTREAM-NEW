import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Args,
  Account,
  JsonRpcProvider,
  Address,
  strToBytes,
} from '@massalabs/massa-web3';
import type { WalletConnection } from './lib/massaWallet';
import SplashScreen from './components/SplashScreen';
import './App.css';

type StatusVariant = 'idle' | 'success' | 'error' | 'info';

type StreamForm = {
  receiver: string;
  amount: string;
  interval: string;
};

type Stream = {
  receiver: string;
  amount: string;
  interval: string;
  counter: string;
  streamId: string;
};

const CONTRACT_ADDRESS = import.meta.env.VITE_CASHSTREAM_ADDRESS ?? '';
const RPC_URL = import.meta.env.VITE_MASSA_RPC_URL;

interface AppMainProps {
  /** Wallet connection from onboarding flow (optional for backward compatibility) */
  wallet?: WalletConnection | null;
}

/**
 * AppMain - Original CashStream application
 * This is the main dashboard/app that users see after onboarding
 * Now accepts wallet connection from onboarding flow
 */
function AppMain({ wallet: initialWallet }: AppMainProps = {}) {
  const [showSplash, setShowSplash] = useState(true);
  const [form, setForm] = useState<StreamForm>({
    receiver: '',
    amount: '',
    interval: '',
  });

  const [status, setStatus] = useState<{ message: string; variant: StatusVariant }>({
    message: '',
    variant: 'idle',
  });

  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(!!initialWallet);
  const [provider, setProvider] = useState<any>(initialWallet?.provider || null);
  const [account, setAccount] = useState<Account | null>(initialWallet?.account || null);
  const [streams, setStreams] = useState<Stream[]>([]);

  // Initialize wallet from props if provided
  useEffect(() => {
    if (initialWallet) {
      console.log('💼 Using wallet from onboarding:', initialWallet.address);
      setAccount(initialWallet.account);
      setProvider(initialWallet.provider);
      setWalletConnected(true);
      setForm((prev) => ({ ...prev, receiver: initialWallet.address }));
      toast(`Wallet connected: ${initialWallet.address.slice(0, 8)}...`, 'success');
    }
  }, [initialWallet]);

  const toast = (message: string, variant: StatusVariant) => {
    setStatus({ message, variant });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const cleanedValue = name === 'receiver' ? value.replace(/\s/g, '').trim() : value.trim();
    setForm((prev) => ({ ...prev, [name]: cleanedValue }));
  };

  const handleConnect = async () => {
    const pk = import.meta.env.VITE_PRIVATE_KEY?.trim();

    if (!pk) {
      toast('Private key missing in .env', 'error');
      return;
    }

    try {
      const acc = await Account.fromPrivateKey(pk);
      const prov = JsonRpcProvider.fromRPCUrl(RPC_URL);
      const connectedAddress = acc.address.toString();

      setAccount(acc);
      setProvider(prov);
      setWalletConnected(true);
      setForm((prev) => ({ ...prev, receiver: connectedAddress }));

      toast(`Wallet connected: ${connectedAddress.slice(0, 8)}...`, 'success');
      setTimeout(() => fetchStreams(), 500);
    } catch (err) {
      console.error('Wallet connection error:', err);
      toast('Failed to connect wallet.', 'error');
    }
  };

  const fetchStreams = async () => {
    if (!CONTRACT_ADDRESS) return;

    try {
      const pub = JsonRpcProvider.fromRPCUrl(RPC_URL);
      const streamKey = [strToBytes('STREAMS')];
      const streamStorage = await pub.readStorage(CONTRACT_ADDRESS, streamKey);

      if (streamStorage && streamStorage[0] && streamStorage[0].length > 0) {
        try {
          const raw = new TextDecoder().decode(streamStorage[0]);
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const parsedStreams: Stream[] = parsed.map((s: any, i: number) => ({
              receiver: String(s.receiver || ''),
              amount: String(s.amount || '0'),
              interval: String(s.interval || '0'),
              counter: String(s.counter || '0'),
              streamId: s.streamId || `s-${i}`,
            }));
            setStreams(parsedStreams);
            return;
          }
        } catch (err) {
          console.warn('Failed to parse STREAMS storage, falling back to legacy keys', err);
        }
      }

      const keys = [
        strToBytes('receiver'),
        strToBytes('amount'),
        strToBytes('interval'),
        strToBytes('counter'),
      ];

      const storage = await pub.readStorage(CONTRACT_ADDRESS, keys);

      const hasData = storage && storage.some((s) => s && s.length > 0);
      if (hasData) {
        const receiver = storage[0] ? new TextDecoder().decode(storage[0]) : '';
        const amount = storage[1] ? new TextDecoder().decode(storage[1]) : '0';
        const interval = storage[2] ? new TextDecoder().decode(storage[2]) : '0';
        const counter = storage[3] ? new TextDecoder().decode(storage[3]) : '0';

        if (receiver) {
          const stream: Stream = {
            receiver,
            amount,
            interval,
            counter,
            streamId: `${receiver}-${Date.now()}`,
          };
          setStreams([stream]);
        } else {
          setStreams([]);
        }
      } else {
        setStreams([]);
      }
    } catch (e) {
      console.error('Error fetching streams:', e);
      setStreams([]);
    }
  };

  useEffect(() => {
    fetchStreams();
    const id = setInterval(fetchStreams, 6000);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!walletConnected || !provider || !account) {
      toast('Connect wallet first.', 'error');
      return;
    }

    const receiverAddr = form.receiver.trim();
    if (!receiverAddr) {
      toast('Receiver address cannot be empty.', 'error');
      return;
    }

    try {
      Address.fromString(receiverAddr);
    } catch (err) {
      console.error('Address validation error:', err);
      toast(`Invalid receiver address: ${receiverAddr}`, 'error');
      return;
    }

    const args = new Args()
      .addString(receiverAddr)
      .addU64(BigInt(Number(form.amount)))
      .addU64(BigInt(Number(form.interval)));

    setIsSubmitting(true);
    toast('Submitting...', 'info');

    try {
      await createStreamCall(args, account!);
      toast('Stream created successfully!', 'success');
      setTimeout(fetchStreams, 2000);
    } catch (err) {
      console.error('Error creating stream:', err);
      toast('Failed to create stream.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelStream = async () => {
    if (!walletConnected || !provider || !account) {
      toast('Connect wallet first.', 'error');
      return;
    }

    try {
      await cancelStreamCall(account!);
      toast('Stream canceled.', 'success');
      setTimeout(fetchStreams, 2000);
    } catch {
      toast('Cancel failed.', 'error');
    }
  };

  const analytics =
    streams.length > 0
      ? {
          totalPayout: Number(streams[0].counter) * Number(streams[0].amount),
          nextTrigger:
            Number(streams[0].interval) -
            (Number(streams[0].counter) % Math.max(1, Number(streams[0].interval))),
          cyclesCompleted: streams[0].counter,
        }
      : null;

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app-shell neon-bg">
      <Toast message={status.message} variant={status.variant} show={showToast} />

      <div className="card neon-card">
        <header className="card__header">
          <p className="eyebrow neon-eyebrow">CASHSTREAM</p>
          <h1 className="neon-title">Autonomous Payments on Massa</h1>
          <p className="lede neon-text">On-chain payment flows that self-trigger every interval.</p>
        </header>

        <div className="card__actions">
          <button
            className={`wallet-button neon-button ${
              walletConnected ? 'wallet-button--connected' : ''
            }`}
            onClick={handleConnect}
          >
            {walletConnected ? 'Wallet connected' : 'Connect Wallet'}
          </button>

          <div className="contract-hint neon-hint">
            <strong>Network:</strong> Buildnet <br />
            <strong>Contract:</strong> {CONTRACT_ADDRESS}
          </div>
        </div>

        <form className="stream-form" onSubmit={handleSubmit}>
          <label className="form-field neon-field">
            <span>Receiver Address</span>
            <input
              type="text"
              name="receiver"
              value={form.receiver}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field neon-field">
            <span>Amount (u64)</span>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label className="form-field neon-field">
            <span>Interval (u64 cycles)</span>
            <input
              type="number"
              name="interval"
              value={form.interval}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="primary neon-button" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Stream'}
          </button>
        </form>

        {analytics && (
          <div className="analytics-card neon-card">
            <h3 className="neon-subtitle">Analytics</h3>
            <p>
              <strong>Total Payout:</strong> {analytics.totalPayout}
            </p>
            <p>
              <strong>Next Trigger In:</strong> {analytics.nextTrigger} cycles
            </p>
            <p>
              <strong>Cycles Completed:</strong> {analytics.cyclesCompleted}
            </p>
          </div>
        )}

        <h3 className="neon-subtitle">Active Streams</h3>

        {streams.length === 0 ? (
          <div className="stream-card neon-card">No active streams</div>
        ) : (
          streams.map((s, i) => (
            <div key={i} className="stream-card neon-card">
              <p>
                <strong>Receiver:</strong> {s.receiver}
              </p>
              <p>
                <strong>Amount:</strong> {s.amount}
              </p>
              <p>
                <strong>Interval:</strong> {s.interval}
              </p>
              <p>
                <strong>Counter:</strong> {s.counter}
              </p>
              <button className="cancel-button neon-danger" onClick={handleCancelStream}>
                Cancel Stream
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Toast({
  message,
  variant,
  show,
}: {
  message: string;
  variant: StatusVariant;
  show: boolean;
}) {
  if (!show) return null;
  return <div className={`toast toast--${variant}`}>{message}</div>;
}

async function createStreamCall(args: Args, account: Account) {
  try {
    const mw3: any = require('@massalabs/massa-web3');
    const WalletClient = mw3.WalletClient ?? mw3.Wallet;
    const wallet = new WalletClient(RPC_URL, account);
    const result = await wallet.callSmartContract({
      targetAddress: CONTRACT_ADDRESS,
      functionName: 'createStream',
      parameter: args.serialize(),
      maxGas: 100000000,
      fee: BigInt(100000000),
      coins: 0n,
    });
    return result;
  } catch (err) {
    console.error('createStreamCall error:', err);
    throw err;
  }
}

async function cancelStreamCall(account: Account) {
  try {
    const mw3: any = require('@massalabs/massa-web3');
    const WalletClient = mw3.WalletClient ?? mw3.Wallet;
    const wallet = new WalletClient(RPC_URL, account);
    const result = await wallet.callSmartContract({
      targetAddress: CONTRACT_ADDRESS,
      functionName: 'cancelStream',
      parameter: new Args().serialize(),
      maxGas: 100000000,
      fee: BigInt(100000000),
      coins: 0n,
    });
    return result;
  } catch (err) {
    console.error('cancelStreamCall error:', err);
    throw err;
  }
}

export default AppMain;
