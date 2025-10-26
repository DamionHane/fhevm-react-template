/**
 * FHE Type definitions for Next.js demo
 */

export type EncryptionType =
  | 'ebool'
  | 'euint8'
  | 'euint16'
  | 'euint32'
  | 'euint64'
  | 'euint128'
  | 'euint256'
  | 'eaddress';

export interface EncryptionOptions {
  type: EncryptionType;
}

export interface EncryptionResult {
  hex: string;
  type: EncryptionType;
  timestamp: number;
}

export interface DecryptionOptions {
  contractAddress: string;
  userAddress: string;
  handle: string;
  signature?: string;
}

export interface DecryptionResult {
  value: number | boolean | string;
  type: EncryptionType;
}

export interface FHEConfig {
  chainId: number;
  rpcUrl: string;
  gatewayUrl?: string;
}

export interface ContractConfig {
  address: string;
  abi: any[];
  runner?: any;
}
