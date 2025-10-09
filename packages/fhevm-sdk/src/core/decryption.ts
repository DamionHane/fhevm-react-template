/**
 * Decryption utilities for FHEVM
 *
 * Provides functions to decrypt encrypted values using EIP-712 signatures
 */

import type { Signer } from 'ethers';
import type { FhevmClient } from './FhevmClient';
import type { DecryptionParams, SignedDecryptionRequest } from './types';
import { signDecryptionRequest } from '../utils/eip712';

/**
 * Request decryption of an encrypted value (user decrypt)
 *
 * This function creates an EIP-712 signature for decryption and sends it to the gateway
 */
export async function requestUserDecrypt(
  client: FhevmClient,
  params: DecryptionParams
): Promise<number | boolean | string> {
  const instance = await client.getInstance();

  try {
    // Create EIP-712 signature for decryption
    const signedRequest = await signDecryptionRequest(
      params.signer,
      params.contractAddress,
      params.handle,
      params.userAddress
    );

    // Request decryption from gateway using the signed request
    const decrypted = await instance.decrypt(
      params.contractAddress,
      params.handle,
      signedRequest.signature
    );

    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error(`Failed to decrypt value: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Request public decryption (no signature required, for public values)
 *
 * This is used for values that have been explicitly made public by the contract
 */
export async function requestPublicDecrypt(
  client: FhevmClient,
  contractAddress: string,
  handle: string
): Promise<number | boolean | string> {
  const instance = await client.getInstance();

  try {
    // Public decrypt doesn't require signature
    const decrypted = await instance.decrypt(contractAddress, handle);
    return decrypted;
  } catch (error) {
    console.error('Public decryption failed:', error);
    throw new Error(`Failed to publicly decrypt value: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Batch decrypt multiple values
 */
export async function decryptBatch(
  client: FhevmClient,
  params: DecryptionParams[]
): Promise<Array<number | boolean | string>> {
  const results: Array<number | boolean | string> = [];

  for (const param of params) {
    const result = await requestUserDecrypt(client, param);
    results.push(result);
  }

  return results;
}

/**
 * Create a reencryption request
 *
 * This allows transferring encrypted data from one party to another
 */
export async function createReencryptionRequest(
  client: FhevmClient,
  params: {
    contractAddress: string;
    handle: string;
    fromAddress: string;
    toAddress: string;
    signer: Signer;
  }
): Promise<SignedDecryptionRequest> {
  // Create signature for reencryption
  const signedRequest = await signDecryptionRequest(
    params.signer,
    params.contractAddress,
    params.handle,
    params.fromAddress
  );

  return signedRequest;
}
