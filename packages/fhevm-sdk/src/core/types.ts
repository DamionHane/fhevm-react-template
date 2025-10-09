/**
 * Core type definitions for FHEVM SDK
 */

import type { ContractRunner, Provider, Signer } from 'ethers';

export interface FhevmConfig {
  /**
   * Network configuration
   */
  network: {
    chainId: number;
    rpcUrl: string;
    name?: string;
  };

  /**
   * Contract addresses for FHE operations
   */
  contracts?: {
    gateway?: string;
    kmsVerifier?: string;
  };

  /**
   * ACL (Access Control List) configuration
   */
  aclAddress?: string;

  /**
   * Provider or signer for blockchain interactions
   */
  provider?: Provider | Signer | ContractRunner;

  /**
   * Optional public key for encryption
   */
  publicKey?: string;
}

export interface EncryptionResult {
  /**
   * Encrypted data as Uint8Array
   */
  data: Uint8Array;

  /**
   * Encrypted data as hex string
   */
  hex: string;

  /**
   * Original value (for debugging, should not be exposed in production)
   */
  _originalValue?: number | boolean;
}

export interface DecryptionParams {
  /**
   * Contract address containing the encrypted data
   */
  contractAddress: string;

  /**
   * User address requesting decryption
   */
  userAddress: string;

  /**
   * Handle to the encrypted value (euint handle)
   */
  handle: string;

  /**
   * Signer for EIP-712 signature
   */
  signer: Signer;
}

export interface EIP712Domain {
  name: string;
  version: string;
  chainId: number;
  verifyingContract: string;
}

export interface EIP712Types {
  [key: string]: Array<{
    name: string;
    type: string;
  }>;
}

export interface EIP712Message {
  [key: string]: any;
}

export interface SignedDecryptionRequest {
  /**
   * EIP-712 signature
   */
  signature: string;

  /**
   * Domain for signature verification
   */
  domain: EIP712Domain;

  /**
   * Message that was signed
   */
  message: EIP712Message;
}

/**
 * Encrypted data types supported by FHEVM
 */
export type EncryptedType = 'euint8' | 'euint16' | 'euint32' | 'euint64' | 'euint128' | 'euint256' | 'ebool' | 'eaddress';

/**
 * Encryption options
 */
export interface EncryptOptions {
  /**
   * Type of encrypted data
   */
  type: EncryptedType;

  /**
   * Contract address (for contract-specific encryption)
   */
  contractAddress?: string;

  /**
   * User address (for user-specific encryption)
   */
  userAddress?: string;
}

/**
 * Contract interaction result
 */
export interface ContractCallResult<T = any> {
  /**
   * Transaction hash (for state-changing calls)
   */
  hash?: string;

  /**
   * Result data (for view calls)
   */
  data?: T;

  /**
   * Whether the call was successful
   */
  success: boolean;

  /**
   * Error message if failed
   */
  error?: string;
}
