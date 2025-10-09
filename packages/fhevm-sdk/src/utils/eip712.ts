/**
 * EIP-712 utilities for signing decryption requests
 */

import type { Signer } from 'ethers';
import type { EIP712Domain, EIP712Types, SignedDecryptionRequest } from '../core/types';

/**
 * EIP-712 domain for FHEVM decryption requests
 */
export function createEIP712Domain(
  contractAddress: string,
  chainId: number
): EIP712Domain {
  return {
    name: 'FHEVM Decryption',
    version: '1',
    chainId,
    verifyingContract: contractAddress,
  };
}

/**
 * EIP-712 types for decryption requests
 */
export const DECRYPTION_REQUEST_TYPES: EIP712Types = {
  DecryptionRequest: [
    { name: 'contractAddress', type: 'address' },
    { name: 'handle', type: 'bytes32' },
    { name: 'userAddress', type: 'address' },
    { name: 'nonce', type: 'uint256' },
  ],
};

/**
 * Sign a decryption request using EIP-712
 */
export async function signDecryptionRequest(
  signer: Signer,
  contractAddress: string,
  handle: string,
  userAddress: string,
  nonce: number = Date.now()
): Promise<SignedDecryptionRequest> {
  // Get chain ID from signer
  const chainId = await signer.getChainId();

  // Create EIP-712 domain
  const domain = createEIP712Domain(contractAddress, Number(chainId));

  // Create message
  const message = {
    contractAddress,
    handle,
    userAddress,
    nonce: BigInt(nonce),
  };

  // Sign using EIP-712
  const signature = await signer.signTypedData(
    domain,
    { DecryptionRequest: DECRYPTION_REQUEST_TYPES.DecryptionRequest },
    message
  );

  return {
    signature,
    domain,
    message,
  };
}

/**
 * Verify an EIP-712 signature
 */
export async function verifySignature(
  signature: string,
  domain: EIP712Domain,
  message: any,
  types: EIP712Types
): Promise<string> {
  const { ethers } = await import('ethers');

  // Recover signer address from signature
  const recoveredAddress = ethers.verifyTypedData(
    domain,
    types,
    message,
    signature
  );

  return recoveredAddress;
}
