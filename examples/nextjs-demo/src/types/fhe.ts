/**
 * FHE-specific type definitions for the Next.js demo
 */

export type FHEType =
  | 'ebool'
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'
  | 'eaddress';

export interface FHEValue {
  value: number | boolean | string;
  type: FHEType;
}

export interface EncryptedValue {
  hex: string;
  type: FHEType;
  metadata?: {
    timestamp: number;
    chainId?: number;
  };
}

export interface DecryptParams {
  contractAddress: string;
  userAddress: string;
  handle: string;
  signer?: any;
}

export interface FHEClientState {
  isInitialized: boolean;
  isReady: boolean;
  error: Error | null;
}

export interface ComputationResult {
  operation: 'add' | 'subtract' | 'multiply' | 'compare';
  inputs: number[];
  result: number | boolean;
  encryptedResult?: string;
}
