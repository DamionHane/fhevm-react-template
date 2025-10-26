import { createFhevmClient } from '@fhevm-template/sdk';

/**
 * Client-side FHE operations
 * Handles encryption and decryption on the browser
 */

export interface FHEClientConfig {
  chainId: number;
  rpcUrl: string;
}

/**
 * Initialize FHE client for browser-based encryption
 */
export async function initializeFHEClient(config: FHEClientConfig) {
  try {
    const client = createFhevmClient({
      network: {
        chainId: config.chainId,
        rpcUrl: config.rpcUrl,
      },
    });

    await client.init();

    return client;
  } catch (error) {
    console.error('Failed to initialize FHE client:', error);
    throw error;
  }
}

/**
 * Encrypt a value using the FHE client
 */
export async function encryptData(client: any, value: number | boolean, type: string) {
  try {
    // Use the SDK's encrypt function
    const encrypted = await client.encrypt(value, { type });
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

/**
 * Batch encrypt multiple values
 */
export async function batchEncrypt(
  client: any,
  values: Array<{ value: number | boolean; type: string }>
) {
  try {
    const results = await Promise.all(
      values.map(({ value, type }) => encryptData(client, value, type))
    );
    return results;
  } catch (error) {
    console.error('Batch encryption failed:', error);
    throw error;
  }
}
