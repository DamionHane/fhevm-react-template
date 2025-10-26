'use client';

import { useState, useCallback } from 'react';
import { useEncrypt } from '@fhevm-template/sdk';

/**
 * Hook for homomorphic computations
 */
export function useComputation() {
  const { encryptValue } = useEncrypt();
  const [isComputing, setIsComputing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const compute = useCallback(async (
    operation: 'add' | 'subtract' | 'multiply' | 'compare',
    value1: number,
    value2: number,
    type: string = 'euint32'
  ) => {
    setIsComputing(true);
    try {
      // Encrypt both values
      const encrypted1 = await encryptValue(value1, { type });
      const encrypted2 = await encryptValue(value2, { type });

      // In production, send to smart contract for computation
      // For demo, we simulate the result
      let result;
      switch (operation) {
        case 'add':
          result = value1 + value2;
          break;
        case 'subtract':
          result = value1 - value2;
          break;
        case 'multiply':
          result = value1 * value2;
          break;
        case 'compare':
          result = value1 > value2 ? 1 : 0;
          break;
      }

      setLastResult({
        operation,
        inputs: [value1, value2],
        result,
        timestamp: Date.now(),
      });

      return result;
    } catch (error) {
      console.error('Computation error:', error);
      throw error;
    } finally {
      setIsComputing(false);
    }
  }, [encryptValue]);

  return {
    compute,
    isComputing,
    lastResult,
  };
}
