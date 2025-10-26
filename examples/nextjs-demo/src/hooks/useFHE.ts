'use client';

import { useFhevm as useSDKFhevm } from '@fhevm-template/sdk';

/**
 * Custom hook for FHE operations
 * Wraps the SDK's useFhevm hook with additional functionality
 */
export function useFHE() {
  const { client, isReady, error } = useSDKFhevm();

  return {
    client,
    isReady,
    error,
    isInitialized: isReady,
  };
}
