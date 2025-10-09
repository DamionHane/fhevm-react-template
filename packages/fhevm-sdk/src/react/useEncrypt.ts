/**
 * React hook for encrypting values
 */

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import { encrypt, encryptBatch } from '../core/encryption';
import type { EncryptionResult, EncryptOptions } from '../core/types';

export interface UseEncryptReturn {
  /**
   * Encrypt a single value
   */
  encryptValue: (
    value: number | boolean | string,
    options: EncryptOptions
  ) => Promise<EncryptionResult>;

  /**
   * Encrypt multiple values
   */
  encryptBatch: (
    values: Array<{ value: number | boolean | string; options: EncryptOptions }>
  ) => Promise<EncryptionResult[]>;

  /**
   * Whether encryption is in progress
   */
  isEncrypting: boolean;

  /**
   * Encryption error if any
   */
  error: Error | null;
}

/**
 * Hook for encrypting values
 *
 * Usage:
 * ```tsx
 * const { encryptValue, isEncrypting } = useEncrypt();
 *
 * const encrypted = await encryptValue(42, { type: 'euint32' });
 * ```
 */
export function useEncrypt(): UseEncryptReturn {
  const { client, isReady } = useFhevm();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encryptValue = useCallback(
    async (
      value: number | boolean | string,
      options: EncryptOptions
    ): Promise<EncryptionResult> => {
      if (!client || !isReady) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const result = await encrypt(client, value, options);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, isReady]
  );

  const encryptBatchValues = useCallback(
    async (
      values: Array<{ value: number | boolean | string; options: EncryptOptions }>
    ): Promise<EncryptionResult[]> {
      if (!client || !isReady) {
        throw new Error('FHEVM client not initialized');
      }

      setIsEncrypting(true);
      setError(null);

      try {
        const results = await encryptBatch(client, values);
        return results;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Batch encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [client, isReady]
  );

  return {
    encryptValue,
    encryptBatch: encryptBatchValues,
    isEncrypting,
    error,
  };
}
