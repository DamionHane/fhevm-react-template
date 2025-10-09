/**
 * React hook for decrypting values
 */

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import { requestUserDecrypt, requestPublicDecrypt } from '../core/decryption';
import type { DecryptionParams } from '../core/types';

export interface UseDecryptReturn {
  /**
   * Decrypt a value with user signature
   */
  decrypt: (params: DecryptionParams) => Promise<number | boolean | string>;

  /**
   * Decrypt a public value (no signature required)
   */
  decryptPublic: (contractAddress: string, handle: string) => Promise<number | boolean | string>;

  /**
   * Whether decryption is in progress
   */
  isDecrypting: boolean;

  /**
   * Decryption error if any
   */
  error: Error | null;
}

/**
 * Hook for decrypting values
 *
 * Usage:
 * ```tsx
 * const { decrypt, isDecrypting } = useDecrypt();
 *
 * const value = await decrypt({
 *   contractAddress,
 *   userAddress,
 *   handle,
 *   signer
 * });
 * ```
 */
export function useDecrypt(): UseDecryptReturn {
  const { client, isReady } = useFhevm();
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const decrypt = useCallback(
    async (params: DecryptionParams): Promise<number | boolean | string> {
      if (!client || !isReady) {
        throw new Error('FHEVM client not initialized');
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await requestUserDecrypt(client, params);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Decryption failed');
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client, isReady]
  );

  const decryptPublic = useCallback(
    async (contractAddress: string, handle: string): Promise<number | boolean | string> {
      if (!client || !isReady) {
        throw new Error('FHEVM client not initialized');
      }

      setIsDecrypting(true);
      setError(null);

      try {
        const result = await requestPublicDecrypt(client, contractAddress, handle);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Public decryption failed');
        setError(error);
        throw error;
      } finally {
        setIsDecrypting(false);
      }
    },
    [client, isReady]
  );

  return {
    decrypt,
    decryptPublic,
    isDecrypting,
    error,
  };
}
