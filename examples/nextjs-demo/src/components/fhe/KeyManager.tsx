'use client';

import { useState, useEffect } from 'react';
import { useFhevm } from '@fhevm-template/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

/**
 * Key Manager Component
 * Displays and manages FHE public keys
 */
export function KeyManager() {
  const { client, isReady } = useFhevm();
  const [publicKey, setPublicKey] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (isReady && client) {
      // In a real app, fetch the public key from the client
      setPublicKey('Public key loaded from FHEVM network');
    }
  }, [isReady, client]);

  const handleRefreshKey = async () => {
    setIsRefreshing(true);
    try {
      // Simulate key refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPublicKey('Public key refreshed at ' + new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Key refresh error:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card title="FHE Key Manager" description="Manage encryption keys for FHEVM operations">
      <div className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-sm font-medium">
              {isReady ? 'Connected to FHEVM' : 'Connecting...'}
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleRefreshKey}
            isLoading={isRefreshing}
            disabled={!isReady}
          >
            Refresh Key
          </Button>
        </div>

        {/* Public Key Display */}
        {publicKey && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Public Key Status:</p>
            <p className="text-sm text-gray-600">{publicKey}</p>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Public keys are used to encrypt data on the client side</p>
          <p>• All encryption happens locally in your browser</p>
          <p>• Encrypted data can only be decrypted by authorized parties</p>
        </div>
      </div>
    </Card>
  );
}
