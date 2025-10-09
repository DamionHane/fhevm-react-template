# Next.js FHEVM Demo

This is a Next.js 14 application demonstrating the integration of the `@fhevm-template/sdk` for building privacy-preserving dApps with Fully Homomorphic Encryption.

## Features

- ✨ Next.js 14 App Router
- 🔐 FHEVM SDK integration with React hooks
- 🎨 Tailwind CSS styling
- 📱 Responsive design
- 🔄 Real-time encryption/decryption
- 🪝 Custom hooks using SDK
- 📊 Live contract interactions

## Quick Start

```bash
# From root directory
npm install
npm run dev:nextjs

# Or from this directory
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## SDK Integration

This example showcases how to integrate `@fhevm-template/sdk` in a Next.js application.

### 1. Setup Provider in Layout

```tsx
// app/layout.tsx
import { FhevmProvider } from '@fhevm-template/sdk';

export default function RootLayout({ children }) {
  const fhevmConfig = {
    network: {
      chainId: 11155111,
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!,
    },
  };

  return (
    <html>
      <body>
        <FhevmProvider config={fhevmConfig}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
```

### 2. Use Hooks in Components

```tsx
'use client';

import { useFhevm, useEncrypt, useDecrypt } from '@fhevm-template/sdk';

export function EncryptionDemo() {
  const { isReady } = useFhevm();
  const { encryptValue, isEncrypting } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encryptValue(42, { type: 'euint32' });
    console.log('Encrypted:', encrypted.hex);
  };

  return (
    <button onClick={handleEncrypt} disabled={!isReady || isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
    </button>
  );
}
```

### 3. Contract Interactions

```tsx
import { useContract } from '@fhevm-template/sdk';
import { useSigner } from './hooks/useSigner';

export function ContractDemo() {
  const signer = useSigner();
  const { call, isCalling } = useContract({
    address: contractAddress,
    abi: contractAbi,
    runner: signer,
  });

  const submitData = async () => {
    const result = await call('functionName', [encryptedData]);
    console.log('Transaction:', result.hash);
  };

  return <button onClick={submitData}>Submit</button>;
}
```

## Project Structure

```
nextjs-demo/
├── app/
│   ├── layout.tsx          # Root layout with FhevmProvider
│   ├── page.tsx            # Home page
│   ├── demo/
│   │   └── page.tsx        # SDK demo page
│   └── globals.css         # Global styles
├── components/
│   ├── EncryptionDemo.tsx  # Encryption component
│   ├── DecryptionDemo.tsx  # Decryption component
│   └── ContractDemo.tsx    # Contract interaction
├── hooks/
│   └── useWallet.ts        # Wallet connection hook
├── lib/
│   ├── fhevm-config.ts     # FHEVM configuration
│   └── contracts.ts        # Contract ABIs and addresses
└── public/
    └── ...                 # Static assets
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Zama FHEVM](https://docs.zama.ai/)

## Deployment

Deploy on Vercel:

```bash
npm run build
vercel
```

Or use the Vercel button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/fhevm-react-template)

## License

MIT
