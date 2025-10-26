'use client';

import { ReactNode } from 'react';
import { FhevmProvider as SDKProvider } from '@fhevm-template/sdk';

interface FHEProviderProps {
  children: ReactNode;
}

/**
 * FHE Provider wrapper component
 * Initializes the FHEVM SDK for the entire application
 */
export function FHEProvider({ children }: FHEProviderProps) {
  const config = {
    network: {
      chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
    },
  };

  return (
    <SDKProvider config={config}>
      {children}
    </SDKProvider>
  );
}
