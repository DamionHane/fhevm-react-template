/**
 * Contract interaction utilities
 */

import { Contract, type ContractRunner, type InterfaceAbi } from 'ethers';
import type { FhevmClient } from '../core/FhevmClient';
import type { ContractCallResult } from '../core/types';

/**
 * Create a contract instance with FHEVM support
 */
export function createFhevmContract(
  address: string,
  abi: InterfaceAbi,
  runner: ContractRunner
): Contract {
  return new Contract(address, abi, runner);
}

/**
 * Call a contract function with encrypted inputs
 */
export async function callContractFunction<T = any>(
  contract: Contract,
  functionName: string,
  args: any[] = [],
  options: {
    value?: bigint;
    gasLimit?: bigint;
  } = {}
): Promise<ContractCallResult<T>> {
  try {
    const tx = await contract[functionName](...args, {
      value: options.value,
      gasLimit: options.gasLimit,
    });

    // If it's a transaction, wait for confirmation
    if (tx.wait) {
      const receipt = await tx.wait();
      return {
        success: receipt.status === 1,
        hash: receipt.hash,
        data: receipt as T,
      };
    }

    // If it's a view call, return the result directly
    return {
      success: true,
      data: tx as T,
    };
  } catch (error) {
    console.error(`Contract call failed for ${functionName}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Read encrypted value from contract
 */
export async function readEncryptedValue(
  contract: Contract,
  functionName: string,
  args: any[] = []
): Promise<string> {
  try {
    const handle = await contract[functionName](...args);
    return handle;
  } catch (error) {
    console.error(`Failed to read encrypted value from ${functionName}:`, error);
    throw error;
  }
}

/**
 * Get contract events
 */
export async function getContractEvents(
  contract: Contract,
  eventName: string,
  filters: Record<string, any> = {},
  fromBlock: number | string = 'earliest',
  toBlock: number | string = 'latest'
) {
  try {
    const filter = contract.filters[eventName](...Object.values(filters));
    const events = await contract.queryFilter(filter, fromBlock, toBlock);
    return events;
  } catch (error) {
    console.error(`Failed to get events for ${eventName}:`, error);
    throw error;
  }
}

/**
 * Listen to contract events
 */
export function listenToEvent(
  contract: Contract,
  eventName: string,
  callback: (...args: any[]) => void
): () => void {
  contract.on(eventName, callback);

  // Return unsubscribe function
  return () => {
    contract.off(eventName, callback);
  };
}
