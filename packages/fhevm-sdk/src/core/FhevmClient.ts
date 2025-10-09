/**
 * FhevmClient - Core client for FHEVM operations
 *
 * This class provides a wagmi-like interface for encrypting, decrypting,
 * and interacting with FHEVM contracts.
 */

import { createInstance, FhevmInstance } from 'fhevmjs';
import type { Provider, Signer } from 'ethers';
import type { FhevmConfig } from './types';

export class FhevmClient {
  private instance: FhevmInstance | null = null;
  private config: FhevmConfig;
  private initPromise: Promise<void> | null = null;

  constructor(config: FhevmConfig) {
    this.config = config;
  }

  /**
   * Initialize the FHEVM instance
   */
  async init(): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.doInit();
    return this.initPromise;
  }

  private async doInit(): Promise<void> {
    try {
      // Create FHEVM instance with network configuration
      this.instance = await createInstance({
        chainId: this.config.network.chainId,
        publicKey: this.config.publicKey,
        gatewayUrl: this.getGatewayUrl(),
        aclAddress: this.config.aclAddress,
      });
    } catch (error) {
      console.error('Failed to initialize FHEVM instance:', error);
      throw new Error(`FHEVM initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get the FHEVM instance (initializes if needed)
   */
  async getInstance(): Promise<FhevmInstance> {
    if (!this.instance) {
      await this.init();
    }

    if (!this.instance) {
      throw new Error('FHEVM instance not initialized');
    }

    return this.instance;
  }

  /**
   * Check if the instance is initialized
   */
  isInitialized(): boolean {
    return this.instance !== null;
  }

  /**
   * Get configuration
   */
  getConfig(): FhevmConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<FhevmConfig>): void {
    this.config = {
      ...this.config,
      ...newConfig,
      network: {
        ...this.config.network,
        ...(newConfig.network || {}),
      },
    };

    // Reset instance to force reinitialization
    this.instance = null;
    this.initPromise = null;
  }

  /**
   * Get gateway URL for decryption
   */
  private getGatewayUrl(): string {
    // Default gateway URLs for known networks
    const defaultGateways: Record<number, string> = {
      11155111: 'https://gateway.sepolia.zama.ai', // Sepolia
      5: 'https://gateway.goerli.zama.ai', // Goerli
    };

    // Use configured gateway or default
    if (this.config.contracts?.gateway) {
      return this.config.contracts.gateway;
    }

    const defaultGateway = defaultGateways[this.config.network.chainId];
    if (!defaultGateway) {
      throw new Error(`No gateway URL configured for chain ID ${this.config.network.chainId}`);
    }

    return defaultGateway;
  }

  /**
   * Get provider from config
   */
  getProvider(): Provider | Signer | undefined {
    return this.config.provider as Provider | Signer | undefined;
  }

  /**
   * Dispose the instance
   */
  dispose(): void {
    this.instance = null;
    this.initPromise = null;
  }
}

/**
 * Factory function to create FHEVM client
 */
export function createFhevmClient(config: FhevmConfig): FhevmClient {
  return new FhevmClient(config);
}
