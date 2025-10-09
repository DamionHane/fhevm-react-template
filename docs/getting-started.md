# Getting Started with FHEVM SDK

This guide will help you get started with the `@fhevm-template/sdk` in under 5 minutes.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Basic knowledge of React (for React hooks)
- MetaMask or similar Web3 wallet

## Installation

### Option 1: Use the Complete Template

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/fhevm-react-template.git
cd fhevm-react-template

# Install all dependencies
npm install

# Start Next.js demo
npm run dev:nextjs
```

### Option 2: Install SDK Only

```bash
# In your existing project
npm install @fhevm-template/sdk ethers
```

## Quick Start Guide

### For React/Next.js Projects

#### Step 1: Wrap Your App with Provider

```tsx
// app/layout.tsx (Next.js) or main.tsx (React)
import { FhevmProvider } from '@fhevm-template/sdk';
import { BrowserProvider } from 'ethers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get provider from wallet
  const provider = new BrowserProvider(window.ethereum);

  // Configure FHEVM
  const fhevmConfig = {
    network: {
      chainId: 11155111, // Sepolia testnet
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      name: 'Sepolia',
    },
    provider,
  };

  return (
    <html lang="en">
      <body>
        <FhevmProvider config={fhevmConfig}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
```

#### Step 2: Use Hooks in Components

```tsx
'use client'; // Next.js client component

import { useFhevm, useEncrypt, useDecrypt } from '@fhevm-template/sdk';
import { useState } from 'react';

export function EncryptionExample() {
  const { isReady } = useFhevm();
  const { encryptValue, isEncrypting } = useEncrypt();
  const [encrypted, setEncrypted] = useState<string>('');

  const handleEncrypt = async () => {
    try {
      const result = await encryptValue(42, { type: 'euint32' });
      setEncrypted(result.hex);
      console.log('Encrypted value:', result.hex);
    } catch (error) {
      console.error('Encryption failed:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleEncrypt}
        disabled={!isReady || isEncrypting}
      >
        {isEncrypting ? 'Encrypting...' : 'Encrypt 42'}
      </button>
      {encrypted && <p>Encrypted: {encrypted}</p>}
    </div>
  );
}
```

#### Step 3: Decrypt Values

```tsx
'use client';

import { useDecrypt } from '@fhevm-template/sdk';
import { useSigner } from '@/hooks/useSigner'; // Your wallet hook

export function DecryptionExample() {
  const signer = useSigner();
  const { decrypt, isDecrypting } = useDecrypt();
  const [decrypted, setDecrypted] = useState<number | null>(null);

  const handleDecrypt = async () => {
    try {
      const value = await decrypt({
        contractAddress: '0x...',
        userAddress: await signer.getAddress(),
        handle: 'encrypted_handle_from_contract',
        signer,
      });
      setDecrypted(Number(value));
    } catch (error) {
      console.error('Decryption failed:', error);
    }
  };

  return (
    <button onClick={handleDecrypt} disabled={isDecrypting}>
      {isDecrypting ? 'Decrypting...' : 'Decrypt Value'}
    </button>
  );
}
```

### For Vanilla JavaScript/Node.js

#### Step 1: Create Client

```javascript
import { createFhevmClient } from '@fhevm-template/sdk';
import { JsonRpcProvider } from 'ethers';

// Create provider
const provider = new JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_PROJECT_ID');

// Create FHEVM client
const client = createFhevmClient({
  network: {
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
  },
  provider,
});

// Initialize
await client.init();
console.log('FHEVM client initialized');
```

#### Step 2: Encrypt Values

```javascript
import { encrypt } from '@fhevm-template/sdk';

// Encrypt a number
const encrypted = await encrypt(client, 42, {
  type: 'euint32',
  contractAddress: '0x...' // Optional
});

console.log('Encrypted:', encrypted.hex);
// Use encrypted.hex in contract calls
```

#### Step 3: Decrypt Values

```javascript
import { requestUserDecrypt } from '@fhevm-template/sdk';
import { Wallet } from 'ethers';

const signer = new Wallet(privateKey, provider);

const decrypted = await requestUserDecrypt(client, {
  contractAddress: '0x...',
  userAddress: await signer.getAddress(),
  handle: 'encrypted_handle',
  signer,
});

console.log('Decrypted value:', decrypted);
```

## Next Steps

### Learn More

- [API Reference](./api-reference.md) - Complete API documentation
- [Examples Guide](./examples.md) - Detailed example walkthroughs
- [SDK Package README](../packages/fhevm-sdk/README.md) - SDK specifics

### Explore Examples

- **Next.js Demo** - `examples/nextjs-demo/` - Full Next.js integration
- **Anonymous Reporting** - `examples/anonymous-reporting/` - Real-world use case

### Common Patterns

#### Contract Interaction

```tsx
import { useContract } from '@fhevm-template/sdk';

const { contract, call } = useContract({
  address: contractAddress,
  abi: contractAbi,
  runner: signer,
});

// Call contract function with encrypted data
const result = await call('submitData', [encryptedValue.hex]);
console.log('Transaction hash:', result.hash);
```

#### Batch Encryption

```tsx
import { useEncrypt } from '@fhevm-template/sdk';

const { encryptBatch } = useEncrypt();

const encrypted = await encryptBatch([
  { value: 1, options: { type: 'euint8' } },
  { value: 2, options: { type: 'euint8' } },
  { value: 3, options: { type: 'euint8' } },
]);

// Use encrypted[0].hex, encrypted[1].hex, etc.
```

#### Event Listening

```tsx
import { listenToEvent } from '@fhevm-template/sdk';

const unsubscribe = listenToEvent(
  contract,
  'ReportSubmitted',
  (reportId, category, timestamp) => {
    console.log('New report:', reportId);
  }
);

// Later: cleanup
unsubscribe();
```

## Troubleshooting

### Common Issues

**Issue: "FHEVM client not initialized"**
- Solution: Ensure you've called `await client.init()` or waited for `isReady` to be true

**Issue: Encryption fails**
- Check that the client is initialized
- Verify the correct encrypted type (euint8, euint32, etc.)
- Ensure network connection

**Issue: Decryption fails**
- Verify you have permission to decrypt (correct user address)
- Check that the signer is connected
- Ensure the handle is correct

**Issue: React hooks error**
- Make sure component is wrapped in `<FhevmProvider>`
- Check that you're using hooks in client components ('use client')

### Get Help

- [GitHub Issues](https://github.com/YOUR_USERNAME/fhevm-react-template/issues)
- [Zama Discord](https://discord.gg/zama)
- [Documentation](../README.md)

## Best Practices

1. **Always Initialize**: Wait for `isReady` before using encryption/decryption
2. **Error Handling**: Wrap SDK calls in try-catch blocks
3. **Type Safety**: Use TypeScript for better development experience
4. **Secure Keys**: Never expose private keys in client-side code
5. **Test First**: Test on Sepolia before mainnet deployment

## What's Next?

- Explore the [Next.js demo](../examples/nextjs-demo/)
- Read the [API Reference](./api-reference.md)
- Build your own privacy-preserving dApp!
