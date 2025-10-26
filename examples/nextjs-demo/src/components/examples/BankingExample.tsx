'use client';

import { useState } from 'react';
import { useEncrypt, useDecrypt } from '@fhevm-template/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Banking Example Component
 * Demonstrates privacy-preserving banking operations
 */
export function BankingExample() {
  const { encryptValue, isEncrypting } = useEncrypt();
  const { decrypt, isDecrypting } = useDecrypt();
  const [balance, setBalance] = useState('1000');
  const [transferAmount, setTransferAmount] = useState('');
  const [encryptedBalance, setEncryptedBalance] = useState<string>('');
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

  const handleEncryptBalance = async () => {
    try {
      const result = await encryptValue(parseInt(balance), { type: 'euint32' });
      setEncryptedBalance(result.hex || 'Encrypted');
      addTransaction(`Balance encrypted: ${balance} → [ENCRYPTED]`);
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Failed to encrypt balance');
    }
  };

  const handlePrivateTransfer = async () => {
    try {
      if (!transferAmount) {
        alert('Please enter transfer amount');
        return;
      }

      const encryptedAmount = await encryptValue(parseInt(transferAmount), { type: 'euint32' });
      addTransaction(`Private transfer: [ENCRYPTED AMOUNT] sent`);

      // Simulate balance update
      const newBalance = parseInt(balance) - parseInt(transferAmount);
      setBalance(newBalance.toString());
      setTransferAmount('');

      alert('Private transfer completed! Amount remained confidential.');
    } catch (error) {
      console.error('Transfer error:', error);
      alert('Transfer failed');
    }
  };

  const addTransaction = (tx: string) => {
    setTransactionHistory(prev => [
      `[${new Date().toLocaleTimeString()}] ${tx}`,
      ...prev
    ].slice(0, 5));
  };

  return (
    <Card
      title="Private Banking"
      description="Confidential balance and transaction management"
    >
      <div className="space-y-4">
        {/* Current Balance */}
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
          <p className="text-sm text-gray-600 mb-1">Current Balance</p>
          <p className="text-3xl font-bold text-gray-900">${balance}</p>
          {encryptedBalance && (
            <p className="text-xs text-gray-500 mt-2">
              Encrypted: {encryptedBalance.substring(0, 20)}...
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleEncryptBalance}
            isLoading={isEncrypting}
            variant="primary"
            className="w-full"
          >
            Encrypt Balance
          </Button>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount to transfer"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
            <Button
              onClick={handlePrivateTransfer}
              isLoading={isEncrypting}
              variant="secondary"
            >
              Transfer
            </Button>
          </div>
        </div>

        {/* Transaction History */}
        {transactionHistory.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Recent Transactions</p>
            <div className="space-y-1">
              {transactionHistory.map((tx, idx) => (
                <div key={idx} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  {tx}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
          <p className="font-medium mb-1">Privacy Features:</p>
          <ul className="space-y-1">
            <li>• Balance is encrypted on-chain</li>
            <li>• Transfer amounts remain confidential</li>
            <li>• Only you can decrypt your balance</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
