/**
 * React Context Provider for FHEVM SDK
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { FhevmClient, createFhevmClient } from '../core/FhevmClient';
import type { FhevmConfig } from '../core/types';

interface FhevmContextValue {
  client: FhevmClient | null;
  isInitialized: boolean;
  error: Error | null;
}

const FhevmContext = createContext<FhevmContextValue>({
  client: null,
  isInitialized: false,
  error: null,
});

export interface FhevmProviderProps {
  config: FhevmConfig;
  children: ReactNode;
}

/**
 * Provider component for FHEVM SDK
 *
 * Usage:
 * ```tsx
 * <FhevmProvider config={fhevmConfig}>
 *   <App />
 * </FhevmProvider>
 * ```
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [client, setClient] = useState<FhevmClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initClient = async () => {
      try {
        const newClient = createFhevmClient(config);
        await newClient.init();
        setClient(newClient);
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize FHEVM client:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsInitialized(false);
      }
    };

    initClient();

    return () => {
      if (client) {
        client.dispose();
      }
    };
  }, [config]);

  return (
    <FhevmContext.Provider value={{ client, isInitialized, error }}>
      {children}
    </FhevmContext.Provider>
  );
}

/**
 * Hook to access FHEVM client from context
 */
export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);

  if (!context) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }

  return context;
}
