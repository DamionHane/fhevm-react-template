/**
 * Core FHEVM hook
 */

import { useFhevmContext } from './FhevmProvider';
import type { FhevmClient } from '../core/FhevmClient';

export interface UseFhevmReturn {
  /**
   * FHEVM client instance
   */
  client: FhevmClient | null;

  /**
   * Whether the client is initialized
   */
  isInitialized: boolean;

  /**
   * Initialization error if any
   */
  error: Error | null;

  /**
   * Whether the client is ready to use
   */
  isReady: boolean;
}

/**
 * Hook to access FHEVM client
 *
 * Usage:
 * ```tsx
 * const { client, isInitialized, isReady } = useFhevm();
 * ```
 */
export function useFhevm(): UseFhevmReturn {
  const { client, isInitialized, error } = useFhevmContext();

  return {
    client,
    isInitialized,
    error,
    isReady: isInitialized && client !== null && error === null,
  };
}
