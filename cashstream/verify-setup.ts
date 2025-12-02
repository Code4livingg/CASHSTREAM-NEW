#!/usr/bin/env tsx
/**
 * Verification script to check deployment setup
 * Run: tsx verify-setup.ts
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

console.log('🔍 Verifying CashStream deployment setup...\n');

// Check root .env
const rootEnvPath = join(process.cwd(), '.env');
const rootEnvExists = existsSync(rootEnvPath);

console.log('📁 Root directory:');
console.log(`   .env file: ${rootEnvExists ? '✅ Found' : '❌ Missing'}`);

if (rootEnvExists) {
  try {
    const rootEnv = readFileSync(rootEnvPath, 'utf-8');
    const hasPrivateKey = rootEnv.includes('PRIVATE_KEY=') && !rootEnv.includes('your_private_key_here');
    console.log(`   PRIVATE_KEY: ${hasPrivateKey ? '✅ Set' : '⚠️  Not configured'}`);
  } catch (error) {
    console.log('   ⚠️  Could not read .env file');
  }
} else {
  console.log('   💡 Create .env with: PRIVATE_KEY=your_key_here\n');
}

// Check frontend .env
const frontendEnvPath = join(process.cwd(), 'frontend', '.env');
const frontendEnvExists = existsSync(frontendEnvPath);

console.log('\n📁 Frontend directory:');
console.log(`   .env file: ${frontendEnvExists ? '✅ Found' : '❌ Missing'}`);

if (frontendEnvExists) {
  try {
    const frontendEnv = readFileSync(frontendEnvPath, 'utf-8');
    const hasContractAddress = frontendEnv.includes('VITE_CASHSTREAM_ADDRESS=') && 
                               !frontendEnv.includes('VITE_CASHSTREAM_ADDRESS=\n') &&
                               !frontendEnv.includes('VITE_CASHSTREAM_ADDRESS=\r\n');
    const hasPrivateKey = frontendEnv.includes('VITE_PRIVATE_KEY=') && 
                         !frontendEnv.includes('your_private_key_here');
    
    console.log(`   VITE_CASHSTREAM_ADDRESS: ${hasContractAddress ? '✅ Set' : '⚠️  Not set (deploy contract first)'}`);
    console.log(`   VITE_PRIVATE_KEY: ${hasPrivateKey ? '✅ Set' : '⚠️  Not configured'}`);
  } catch (error) {
    console.log('   ⚠️  Could not read .env file');
  }
} else {
  console.log('   💡 Create frontend/.env with:');
  console.log('      VITE_CASHSTREAM_ADDRESS=');
  console.log('      VITE_PRIVATE_KEY=your_key_here\n');
}

// Check build output
const buildPath = join(process.cwd(), 'build', 'main.wasm');
const buildExists = existsSync(buildPath);

console.log('\n📦 Build artifacts:');
console.log(`   build/main.wasm: ${buildExists ? '✅ Found' : '❌ Missing (run: npm run build)'}`);

console.log('\n📋 Next steps:');
if (!rootEnvExists) {
  console.log('   1. Create root .env with your PRIVATE_KEY');
}
if (!buildExists) {
  console.log('   2. Run: npm run build');
}
if (!rootEnvExists || !buildExists) {
  console.log('   3. Run: npm run deploy');
  console.log('   4. Copy contract address to frontend/.env');
} else {
  console.log('   ✅ Ready to deploy! Run: npm run deploy');
}

console.log('');

