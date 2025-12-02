import 'dotenv/config';
import {
  Account,
  SmartContract,
  JsonRpcProvider,
  Mas,
} from '@massalabs/massa-web3';
import { getScByteCode } from './utils';

// Load account from environment variable PRIVATE_KEY
const account = await Account.fromEnv();
const provider = JsonRpcProvider.buildnet(account);

console.log('Deploying CashStream contract...');
console.log('Deployer address:', account.address.toString());

// Read compiled WASM bytecode
const byteCodeBuffer = getScByteCode('build', 'main.wasm');
const byteCode = new Uint8Array(byteCodeBuffer); // Convert Buffer to Uint8Array
console.log('Bytecode size:', byteCode.length, 'bytes');

// Deploy contract (CashStream has no constructor, so no constructorArgs needed)
const contract = await SmartContract.deploy(
  provider,
  byteCode,
  undefined, // No constructor arguments
  {
    fee: Mas.fromString('0.01'), // Minimum fee required (0.01 MAS)
    maxGas: 3980000000n, // Gas limit (just under max allowed: 3980167295)
    coins: 0n, // No coins needed for deployment
  },
);

console.log('\n✅ Contract deployed successfully!');
console.log('📋 Contract Address:', contract.address);
console.log('\n⚠️  Copy this address to your frontend .env file:');
console.log(`VITE_CASHSTREAM_ADDRESS=${contract.address}\n`);

// Try to fetch deployment events (may take a moment to appear)
try {
  const events = await provider.getEvents({
    smartContractAddress: contract.address,
  });
  if (events.length > 0) {
    console.log('Deployment events:');
    for (const event of events) {
      console.log('  -', event.data);
    }
  }
} catch (error) {
  console.log('Note: Events may take a few moments to appear on-chain.');
}
