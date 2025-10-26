'use client';

import { useEncrypt as useSDKEncrypt } from '@fhevm-template/sdk';
import { useState, useCallback } from 'react';

/**
 * Custom encryption hook with additional features
 */
export function useEncryption() {
  const { encryptValue, encryptBatch, isEncrypting } = useSDKEncrypt();
  const [encryptionHistory, setEncryptionHistory] = useState<Array<{
    timestamp: number;
    type: string;
    success: boolean;
  }>>([]);

  const encrypt = useCallback(async (value: any, options: any) => {
    const startTime = Date.now();
    try {
      const result = await encryptValue(value, options);
      setEncryptionHistory(prev => [
        {
          timestamp: startTime,
          type: options.type,
          success: true,
        },
        ...prev.slice(0, 9) // Keep last 10
      ]);
      return result;
    } catch (error) {
      setEncryptionHistory(prev => [
        {
          timestamp: startTime,
          type: options.type,
          success: false,
        },
        ...prev.slice(0, 9)
      ]);
      throw error;
    }
  }, [encryptValue]);

  return {
    encrypt,
    encryptValue,
    encryptBatch,
    isEncrypting,
    encryptionHistory,
  };
}
