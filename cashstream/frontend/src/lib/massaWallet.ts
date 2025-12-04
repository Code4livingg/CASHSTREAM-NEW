import { Account, JsonRpcProvider } from '@massalabs/massa-web3';

/**
 * Massa Wallet Integration Library
 * 
 * Provides wallet connection, balance checking, and environment validation
 * for the CashStream application.
 */

export interface WalletConnection {
  account: Account;
  provider: JsonRpcProvider;
  address: string;
  balance: string;
}

export interface WalletError {
  code: 'ENV_MISSING' | 'INVALID_KEY' | 'CONNECTION_FAILED' | 'BALANCE_FAILED';
  message: string;
  details?: string;
}

/**
 * Validates that required environment variables are present
 * @throws {WalletError} If environment variables are missing
 */
export function validateEnv(): void {
  const privateKey = import.meta.env.VITE_PRIVATE_KEY;
  const rpcUrl = import.meta.env.VITE_MASSA_RPC_URL;

  if (!privateKey || privateKey.trim() === '') {
    throw {
      code: 'ENV_MISSING',
      message: 'Private key not found',
      details: 'VITE_PRIVATE_KEY is missing in .env file',
    } as WalletError;
  }

  if (!rpcUrl || rpcUrl.trim() === '') {
    throw {
      code: 'ENV_MISSING',
      message: 'RPC URL not found',
      details: 'VITE_MASSA_RPC_URL is missing in .env file',
    } as WalletError;
  }
}

/**
 * Initializes wallet connection using private key from environment
 * @returns {Promise<WalletConnection>} Connected wallet with account and provider
 * @throws {WalletError} If connection fails
 */
export async function initWalletConnection(): Promise<WalletConnection> {
  try {
    // Validate environment variables first
    validateEnv();

    const privateKey = import.meta.env.VITE_PRIVATE_KEY!.trim();
    const rpcUrl = import.meta.env.VITE_MASSA_RPC_URL!;

    console.log('🔗 Initializing Massa wallet connection...');
    console.log('📡 RPC URL:', rpcUrl);

    // Create account from private key
    let account: Account;
    try {
      account = await Account.fromPrivateKey(privateKey);
      console.log('✅ Account created successfully');
    } catch (error) {
      console.error('❌ Failed to create account:', error);
      throw {
        code: 'INVALID_KEY',
        message: 'Invalid private key',
        details: 'The private key in .env is not valid',
      } as WalletError;
    }

    // Create JSON RPC provider
    let provider: JsonRpcProvider;
    try {
      provider = JsonRpcProvider.fromRPCUrl(rpcUrl) as JsonRpcProvider;
      console.log('✅ Provider created successfully');
    } catch (error) {
      console.error('❌ Failed to create provider:', error);
      throw {
        code: 'CONNECTION_FAILED',
        message: 'Failed to connect to Massa network',
        details: 'Could not create RPC provider',
      } as WalletError;
    }

    // Get wallet address
    const address = account.address.toString();
    console.log('📍 Wallet address:', address);

    // Get wallet balance
    let balance = '0';
    try {
      balance = await getWalletBalance(account, provider);
      console.log('💰 Wallet balance:', balance);
    } catch (error) {
      console.warn('⚠️ Could not fetch balance, using 0:', error);
      // Don't throw here, balance fetch is not critical for connection
    }

    console.log('🎉 Wallet connection successful!');

    return {
      account,
      provider,
      address,
      balance,
    };
  } catch (error) {
    // If it's already a WalletError, rethrow it
    if (error && typeof error === 'object' && 'code' in error) {
      throw error;
    }

    // Otherwise, wrap it in a generic connection error
    console.error('❌ Wallet connection failed:', error);
    throw {
      code: 'CONNECTION_FAILED',
      message: 'Failed to connect wallet',
      details: error instanceof Error ? error.message : 'Unknown error',
    } as WalletError;
  }
}

/**
 * Gets the balance of a wallet account
 * @param {Account} account - The wallet account
 * @param {JsonRpcProvider} provider - The RPC provider
 * @returns {Promise<string>} Balance in MASSA tokens
 * @throws {WalletError} If balance fetch fails
 */
export async function getWalletBalance(
  account: Account,
  provider: JsonRpcProvider
): Promise<string> {
  try {
    const address = account.address.toString();
    
    // Get address info which includes balance
    const addressInfo = await (provider as any).getAddresses([address]);
    
    if (!addressInfo || addressInfo.length === 0) {
      console.warn('No address info returned');
      return '0';
    }

    // Balance is in the smallest unit, convert to MASSA
    // 1 MASSA = 10^9 smallest units
    const balanceInSmallestUnit = BigInt(addressInfo[0].final_balance || '0');
    const balanceInMassa = Number(balanceInSmallestUnit) / 1_000_000_000;
    
    return balanceInMassa.toFixed(4);
  } catch (error) {
    console.error('Failed to get wallet balance:', error);
    throw {
      code: 'BALANCE_FAILED',
      message: 'Failed to fetch wallet balance',
      details: error instanceof Error ? error.message : 'Unknown error',
    } as WalletError;
  }
}

/**
 * Formats a wallet address for display (shortened)
 * @param {string} address - Full wallet address
 * @returns {string} Formatted address (e.g., "0xAB12...CD34")
 */
export function formatAddress(address: string): string {
  if (!address || address.length < 10) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Formats balance for display
 * @param {string} balance - Balance string
 * @returns {string} Formatted balance with MASSA suffix
 */
export function formatBalance(balance: string): string {
  const num = parseFloat(balance);
  if (isNaN(num)) {
    return '0 MASSA';
  }
  return `${num.toLocaleString()} MASSA`;
}
