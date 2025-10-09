/**
 * FHEVM SDK - Universal Framework-Agnostic SDK for Fully Homomorphic Encryption
 *
 * This SDK provides a wagmi-like interface for working with FHEVM,
 * making it easy to build privacy-preserving dApps.
 */

export * from './core/FhevmClient';
export * from './core/encryption';
export * from './core/decryption';
export * from './core/types';
export * from './utils/eip712';
export * from './utils/contract';

// React hooks (optional, only loaded when React is available)
export * from './react';

// Core client instance
export { createFhevmClient } from './core/FhevmClient';
