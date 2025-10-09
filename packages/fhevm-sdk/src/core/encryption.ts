/**
 * Encryption utilities for FHEVM
 *
 * Provides functions to encrypt various data types for on-chain storage
 */

import type { FhevmClient } from './FhevmClient';
import type { EncryptionResult, EncryptedType, EncryptOptions } from './types';

/**
 * Encrypt a number value
 */
export async function encryptNumber(
  client: FhevmClient,
  value: number,
  options: EncryptOptions
): Promise<EncryptionResult> {
  const instance = await client.getInstance();

  let encrypted: Uint8Array;

  switch (options.type) {
    case 'euint8':
      encrypted = instance.encrypt8(value);
      break;
    case 'euint16':
      encrypted = instance.encrypt16(value);
      break;
    case 'euint32':
      encrypted = instance.encrypt32(value);
      break;
    case 'euint64':
      encrypted = instance.encrypt64(BigInt(value));
      break;
    case 'euint128':
      encrypted = instance.encrypt128(BigInt(value));
      break;
    case 'euint256':
      encrypted = instance.encrypt256(BigInt(value));
      break;
    default:
      throw new Error(`Invalid encrypted type for number: ${options.type}`);
  }

  return {
    data: encrypted,
    hex: '0x' + Buffer.from(encrypted).toString('hex'),
    _originalValue: value,
  };
}

/**
 * Encrypt a boolean value
 */
export async function encryptBoolean(
  client: FhevmClient,
  value: boolean,
  options: EncryptOptions
): Promise<EncryptionResult> {
  if (options.type !== 'ebool') {
    throw new Error('Boolean values must use ebool type');
  }

  const instance = await client.getInstance();
  const encrypted = instance.encryptBool(value);

  return {
    data: encrypted,
    hex: '0x' + Buffer.from(encrypted).toString('hex'),
    _originalValue: value,
  };
}

/**
 * Encrypt an address value
 */
export async function encryptAddress(
  client: FhevmClient,
  address: string,
  options: EncryptOptions
): Promise<EncryptionResult> {
  if (options.type !== 'eaddress') {
    throw new Error('Address values must use eaddress type');
  }

  const instance = await client.getInstance();

  // Convert address to BigInt for encryption
  const addressBigInt = BigInt(address);
  const encrypted = instance.encrypt256(addressBigInt);

  return {
    data: encrypted,
    hex: '0x' + Buffer.from(encrypted).toString('hex'),
  };
}

/**
 * Generic encrypt function that detects value type
 */
export async function encrypt(
  client: FhevmClient,
  value: number | boolean | string,
  options: EncryptOptions
): Promise<EncryptionResult> {
  if (typeof value === 'boolean') {
    return encryptBoolean(client, value, { ...options, type: 'ebool' });
  }

  if (typeof value === 'string' && value.startsWith('0x')) {
    return encryptAddress(client, value, { ...options, type: 'eaddress' });
  }

  if (typeof value === 'number' || typeof value === 'bigint') {
    return encryptNumber(client, Number(value), options);
  }

  throw new Error(`Unsupported value type: ${typeof value}`);
}

/**
 * Batch encrypt multiple values
 */
export async function encryptBatch(
  client: FhevmClient,
  values: Array<{ value: number | boolean | string; options: EncryptOptions }>
): Promise<EncryptionResult[]> {
  const results: EncryptionResult[] = [];

  for (const item of values) {
    const result = await encrypt(client, item.value, item.options);
    results.push(result);
  }

  return results;
}

/**
 * Encrypt input for contract function call
 *
 * This is a convenience function for encrypting function parameters
 */
export async function encryptInput(
  client: FhevmClient,
  value: number | boolean | string,
  type: EncryptedType,
  contractAddress?: string
): Promise<EncryptionResult> {
  return encrypt(client, value, {
    type,
    contractAddress,
  });
}
