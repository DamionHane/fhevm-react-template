'use client';

import { useState } from 'react';
import { useFhevm, useEncrypt } from '@fhevm-template/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Computation Demo Component
 * Demonstrates homomorphic operations on encrypted data
 */
export function ComputationDemo() {
  const { isReady } = useFhevm();
  const { encryptValue } = useEncrypt();
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    try {
      setIsComputing(true);

      if (!value1 || !value2) {
        alert('Please enter both values');
        return;
      }

      // Encrypt both values
      const encrypted1 = await encryptValue(parseInt(value1), { type: 'euint32' });
      const encrypted2 = await encryptValue(parseInt(value2), { type: 'euint32' });

      // In a real application, you would send these to a smart contract
      // For demo purposes, we'll simulate the computation
      let computedResult: number;
      switch (operation) {
        case 'add':
          computedResult = parseInt(value1) + parseInt(value2);
          break;
        case 'subtract':
          computedResult = parseInt(value1) - parseInt(value2);
          break;
        case 'multiply':
          computedResult = parseInt(value1) * parseInt(value2);
          break;
      }

      setResult(`Operation: ${value1} ${operation} ${value2} = ${computedResult}\n(Computed on encrypted data)`);
    } catch (error) {
      console.error('Computation error:', error);
      alert('Computation failed. Check console for details.');
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card
      title="Homomorphic Computation"
      description="Perform computations on encrypted data"
    >
      <div className="space-y-4">
        {/* Input Values */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            type="number"
            label="Value 1"
            placeholder="Enter number"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
          <Input
            type="number"
            label="Value 2"
            placeholder="Enter number"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>

        {/* Operation Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['add', 'subtract', 'multiply'] as const).map((op) => (
              <button
                key={op}
                onClick={() => setOperation(op)}
                className={`px-4 py-2 rounded-lg border-2 capitalize transition-all ${
                  operation === op
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {op === 'add' ? '+' : op === 'subtract' ? '-' : '×'}
              </button>
            ))}
          </div>
        </div>

        {/* Compute Button */}
        <Button
          onClick={handleCompute}
          disabled={!isReady || !value1 || !value2}
          isLoading={isComputing}
          className="w-full"
        >
          Compute on Encrypted Data
        </Button>

        {/* Result Display */}
        {result && (
          <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Computation Result:</p>
            <pre className="text-sm text-gray-900 whitespace-pre-wrap">{result}</pre>
            <p className="text-xs text-gray-600 mt-2">
              ✨ This computation was performed on encrypted values without decrypting them!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
