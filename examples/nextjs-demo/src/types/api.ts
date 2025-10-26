/**
 * API type definitions
 */

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EncryptionAPIRequest {
  value: number | boolean | string;
  type: string;
}

export interface DecryptionAPIRequest {
  encryptedData: string;
  signature?: string;
  contractAddress?: string;
  userAddress?: string;
}

export interface ComputationAPIRequest {
  operation: 'add' | 'subtract' | 'multiply' | 'compare';
  operands: string[];
}

export interface KeyAPIResponse {
  publicKey?: string;
  timestamp?: number;
  chainId?: number;
}
