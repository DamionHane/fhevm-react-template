/**
 * React hook for contract interactions
 */

import { useState, useCallback, useMemo } from 'react';
import { Contract, type InterfaceAbi, type ContractRunner } from 'ethers';
import { callContractFunction, createFhevmContract, readEncryptedValue } from '../utils/contract';
import type { ContractCallResult } from '../core/types';

export interface UseContractConfig {
  address: string;
  abi: InterfaceAbi;
  runner: ContractRunner;
}

export interface UseContractReturn {
  /**
   * Contract instance
   */
  contract: Contract;

  /**
   * Call a contract function
   */
  call: <T = any>(
    functionName: string,
    args?: any[],
    options?: {
      value?: bigint;
      gasLimit?: bigint;
    }
  ) => Promise<ContractCallResult<T>>;

  /**
   * Read an encrypted value from contract
   */
  readEncrypted: (functionName: string, args?: any[]) => Promise<string>;

  /**
   * Whether a call is in progress
   */
  isCalling: boolean;

  /**
   * Call error if any
   */
  error: Error | null;
}

/**
 * Hook for interacting with FHEVM contracts
 *
 * Usage:
 * ```tsx
 * const { contract, call, readEncrypted } = useContract({
 *   address: contractAddress,
 *   abi: contractAbi,
 *   runner: signer
 * });
 *
 * const result = await call('submitReport', [category, isAnonymous]);
 * const handle = await readEncrypted('getEncryptedCategory', [reportId]);
 * ```
 */
export function useContract(config: UseContractConfig): UseContractReturn {
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const contract = useMemo(
    () => createFhevmContract(config.address, config.abi, config.runner),
    [config.address, config.abi, config.runner]
  );

  const call = useCallback(
    async <T = any>(
      functionName: string,
      args: any[] = [],
      options: {
        value?: bigint;
        gasLimit?: bigint;
      } = {}
    ): Promise<ContractCallResult<T>> => {
      setIsCalling(true);
      setError(null);

      try {
        const result = await callContractFunction<T>(contract, functionName, args, options);

        if (!result.success && result.error) {
          setError(new Error(result.error));
        }

        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Contract call failed');
        setError(error);
        return {
          success: false,
          error: error.message,
        };
      } finally {
        setIsCalling(false);
      }
    },
    [contract]
  );

  const readEncrypted = useCallback(
    async (functionName: string, args: any[] = []): Promise<string> => {
      setIsCalling(true);
      setError(null);

      try {
        const handle = await readEncryptedValue(contract, functionName, args);
        return handle;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to read encrypted value');
        setError(error);
        throw error;
      } finally {
        setIsCalling(false);
      }
    },
    [contract]
  );

  return {
    contract,
    call,
    readEncrypted,
    isCalling,
    error,
  };
}
