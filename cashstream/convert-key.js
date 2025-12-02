#!/usr/bin/env node
/**
 * Attempt to convert P1 format key using alternative method
 * If that fails, show instructions for generating an S1 key
 */

import { randomBytes } from 'crypto';
import { PrivateKey, Account } from '@massalabs/massa-web3';

// Try to generate a new S1 key if conversion fails
async function generateNewKey() {
  try {
    // Generate a new random private key
    const randomKey = randomBytes(32);
    const privKey = new PrivateKey(randomKey);
    const s1Key = privKey.toString();
    const account = new Account(privKey);
    
    console.log('✅ Generated new S1-format private key:');
    console.log('S1 Private Key:', s1Key);
    console.log('Public Key:', account.address.toString());
    console.log('\nAdd this to your .env:');
    console.log(`VITE_PRIVATE_KEY=${s1Key}`);
    
    return { s1Key, address: account.address.toString() };
  } catch (err) {
    console.error('Error generating key:', err.message);
    process.exit(1);
  }
}

// Try to decode the P1 key first
async function tryDecodeP1(p1Key) {
  try {
    const privKey = PrivateKey.fromString(p1Key);
    return privKey.toString();
  } catch (err) {
    console.warn('Cannot decode P1 key:', err.message);
    return null;
  }
}

const p1Key = process.argv[2];

if (p1Key) {
  const s1 = await tryDecodeP1(p1Key);
  if (s1) {
    console.log('✅ Converted P1 to S1:');
    console.log('S1 Private Key:', s1);
  } else {
    console.log('Could not convert P1 key. Generating a new one instead...\n');
    await generateNewKey();
  }
} else {
  console.log('No P1 key provided. Generating a new S1 key...\n');
  await generateNewKey();
}
