import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FhevmProvider } from '@fhevm-template/sdk';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FHEVM Next.js Demo',
  description: 'Next.js 14 demo showcasing FHEVM SDK integration with Fully Homomorphic Encryption',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fhevmConfig = {
    network: {
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/',
    },
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <FhevmProvider config={fhevmConfig}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
