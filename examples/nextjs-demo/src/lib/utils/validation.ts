/**
 * Validation utilities
 */

/**
 * Validate number is within range for encryption type
 */
export function validateNumberForType(value: number, type: string): boolean {
  switch (type) {
    case 'euint8':
      return value >= 0 && value <= 255;
    case 'euint16':
      return value >= 0 && value <= 65535;
    case 'euint32':
      return value >= 0 && value <= 4294967295;
    case 'euint64':
      return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
    case 'ebool':
      return typeof value === 'boolean' || value === 0 || value === 1;
    default:
      return false;
  }
}

/**
 * Validate required fields are present
 */
export function validateRequired(obj: Record<string, any>, fields: string[]): boolean {
  return fields.every(field => obj[field] !== undefined && obj[field] !== null);
}

/**
 * Validate contract ABI
 */
export function validateABI(abi: any): boolean {
  if (!Array.isArray(abi)) return false;
  if (abi.length === 0) return false;

  return abi.every(item =>
    item.type &&
    (item.type === 'function' || item.type === 'event' || item.type === 'constructor')
  );
}

/**
 * Validate chain ID
 */
export function validateChainId(chainId: number): boolean {
  return Number.isInteger(chainId) && chainId > 0;
}

/**
 * Validate RPC URL
 */
export function validateRpcUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
}
