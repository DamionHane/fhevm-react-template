/**
 * Security utilities for FHE operations
 */

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>\"']/g, '');
}

/**
 * Validate Ethereum address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate encrypted data format
 */
export function isValidEncryptedData(data: string): boolean {
  return /^0x[a-fA-F0-9]+$/.test(data);
}

/**
 * Rate limiting helper
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 10, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(identifier) || [];

    // Filter out old requests
    const recentRequests = userRequests.filter(
      time => now - time < this.windowMs
    );

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);
    return true;
  }
}

/**
 * Validate encryption type
 */
export function isValidEncryptionType(type: string): boolean {
  const validTypes = [
    'ebool',
    'euint8',
    'euint16',
    'euint32',
    'euint64',
    'euint128',
    'euint256',
    'eaddress',
  ];
  return validTypes.includes(type);
}
