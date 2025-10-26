'use client';

import { useState } from 'react';
import { useFhevm, useEncrypt } from '@fhevm-template/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Encryption Demo Component
 * Demonstrates how to encrypt values using the FHEVM SDK
 */
export function EncryptionDemo() {
  const { isReady } = useFhevm();
  const { encryptValue, isEncrypting } = useEncrypt();
  const [value, setValue] = useState('');
  const [encryptionType, setEncryptionType] = useState<'euint8' | 'euint16' | 'euint32' | 'ebool'>('euint32');
  const [encryptedResult, setEncryptedResult] = useState<string>('');

  const handleEncrypt = async () => {
    try {
      if (!value) {
        alert('Please enter a value to encrypt');
        return;
      }

      const numValue = encryptionType === 'ebool' ? (value === 'true' || value === '1') : parseInt(value);
      const result = await encryptValue(numValue, { type: encryptionType });

      setEncryptedResult(result.hex || JSON.stringify(result));
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Encryption failed. Check console for details.');
    }
  };

  return (
    <Card
      title="Encryption Demo"
      description="Encrypt values using Fully Homomorphic Encryption"
    >
      <div className="space-y-4">
        {/* Status Indicator */}
        <div className={`flex items-center gap-2 p-3 rounded-lg ${isReady ? 'bg-green-50' : 'bg-yellow-50'}`}>
          <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
          <span className="text-sm font-medium">
            {isReady ? 'FHE Ready' : 'Initializing FHE...'}
          </span>
        </div>

        {/* Value Input */}
        <Input
          type="text"
          label="Value to Encrypt"
          placeholder={encryptionType === 'ebool' ? 'true or false' : 'Enter a number'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText={encryptionType === 'ebool' ? 'Enter true/false or 1/0' : 'Enter an integer value'}
        />

        {/* Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encryption Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['euint8', 'euint16', 'euint32', 'ebool'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setEncryptionType(type)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  encryptionType === type
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Encrypt Button */}
        <Button
          onClick={handleEncrypt}
          disabled={!isReady || !value}
          isLoading={isEncrypting}
          className="w-full"
        >
          Encrypt Value
        </Button>

        {/* Result Display */}
        {encryptedResult && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Encrypted Result:</p>
            <code className="block text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              {encryptedResult}
            </code>
          </div>
        )}
      </div>
    </Card>
  );
}
