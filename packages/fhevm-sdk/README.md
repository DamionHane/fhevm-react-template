# @fhevm-template/sdk

Universal framework-agnostic SDK for building FHEVM (Fully Homomorphic Encryption Virtual Machine) dApps. Provides a wagmi-like developer experience for working with encrypted data on-chain.

## Features

- 🎯 **Framework Agnostic** - Works with React, Next.js, Vue, Node.js, or vanilla JavaScript
- 🔐 **Complete FHE Support** - Encrypt, decrypt, and compute on encrypted data
- 🪝 **React Hooks** - wagmi-like hooks for React developers (`useFhevm`, `useEncrypt`, `useDecrypt`)
- 📦 **All-in-One** - Wraps all required FHEVM dependencies
- 🚀 **Developer Friendly** - Minimal setup, maximum productivity
- 🛡️ **Type Safe** - Full TypeScript support with comprehensive type definitions

## Installation

```bash
npm install @fhevm-template/sdk
```

## Quick Start

### For React/Next.js Projects

```tsx
import { FhevmProvider, useFhevm, useEncrypt, useDecrypt } from '@fhevm-template/sdk';
import { BrowserProvider } from 'ethers';

// 1. Wrap your app with FhevmProvider
function App() {
  const provider = new BrowserProvider(window.ethereum);

  const fhevmConfig = {
    network: {
      chainId: 11155111, // Sepolia
      rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
      name: 'Sepolia',
    },
    provider,
  };

  return (
    <FhevmProvider config={fhevmConfig}>
      <YourApp />
    </FhevmProvider>
  );
}

// 2. Use hooks in your components
function YourComponent() {
  const { client, isReady } = useFhevm();
  const { encryptValue } = useEncrypt();
  const { decrypt } = useDecrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptValue(42, { type: 'euint32' });
    console.log('Encrypted:', encrypted.hex);
  };

  return <button onClick={handleEncrypt}>Encrypt Value</button>;
}
```

### For Node.js/Vue/Vanilla JS

```javascript
import { createFhevmClient, encrypt, decrypt } from '@fhevm-template/sdk';
import { JsonRpcProvider } from 'ethers';

// 1. Create client
const client = createFhevmClient({
  network: {
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID',
  },
  provider: new JsonRpcProvider('https://sepolia.infura.io/v3/YOUR_PROJECT_ID'),
});

// 2. Initialize
await client.init();

// 3. Encrypt values
const encrypted = await encrypt(client, 42, { type: 'euint32' });

// 4. Decrypt values
const decrypted = await decrypt(client, {
  contractAddress: '0x...',
  userAddress: '0x...',
  handle: encrypted.hex,
  signer: yourSigner,
});
```

## Core Concepts

### Encryption

Encrypt values before sending to smart contracts:

```typescript
import { encrypt, encryptNumber, encryptBoolean } from '@fhevm-template/sdk';

// Encrypt a number
const encrypted = await encryptNumber(client, 42, {
  type: 'euint32',
  contractAddress: '0x...',
});

// Encrypt a boolean
const encryptedBool = await encryptBoolean(client, true, {
  type: 'ebool',
});

// Generic encrypt (auto-detects type)
const result = await encrypt(client, 42, { type: 'euint32' });
```

### Decryption

Decrypt encrypted values using EIP-712 signatures:

```typescript
import { requestUserDecrypt, requestPublicDecrypt } from '@fhevm-template/sdk';

// User decryption (requires signature)
const value = await requestUserDecrypt(client, {
  contractAddress: '0x...',
  userAddress: '0x...',
  handle: 'encrypted_handle',
  signer: yourSigner,
});

// Public decryption (no signature needed)
const publicValue = await requestPublicDecrypt(client, contractAddress, handle);
```

### Contract Interactions

```typescript
import { createFhevmContract, callContractFunction } from '@fhevm-template/sdk';

const contract = createFhevmContract(contractAddress, abi, signer);

// Call contract function
const result = await callContractFunction(contract, 'submitReport', [
  encryptedCategory,
  encryptedAnonymous,
]);
```

## React Hooks API

### `useFhevm()`

Access the FHEVM client instance.

```tsx
const { client, isInitialized, isReady, error } = useFhevm();
```

### `useEncrypt()`

Encrypt values in React components.

```tsx
const { encryptValue, encryptBatch, isEncrypting, error } = useEncrypt();

const encrypted = await encryptValue(42, { type: 'euint32' });
```

### `useDecrypt()`

Decrypt values in React components.

```tsx
const { decrypt, decryptPublic, isDecrypting, error } = useDecrypt();

const value = await decrypt({
  contractAddress,
  userAddress,
  handle,
  signer,
});
```

### `useContract()`

Interact with FHEVM contracts.

```tsx
const { contract, call, readEncrypted, isCalling, error } = useContract({
  address: contractAddress,
  abi: contractAbi,
  runner: signer,
});

const result = await call('functionName', [arg1, arg2]);
```

## Supported Encrypted Types

- `euint8` - 8-bit unsigned integer
- `euint16` - 16-bit unsigned integer
- `euint32` - 32-bit unsigned integer
- `euint64` - 64-bit unsigned integer
- `euint128` - 128-bit unsigned integer
- `euint256` - 256-bit unsigned integer
- `ebool` - Boolean
- `eaddress` - Ethereum address

## Configuration

```typescript
interface FhevmConfig {
  network: {
    chainId: number; // Network chain ID
    rpcUrl: string; // RPC endpoint
    name?: string; // Network name
  };
  contracts?: {
    gateway?: string; // Gateway for decryption
    kmsVerifier?: string; // KMS verifier address
  };
  aclAddress?: string; // ACL contract address
  provider?: Provider | Signer; // Ethers provider/signer
  publicKey?: string; // Public key for encryption
}
```

## Examples

See the `examples/` directory for complete implementations:

- `examples/anonymous-reporting` - Anonymous whistleblowing dApp
- `examples/nextjs-demo` - Next.js integration example

## TypeScript Support

Full TypeScript definitions included. Import types as needed:

```typescript
import type {
  FhevmConfig,
  EncryptionResult,
  DecryptionParams,
  EncryptedType,
} from '@fhevm-template/sdk';
```

## License

MIT
